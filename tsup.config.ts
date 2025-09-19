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
    outExtension: ({ format }) => ({
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }),
    target: 'esnext',
    external: ['@prisma/client'],
    noExternal: ['prisma'],
    onSuccess: async () => {
      const fs = await import('fs');
      const path = await import('path');

      const sourceDir = path.join(process.cwd(), 'node_modules/.prisma/client');
      const targetDir = path.join(process.cwd(), 'dist');

      if (fs.existsSync(sourceDir)) {
        const files = fs.readdirSync(sourceDir);
        files.forEach((file) => {
          if (
            file.endsWith('.so.node') ||
            file.endsWith('.exe') ||
            file.endsWith('.dylib')
          ) {
            fs.copyFileSync(
              path.join(sourceDir, file),
              path.join(targetDir, file),
            );
            console.log(`✅ Copied ${file} to dist/`);
          }
        });
      }
    },
  };
});
