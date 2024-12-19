import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
//import { ElementPlus } from '@element-plus/icons-vue'
import { useShortcut } from 'element-plus/es/components/date-picker/src/composables/use-shortcut.mjs'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import  ElementPlus  from 'unplugin-element-plus/vite'
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    ElementPlus({
      useSource: true,
    }),
    Components({
      resolvers: [ElementPlusResolver({importStyle:'sass'})],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    vueDevTools(),
  ],
})
