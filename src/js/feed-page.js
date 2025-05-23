const editBtn = document.getElementById("feed-page-edit-btn");
const submitBtn = document.getElementById("feed-page-submit-btn");
const cancelBtn = document.getElementById("feed-page-cancel-btn");
const closeBtn = document.getElementById("feed-page-close-btn");
const modal = document.getElementById("feed-page-edit-modal");
const innerModal = document.getElementById("feed-page-edit-inner-modal");
const feedInput = document.getElementById("feed-link");
const feedList = document.getElementById("feed-list");

cancelBtn.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
editBtn.addEventListener("click", openModal);
submitBtn.addEventListener("click", submitLink);
innerModal.addEventListener("click", preventBubbling());
showFeeds();

// 캡처 단계에서 딱 막아서 뒤따르는 클릭 리스너 무조건 차단
editBtn.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    alert("운영진만 접근이 가능합니다.");
  },
  { capture: true }
);

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
  const newLink = { url: feedInput.value.trim() };
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const urlToPreview = encodeURIComponent(newLink.url);
    const checkRes = await fetch(
      `http://localhost:3001/links?url=${newLink.url}`
    );
    const existingLinks = await checkRes.json();

    if (existingLinks.length > 0) {
      closeModal();
      return;
    }
    const res = await fetch(
      `https://api.linkpreview.net/?key=${apiKey}&q=${urlToPreview}`
    );
    if (!res.ok) {
      console.log(res.status);
      throw new Error("LinkPreview API 요청 실패");
    }

    const previewData = await res.json();
    await fetch(`http://localhost:3001/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(previewData),
    });
    showFeeds();
  } catch (error) {
    console.log("에러 발생:", error);
  }
  closeModal();
}

async function showFeeds() {
  feedList.innerHTML = "";
  if (feedList.innerHTML === "") {
    let feeds = undefined;
    try {
      const res = await fetch(`http://localhost:3001/links`);
      if (!res.ok) throw new Error("링크 불러오기 실패");

      feeds = await res.json();
      feedList.innerHTML = "";
      for (let feed of feeds) {
        feedList.innerHTML += `<li>
          <a class="border border-[#AFAFAF] hover:border-itc-blue700 focus-visible:border-itc-blue700 active:border-itc-blue800 outline-0 grid grid-cols-1 grid-rows-[150px_1fr] md:grid-cols-[150px_1fr] md:grid-rows-1 w-full rounded-[20px] px-9 py-6 gap-7" href="${feed.url}" target="_blank" rel="noopener noreferrer"
            ><img class="bg-itc-gray200 rounded-[20px] md:w-[150px] w-full h-[150px] object-cover" src="${feed.image}" alt="link thumbnail" />
            <div class="grid grid-rows-[1fr_2fr_1fr]">
              <h3 class="font-extrabold text-itc-black100 text-25 truncate">${feed.title}</h3>
              <p class="font-medium text-16 text-itc-gray400 grow-1 line-clamp-2">${feed.description}</p>
              <p class="block font-medium text-16 text-itc-gray400 truncate">${feed.url}</p>
            </div>
          </a>
        </li>`;
      }
      if (feedList.innerHTML === "") {
        feedList.innerHTML = `<div id="empty-project" class="min-h-[400px] flex flex-col items-center justify-center gap-6 py-10 col-start-2">
      <div id="animation-box" class="w-[250px] h-[230px]">
        <img src="/public/images/character-1.svg" alt="" />
      </div>
      <div id="empty-text">
        <p class="text-itc-gray400 text-center font-bold text-50 whitespace-nowrap font-gmarket">텅 비었어요...</p>
      </div>
    </div>`;
        let emptyImg = document.querySelector("#animation-box > img");
        let imgNo = 1;
        setInterval(showNextFrame, 200);

        function showNextFrame() {
          imgNo++;
          if (imgNo == 8) imgNo = 1;
          emptyImg.setAttribute("src", `/public/images/character-${imgNo}.svg`);
        }
      }
      console.log(feeds);
    } catch (err) {
      console.error(error);
    }
  } else {
    // feedList.innerHTML = `<p>텅 비었어요</p>`;
  }
}
