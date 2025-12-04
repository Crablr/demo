import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body suppressHydrationWarning>{children}</body>
  </html>
);
