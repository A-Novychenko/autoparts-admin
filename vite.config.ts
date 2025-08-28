// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import path from 'path';

// import svgr from 'vite-plugin-svgr';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), svgr()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//       '@assets': path.resolve(__dirname, './src/assets'),
//       '@components': path.resolve(__dirname, './src/components'),
//     },
//   },
// });

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // или @vitejs/plugin-react если вы его используете
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    // SVGR должен быть до react-плагина — так стабильнее
    svgr({
      // опционально: преобразовывать svg в компонент с возможностью передачи props
      svgrOptions: {
        icon: true,
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});
