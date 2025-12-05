import { createCrablrAdmin, CreatePaymentIntentOutput } from "@crablr/admin";
import { Router } from "express";
import { env } from "./env";
import { products, IProduct } from "./products";

const crablrAdmin = createCrablrAdmin({
  apiKey: env.CRABLR_API_KEY,
});

const router = Router();

router.get("/products", (_, res) => {
  res.json(Object.values(products));
});
export type ProductsResult = IProduct[];

router.get("/product/:productId/buy", async (req, res) => {
  const product = products[req.params.productId];
  if (!product) {
    res.sendStatus(404);
    return;
  }

  res.json(
    await crablrAdmin.createPaymentIntent({
      price: {
        currency: "usd",
        amount: product.price,
      },
    }),
  );
});
export type BuyProductResult = CreatePaymentIntentOutput;

router.get("/usdPrice", (_, res) => {
  res.send("1");
});

export const appRouter = router;
