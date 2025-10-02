import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: false,
  outDir: 'dist',
  publicDir: 'src/db/migrations',
});