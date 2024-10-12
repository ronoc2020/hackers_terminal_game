import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Hackers_Terminal_Game/',  // Add the correct base path for GitHub Pages
});
