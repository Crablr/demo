"use client";
import styled from "@emotion/styled";
import { CheckCircle } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";

const CenteredContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 24px;
`;

const ConfirmationCard = styled(Paper)`
  background-color: white;
  border-radius: 16px;
  padding: 48px 32px;
  text-align: center;
  max-width: 500px;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const IconContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const SuccessIcon = styled(CheckCircle)`
  font-size: 80px;
  color: #10b981;
`;

const StyledButton = styled(Button)`
  margin-top: 32px;
  padding: 12px 32px;
  font-weight: 600;
  text-transform: none;
  font-size: 16px;
`;

export default function PaymentSuccess() {
  return (
    <CenteredContainer>
      <ConfirmationCard>
        <IconContainer>
          <SuccessIcon />
        </IconContainer>
        <Typography variant="h4" fontWeight="600" color="#111827" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="#6b7280" sx={{ mt: 2 }}>
          Your order has been processed successfully. Thank you for your
          purchase!
        </Typography>
        <StyledButton variant="contained" size="large" href="/" fullWidth>
          Back to Shopping
        </StyledButton>
      </ConfirmationCard>
    </CenteredContainer>
  );
}
