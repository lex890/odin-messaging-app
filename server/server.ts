import "dotenv/config";

import { createApp } from "./src/app.ts";

declare const process: {
  env: Record<string, string | undefined>;
  exit(code?: number): never;
};

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