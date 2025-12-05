import { Providers } from "@web/utils/privy";
import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body suppressHydrationWarning>
      <Providers>{children}</Providers>
    </body>
  </html>
);
