import { createCrablrClient, createCrablrAnyChains } from "@crablr/client";
import { env } from "./env";

export const crablrClient = createCrablrClient({
  apiKey: env.CRABLR_PUBLIC_KEY,
});

export const crablrAnyChains = createCrablrAnyChains(crablrClient);
