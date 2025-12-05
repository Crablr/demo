import { z } from "zod";

const parsing = z
  .object({
    SERVER: z.string().url(),
    CRABLR_PUBLIC_KEY: z.string(),
    PRIVY_APP_ID: z.string(),
    PRIVY_CLIENT_ID: z.string(),
  })
  .safeParse({
    SERVER: process.env.NEXT_PUBLIC_SERVER,
    CRABLR_PUBLIC_KEY: process.env.NEXT_PUBLIC_CRABLR_KEY,
    PRIVY_APP_ID: process.env.NEXT_PUBLIC_REACT_PRIVY__PRIVY_APP_ID,
    PRIVY_CLIENT_ID: process.env.NEXT_PUBLIC_REACT_PRIVY__PRIVY_CLIENT_ID,
  });

if (!parsing.success) {
  throw new Error(`Invalid env configuration: ${parsing.error.message}`);
}

export const env = parsing.data;
