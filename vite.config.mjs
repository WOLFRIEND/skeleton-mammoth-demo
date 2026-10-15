import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * With SM_LOCAL=true the library CSS is taken from the sibling "skeleton-mammoth" folder (its "dist") instead of "node_modules".
 * Rebuild the library with "npm run build" there, and the demo picks the change up.
 */
const useLocalLibrary = process.env.SM_LOCAL === 'true';
const localLibraryCss = fileURLToPath(new URL('../skeleton-mammoth/dist/skeleton-mammoth.min.css', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: useLocalLibrary ? { 'skeleton-mammoth/dist/skeleton-mammoth.min.css': localLibraryCss } : {},
  },
  server: {
    port: 3000,
    fs: { allow: useLocalLibrary ? ['..'] : undefined },
  },
  build: {
    // Same folder as before, so the deployment settings stay the same.
    outDir: 'build',
  },
});
