import "dotenv/config";

import { createApp } from "./src/app.js";

const PORT: string | number = process.env.PORT || 3001;

async function main() {

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`[server] listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("[server] failed to start:", err);
  process.exit(1);
});