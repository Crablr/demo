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

import type { ProductsResult } from "@api/app";
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
  const [products, setProducts] = useState<ProductsResult>([]);
  useEffect(() => {
    fetch(`${env.SERVER}/products`)
      .then((res) => res.json())
      .then(setProducts);
  }, []);

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

      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
        {products.map((product) => (
          <form
            key={product.id}
            method="POST"
            action={`${env.SERVER}/product/${product.id}/checkout`}
          >
            <ProductCard>
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
                  <Button variant="contained" size="large" type="submit">
                    Buy
                  </Button>
                </Box>
              </CardContent>
            </ProductCard>
          </form>
        ))}
      </Box>
    </Box>
  );
}
