import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Wenn das Repo 'itscharged.github.io' heißt:
export default defineConfig({
  plugins: [react()],
  base: '/', 
})
