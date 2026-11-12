import { build } from "esbuild";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

const root = process.cwd();
const temp = await mkdtemp(join(tmpdir(), "catalog-launches-"));
const imagePlugin = {
  name: "asset-paths",
  setup(builder) {
    builder.onLoad({ filter: /\.(webp|png|jpe?g|svg)$/ }, (args) => ({
      contents: `export default ${JSON.stringify(args.path)}`, loader: "js",
    }));
  },
};
const baseSources = {
  name: "base-sources",
  setup(builder) {
    builder.onLoad({ filter: /\.ts$/ }, (args) => ({
      contents: execFileSync("git", ["show", `HEAD:${args.path.slice(root.length + 1)}`], { cwd: root, encoding: "utf8" }),
      loader: "ts",
    }));
  },
};
try {
  const baseFile = join(temp, "baseline.cjs");
  await build({
    stdin: { contents: `import { categoryRegistry } from './src/data/categories'; console.log(JSON.stringify({ grouped: Object.values(categoryRegistry).flatMap(c => [...(c.groupedProducts || []), ...(c.groupedSections || []).flatMap(s => s.products)]), flat: Object.values(categoryRegistry).flatMap(c => [...(c.products || []), ...(c.sections || []).flatMap(s => s.products)]) }));`, resolveDir: root, loader: "ts" },
    bundle: true, platform: "node", format: "cjs", outfile: baseFile, plugins: [imagePlugin, baseSources],
  });
  const baseline = execFileSync(process.execPath, [baseFile], { encoding: "utf8" });
  const baselineFile = join(temp, "baseline.json");
  await writeFile(baselineFile, baseline);
  const output = join(temp, "catalog.test.cjs");
  await build({ entryPoints: [new URL("./catalog-launches.test.ts", import.meta.url).pathname], bundle: true, platform: "node", format: "cjs", outfile: output, plugins: [imagePlugin] });
  const result = spawnSync(process.execPath, ["--test", output], {
    stdio: "inherit",
    env: {
      ...process.env,
      CATALOG_MANIFEST: process.env.CATALOG_MANIFEST || "/home/ubuntu/comprefi-work/backend-catalogo-lancamentos-20261112/scripts/catalog-lancamentos-20261112/products.json",
      ASSETS_MANIFEST: process.env.ASSETS_MANIFEST || "/home/ubuntu/comprefi-audit/catalogo-lancamentos-20261112/ASSETS-VERIFIED.json",
      CATALOG_BASELINE: baselineFile,
      CATALOG_NAME_MAP: process.env.CATALOG_NAME_MAP || "/home/ubuntu/comprefi-audit/nomes-portugues-20261112/NAME-MAP.json",
    },
  });
  process.exitCode = result.status ?? 1;
} finally {
  await rm(temp, { recursive: true, force: true });
}
