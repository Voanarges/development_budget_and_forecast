// `npx prisma db seed` entry point (runner: prisma.config.ts → migrations.seed).
// Block 03 replaces this body with a call into ./seed/index.ts; the runner already resolves @default-project/* aliases.
import { Logger } from '@nestjs/common';
import { CONTRACT_VERSION } from '@default-project/types';

async function main(): Promise<void> {
  new Logger('seed').log(`Nothing to seed yet (contract v${CONTRACT_VERSION})`);
}

main().catch((error: unknown) => {
  new Logger('seed').error(error);
  process.exit(1);
});
