// let url = "https://www.acmicpc.net/problem/10810";
// const { data, isSuccess, isFetching } = useQuery({
//   queryKey: [QueryKey.LINKPREVIEW + url],
//   queryFn: async () => {
//     const res = await fetch(url);
//     const data = await res.text();
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(data, "text/html");
//     const image = doc.querySelector('meta[property="og:image"]')?.getAttribute("content") || "";
//     const desc = doc.querySelector('meta[property="og:description"]')?.getAttribute("content") || "";
//     return image;
//   },
// });

import axios from "axios";
import { load } from "cheerio";

const blogList = ["https://velog.io/@huniversal/JavaScript-재귀함수", "https://www.instagram.com/huniivers/", "https://www.instagram.com/mongxuni/"];

// 각 블로그에서 썸네일, 제목, 설명을 추출하는 함수
async function getLinkData(url) {
  try {
    const { data } = await axios.get(url);
    const $ = load(data);

    const title = $('meta[property="og:title"]').attr("content") || $("title").text();
    const description = $('meta[property="og:description"]').attr("content") || "";
    const image = $('meta[property="og:image"]').attr("content") || "";

    return {
      url,
      title,
      description,
      image,
    };
  } catch (err) {
    console.error(`Failed to fetch data from ${url}: ${err.message}`);
    return null;
  }
}

async function generateBlogPreviews() {
  const previews = [];

  for (let blogUrl of blogList) {
    const blogData = await getLinkData(blogUrl);
    if (blogData) {
      previews.push(blogData);
    }
  }

  // 데이터가 준비되면 바로 프리뷰 출력
  if (previews.length > 0) {
    previews.forEach((blog) => {
      console.log(`
        Title: ${blog.title}
        Description: ${blog.description || "No description available"}
        Image URL: ${blog.image || "No image available"}
        URL: ${blog.url}
      `);
    });
  } else {
    console.log("No blog data found.");
  }
}

// 실행
generateBlogPreviews();

export { getLinkData };
