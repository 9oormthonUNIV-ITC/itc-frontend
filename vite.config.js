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

// src/pages 폴더 안의 .html 파일만 찾아서 rollup input으로 등록하는 함수
function findPageHtmlFiles(directory) {
  const htmlFiles = {};

  function scan(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        scan(full);
      } else if (name.endsWith(".html")) {
        // key는 파일명(확장자 제외). 예: src/pages/feed-page.html → feed-page
        const key = path.basename(full, ".html");
        htmlFiles[key] = full;
      }
    }
  }

  scan(directory);
  return htmlFiles;
}

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        // 기본 index.html
        index: path.resolve(__dirname, "index.html"),
        // src/pages 하위의 모든 html 페이지
        ...findPageHtmlFiles(path.resolve(__dirname, "src/pages")),
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
        rewrite: (p) => p.replace(/^\/oauth2/, "/oauth2"),
      },
      // OAuth2 콜백 경로 프록시
      "/login/oauth2": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/login\/oauth2/, "/login/oauth2"),
      },
    },
    // 개발 시 자동으로 메인 페이지를 열고 싶다면 아래 주석 해제
    // open: "/src/pages/main-page.html",
  },
});
