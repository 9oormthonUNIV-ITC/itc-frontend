// import { defineConfig } from 'vite';
// import tailwindcss from '@tailwindcss/vite';
// import path from 'path';
// import fs from 'fs';

// // findAllHtmlFiles 함수 정의 추가
// function findAllHtmlFiles(directory) {
//   const htmlFiles = {};

//   function scanDirectory(dir) {
//     const files = fs.readdirSync(dir);

//     for (const file of files) {
//       const filePath = path.join(dir, file);
//       const stat = fs.statSync(filePath);

//       if (stat.isDirectory()) {
//         scanDirectory(filePath);
//       } else if (file.endsWith('.html')) {
//         // 키 이름을 경로에서 추출 (확장자 제외)
//         const key = path.relative(__dirname, filePath).replace('.html', '');
//         htmlFiles[key] = filePath;
//       }
//     }
//   }

//   scanDirectory(directory);
//   return htmlFiles;
// }

// export default defineConfig({
//   plugins: [tailwindcss()],
//   build: {
//     rollupOptions: {
//       input: {
//         index: path.resolve(__dirname, 'index.html'),
//         ...findAllHtmlFiles(path.resolve(__dirname, 'src')),
//       },
//     },
//   },
//   appType: 'mpa', // fallback 사용안함
//   server: {
//     // open: 'src/pages/main/index.html', // 서버 시작 시 브라우저에서 지정페이지 자동으로 열기
//   },
// });

// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

// findAllHtmlFiles 함수 정의
function findAllHtmlFiles(directory) {
  const htmlFiles = {};

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith(".html")) {
        const key = path.relative(__dirname, filePath).replace(".html", "");
        htmlFiles[key] = filePath;
      }
    }
  }

  scanDirectory(directory);
  return htmlFiles;
}

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        ...findAllHtmlFiles(path.resolve(__dirname, "src")),
      },
    },
  },
  appType: "mpa",
  server: {
    proxy: {
      // OAuth2 시작점 프록시
      "/oauth2": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oauth2/, "/oauth2"),
      },
      // OAuth2 콜백 경로 프록시
      "/login/oauth2": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login\/oauth2/, "/login/oauth2"),
      },
    },
    // open: 'src/pages/main/index.html', // 원하는 초기 열 페이지
  },
});
