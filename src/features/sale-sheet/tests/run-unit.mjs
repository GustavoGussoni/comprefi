import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
const temp = await mkdtemp(join(tmpdir(), "sale-sheet-unit-"));
try {
  const file = join(temp, "unit.test.cjs");
  await build({
    entryPoints: [new URL("./unit.test.ts", import.meta.url).pathname],
    bundle: true,
    platform: "node",
    format: "cjs",
    outfile: file,
    define: { "import.meta.env": "{}" },
  });
  const result = spawnSync(process.execPath, ["--test", file], {
    stdio: "inherit",
  });
  process.exitCode = result.status ?? 1;
} finally {
  await rm(temp, { recursive: true, force: true });
}
