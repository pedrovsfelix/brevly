import { defineConfig } from 'tsup';
import { exec } from 'child_process';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: false,
  outDir: 'dist',

  async onSuccess() {
    console.log('Build bem-sucedido! Copiando arquivos de migração...');

    exec('cp -r src/db/migrations dist/db/');
  },
});