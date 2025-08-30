import { execSync } from 'child_process';
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  try {
    console.log('🔄 Prisma client generation...');
    execSync('npm run prisma:generate', { stdio: 'inherit' });

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
      externals: ['@prisma/client'],
    };
  } catch (error) {
    console.error('❌ Error during post-compilation:', error);
    throw error;
  }
});
