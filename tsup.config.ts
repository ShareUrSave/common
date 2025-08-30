import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    minify: !options.watch,
    outExtension: ({ format }) => ({
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }),
    target: 'esnext',
    noExternal: ['@prisma/client'],
  };
});
