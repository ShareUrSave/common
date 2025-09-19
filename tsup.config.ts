import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    minify: !options.watch,
    skipNodeModulesBundle: true,
    outExtension: ({ format }) => ({
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }),
    target: 'esnext',
    external: ['@prisma/client'],
    treeshake: true,
    bundle: true,
  };
});
