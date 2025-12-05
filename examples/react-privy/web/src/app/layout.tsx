import { GithubLink } from "@web/components/github-link";
import { Providers } from "@web/utils/privy";
import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body suppressHydrationWarning>
      <GithubLink repository="https://github.com/Crablr/demo/tree/develop/examples/react-privy" />
      <Providers>{children}</Providers>
    </body>
  </html>
);
