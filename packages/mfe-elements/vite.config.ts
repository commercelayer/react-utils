import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic'
    }),
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'mfe-elements',
      // the proper extensions will be added
      fileName: 'main',
      formats: ['es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', '@commercelayer/sdk'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  resolve: {
    alias: {
      '#providers': resolve(__dirname, './src/providers'),
      '#ui': resolve(__dirname, './src/ui'),
      '#styles': resolve(__dirname, './src/styles')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})