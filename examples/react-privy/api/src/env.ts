import { z } from "zod";

const parsing = z
  .object({
    PORT: z.string().regex(/^\d+$/).transform(Number),
    CRABLR_API_KEY: z.string(),
  })
  .safeParse(process.env);

if (!parsing.success) {
  throw new Error(`Invalid env configuration: ${parsing.error.message}`);
}

export const env = parsing.data;
