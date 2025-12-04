import { createCrablrAdmin } from "@crablr/admin";
import { Router } from "express";
import { env } from "./env";
import { products, IProduct } from "./produtcs";

const crablrAdmin = createCrablrAdmin({
  apiKey: env.CRABLR_API_KEY,
});

const router = Router();

router.get("/products", (_, res) => {
  res.json(Object.values(products));
});
export type ProductsResult = IProduct[];

router.post("/product/:productId/checkout", async (req, res) => {
  const product = products[req.params.productId];
  if (!product) {
    res.sendStatus(404);
    return;
  }

  const checkoutSession = await crablrAdmin.createCheckoutSession({
    lines: [
      {
        product: {
          title: product.name,
          subtitle: product.description,
        },
        unitPrice: {
          currency: "usd",
          amount: product.price,
        },
        quantity: 1,
      },
    ],
    successUrl: "https://demo.crablr.io/success",
  });

  res.redirect(checkoutSession.url);
});

router.get("/usdPrice", (_, res) => {
  res.send("1");
});

export const appRouter = router;
