import { z } from "zod";

const parsing = z
  .object({
    SERVER: z.string().url(),
  })
  .safeParse({
    SERVER: process.env.NEXT_PUBLIC_SERVER,
  });

if (!parsing.success) {
  throw new Error(`Invalid env configuration: ${parsing.error.message}`);
}

export const env = parsing.data;
