"use client";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import type { BuyProductResult, ProductsResult } from "@api/app";
import { IProduct } from "@api/products";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { PaymentPopup } from "@web/components/payment-popup";
import { env } from "./env";

const ProductCard = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

export default function Demo() {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<BuyProductResult>();
  const [paymentProduct, setPaymentProduct] = useState<IProduct>();
  const [products, setProducts] = useState<ProductsResult>([]);
  useEffect(() => {
    fetch(`${env.SERVER}/products`)
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  if (!ready) {
    return <p>Loading privy...</p>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Global
        styles={{
          body: {
            backgroundColor: "#f5f5f5",
          },
        }}
      />

      <Alert
        sx={{ maxWidth: 1080, border: "1px solid lightgrey", m: "24px auto" }}
        severity="warning"
      >
        This is a demonstration store showcasing Crablr's crypto payment
        capabilities. All products and transactions are for testing purposes
        only.{" "}
        <Link
          href="https://portal.crablr.io/login/magic?t=demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          See Merchant Backoffice
        </Link>
      </Alert>

      <Typography
        variant="h3"
        component="h1"
        textAlign="center"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Crablr Demo Store
      </Typography>

      <Typography
        variant="h6"
        textAlign="center"
        sx={{ mb: 4, color: "text.secondary" }}
      >
        Experience seamless crypto payments
      </Typography>

      {authenticated ? (
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" fontWeight="bold">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                  }}
                >
                  <Typography variant="h4" color="primary">
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={async () => {
                      setIsPaymentOpen(true);
                      setPaymentIntent(
                        await fetch(
                          `${env.SERVER}/product/${product.id}/buy`,
                        ).then((res) => res.json()),
                      );
                      setPaymentProduct(product);
                    }}
                  >
                    Buy
                  </Button>
                </Box>
              </CardContent>
            </ProductCard>
          ))}
        </Box>
      ) : (
        <Button variant="contained" size="large" onClick={login}>
          Connect
        </Button>
      )}

      {authenticated && paymentProduct && paymentIntent && (
        <PaymentPopup
          open={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          product={paymentProduct}
          paymentIntent={paymentIntent}
        />
      )}
    </Box>
  );
}
