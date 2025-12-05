import { IProduct } from "@api/products";
import {
  BlockchainEngine,
  CreateChargeInput,
  GetManyCurrencyOutput,
  getSolanaClusterName,
  IChargePayload,
  Currency,
} from "@crablr/client";
import styled from "@emotion/styled";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  useSendTransaction as useEthereumSendTransaction,
  useWallets as useEthereumWallets,
} from "@privy-io/react-auth";
import {
  useSignAndSendTransaction as useSolanaSendTransaction,
  useWallets as useSolanaWallets,
} from "@privy-io/react-auth/solana";
import { crablrAnyChains, crablrClient } from "@web/utils/crablr";
import { FC, useEffect, useState } from "react";

const PaymentDialog = styled(Dialog)`
  .MuiDialog-paper {
    min-width: 500px;
    max-width: 600px;
  }
`;

interface IProps {
  open: boolean;
  onClose: () => void;
  product: IProduct;
  paymentIntent: CreateChargeInput["paymentIntent"];
}

export const PaymentPopup: FC<IProps> = ({
  open,
  onClose,
  product,
  paymentIntent,
}) => {
  const [currencies, setCurrencies] = useState<GetManyCurrencyOutput>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<
    Currency & {
      data?: {
        charge: IChargePayload;
        approvalNeeded: boolean;
      };
    }
  >();
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [skipFutureApprovals, setSkipFutureApprovals] = useState(false);

  useEffect(() => {
    if (open) {
      setPaymentSucceeded(false);
      setSelectedCurrency(undefined);
    }
  }, [open]);

  useEffect(() => {
    crablrClient.getManyCurrency().then(setCurrencies);
  }, [setCurrencies]);

  const solanaWallets = useSolanaWallets();
  const solanaSend = useSolanaSendTransaction();
  const ethereumWallets = useEthereumWallets();
  const ethereumSend = useEthereumSendTransaction();

  const handleSelectCurrency = async (currencyId: string) => {
    const currency = currencies.find(({ id }) => id === currencyId)!;
    setSelectedCurrency(currency);

    const charge = await crablrClient.createChargePayload({
      paymentIntent,
      currency: currencyId,
    });

    const allowance = await crablrClient.getAllowance({
      currency: currencyId,
      accountAddress:
        currency.blockchain.engine === BlockchainEngine.ETHEREUM
          ? ethereumWallets.wallets[0].address
          : solanaWallets.wallets[0].address,
    });
    const approvalNeeded = BigInt(allowance) < BigInt(charge.transferValue);

    setSelectedCurrency((currentCurrency) => {
      if (currentCurrency?.id !== currencyId) return currentCurrency;

      return {
        ...currentCurrency,
        data: {
          charge,
          approvalNeeded,
        },
      };
    });
  };

  const handleAllowanceTransaction = async () => {
    if (!selectedCurrency?.data?.approvalNeeded) return;

    const approveTransfer = await crablrAnyChains.buildApproveTransfer(
      selectedCurrency.data.charge,
      {
        skipFutureApprovals,
      },
    );
    await ethereumWallets.wallets[0].switchChain(
      selectedCurrency.blockchain.chainId,
    );
    await ethereumSend.sendTransaction(approveTransfer);

    setSelectedCurrency((currentCurrency) => {
      if (
        currentCurrency?.id !== selectedCurrency.id ||
        !currentCurrency.data?.approvalNeeded
      )
        return currentCurrency;

      return {
        ...currentCurrency,
        data: {
          ...currentCurrency.data,
          approvalNeeded: false,
        },
      };
    });
  };

  const handlePaymentTransaction = async () => {
    if (!selectedCurrency?.data) return;

    if (selectedCurrency.blockchain.engine === BlockchainEngine.ETHEREUM) {
      await ethereumWallets.wallets[0].switchChain(
        selectedCurrency.blockchain.chainId,
      );
    }

    const reserveTransfer = await crablrAnyChains.buildReserveTransfer(
      selectedCurrency.data.charge,
      {
        accountAddress:
          selectedCurrency.blockchain.engine === BlockchainEngine.ETHEREUM
            ? ethereumWallets.wallets[0].address
            : solanaWallets.wallets[0].address,
      },
    );

    switch (reserveTransfer.engine) {
      case BlockchainEngine.SOLANA:
        await solanaSend.signAndSendTransaction({
          chain: getSolanaClusterName(selectedCurrency.blockchain),
          wallet: solanaWallets.wallets[0]!,
          transaction: reserveTransfer.transaction,
        });
        break;
      case BlockchainEngine.ETHEREUM:
        await ethereumSend.sendTransaction(reserveTransfer);
        break;
    }

    setPaymentSucceeded(true);
  };

  if (paymentSucceeded) {
    return (
      <PaymentDialog open={open} onClose={onClose}>
        <DialogTitle>
          <Box textAlign="center">
            <Typography variant="h4" sx={{ mb: 2, color: "success.main" }}>
              🎉 Payment Successful
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box textAlign="center">
            <Typography sx={{ mb: 2 }}>
              Thank you for your purchase of {product.name}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </PaymentDialog>
    );
  }

  return (
    <PaymentDialog open={open} onClose={onClose}>
      <DialogTitle>
        Complete Your Purchase
        <Typography variant="body2" color="text.secondary">
          {product.name} - ${product.price}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Cryptocurrency</InputLabel>
            <Select
              value={selectedCurrency?.id ?? ""}
              onChange={(e) => handleSelectCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.id} value={currency.id}>
                  {currency.name} ({currency.symbol} on{" "}
                  {currency.blockchain.name})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedCurrency && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography>
                <strong>Amount to pay:</strong>{" "}
                {(product.price / selectedCurrency.usdPrice.value).toFixed(6)}{" "}
                {selectedCurrency.symbol}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ≈ ${product.price} USD
              </Typography>
            </Alert>
          )}
        </Box>

        {selectedCurrency?.data?.approvalNeeded && (
          <Box textAlign="center">
            <Typography variant="h6" sx={{ mb: 2 }}>
              Approve Token Spending
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Please approve the smart contract to spend your{" "}
              {selectedCurrency!.symbol} tokens.
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={skipFutureApprovals}
                  onChange={(e) => setSkipFutureApprovals(e.target.checked)}
                />
              }
              label="Remember me (Large allowance)"
            />
            <Button
              variant="contained"
              onClick={handleAllowanceTransaction}
              fullWidth
            >
              Approve Spending
            </Button>
          </Box>
        )}

        {selectedCurrency?.data && !selectedCurrency.data.approvalNeeded && (
          <Box textAlign="center">
            <Typography variant="h6" sx={{ mb: 2 }}>
              Complete Payment
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 1 }}>
              Send{" "}
              {(product.price / selectedCurrency.usdPrice.value).toFixed(6)}{" "}
              {selectedCurrency.symbol}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              for {product.name}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={handlePaymentTransaction}
            >
              Pay Now
            </Button>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </PaymentDialog>
  );
};
