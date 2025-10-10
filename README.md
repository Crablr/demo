# Crablr Demo Store

A demonstration e-commerce store showcasing [Crablr](https://portal.crablr.io/)'s cryptocurrency payment capabilities.

🌐 **Live Demo**: https://demo.crablr.io/

## Overview

This is a simple demo store that demonstrates how to integrate Crablr's crypto payment gateway into an e-commerce application. All products and transactions are for testing purposes only.

## Features

- Product catalog display
- Crypto payment checkout flow
- Payment confirmation page
- Integration with Crablr payment gateway

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp -R _config/example _config/develop

# Start api
npm run dev --workspace=demo-api

# Start web
npm run dev --workspace=demo-web
```

## Learn More

- **Crablr Platform**: https://portal.crablr.io/
- **Documentation**: https://crablr-docs.notion.site/Crablr-Documentation-27f7c1e3414a807697a5dd958eab5192

## License

MIT
