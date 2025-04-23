// import axios from "axios";
// import { load } from "cheerio";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
const editBtn = document.getElementById("feed-page-edit-btn");
const submitBtn = document.getElementById("feed-page-submit-btn");
const cancelBtn = document.getElementById("feed-page-cancel-btn");
const closeBtn = document.getElementById("feed-page-close-btn");
const modal = document.getElementById("feed-page-edit-modal");
const innerModal = document.getElementById("feed-page-edit-inner-modal");
const feedInput = document.getElementById("feed-link");
const feedList = document.getElementById("feed-list");

// modal.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
editBtn.addEventListener("click", openModal);
submitBtn.addEventListener("click", submitLink);
innerModal.addEventListener("click", preventBubbling());

function closeModal() {
  modal.classList.add("hidden");
  feedInput.value = "";
  return false;
}

function openModal() {
  modal.classList.remove("hidden");
}

function preventBubbling() {
  return function (e) {
    e.stopPropagation();
  };
}

async function submitLink() {
  const newLink = { url: feedInput.value };
  const newLinkPreview = getLinkPreview(feedInput.value).then((data) => console.log(data));
  const res = await fetch("http://localhost:3001/links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLink),
  });
  // const savedLink = await res.json();
  // console.log(savedLink);
  // feedList;
  // const ogData = await getLinkData(feedInput.value);
  // console.log(ogData);
  // console.log(getLinkData(feedInput.value));
  closeModal();
  createFeedItem();
}
// async function getLinkData(url) {
//   try {
//     const { data } = await axios.get(url);
//     const $ = load(data);

//     const title = $('meta[property="og:title"]').attr("content") || $("title").text();
//     const description = $('meta[property="og:description"]').attr("content") || "";
//     const image = $('meta[property="og:image"]').attr("content") || "";

//     return {
//       url,
//       title,
//       description,
//       image,
//     };
//   } catch (err) {
//     console.error(`Failed ${url}: ${err.message}`);
//     return null;
//   }
// }
async function createFeedItem() {
  const res = await fetch("http://localhost:3001/links", {
    method: "GET",
  });
  const savedLink = await res.json();
  for (let i of savedLink) {
    console.log(i.url);
  }
  getLinkPreview(savedLink[1].url).then((data) => console.log(data));
}
