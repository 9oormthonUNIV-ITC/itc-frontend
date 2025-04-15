document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("editBtn");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector("svg");
  const cancelBtn = document.getElementById("cancelBtn");
  const submitBtn = document.getElementById("submitBtn");

  const cardContainer = document.querySelector(".grid");

  // 👉 상세 모달 요소 추가
  const detailModal = document.getElementById("detail-modal");
  const detailCloseBtn = document.getElementById("detailCloseBtn");

  // 👉 카드 클릭 시 모달 띄우기
  const openDetailModal = (project) => {
    console.log("프로젝트 상세 보기", project);

    // ✨ 상세 모달에 값 넣기
    document.getElementById("detail-title").textContent = project.title;
    document.getElementById("detail-desc").textContent = project.desc;
    document.getElementById("detail-members").textContent = project.members;

    // ✨ 상세 모달 띄우기
    detailModal.classList.remove("hidden");
  };

  // 👉 상세 모달 닫기
  detailCloseBtn.addEventListener("click", () => {
    detailModal.classList.add("hidden");
  });

  // 👉 서버에서 프로젝트 불러와서 카드 렌더링
  const renderProjects = async () => {
    try {
      const res = await fetch("http://localhost:3000/projects");
      const projects = await res.json();

      projects.forEach((project) => {
        const card = document.createElement("div");
        card.className =
          "flex flex-col items-start w-[18.75rem] bg-itc-white cursor-pointer";
        card.dataset.id = project.id;

        card.innerHTML = `
            <div class="w-[18.75rem] h-[12.5rem] bg-itc-gray300 rounded-[1rem]"></div>
            <p class="mt-1 font-extrabold text-18 sm:text-25">${project.title}</p>
            <p class="truncate overflow-hidden whitespace-nowrap w-full text-itc-gray400 text-12 mt-1 font-medium">
              ${project.desc}
            </p>
          `;

        card.addEventListener("click", () => openDetailModal(project));
        cardContainer.appendChild(card);
      });
    } catch (err) {
      console.error("프로젝트 로드 실패", err);
    }
  };

  // 페이지 로딩 시 실행
  renderProjects();

  // ============================================================== //
  // 🦁 모달창
  // ============================================================== //
  // 🚀 모달 열기
  editButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // 🚀 모달 닫기 -> X 버튼 클릭시
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // 🚀 모달 닫기 -> 취소 버튼 클릭시
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // 🚀 저장 버튼 클릭 -> json-server로 POST 요청
  submitBtn.addEventListener("click", async () => {
    // ✏️ 각 input과 textarea에서 사용자가 입력한 값을 가져오기
    // 💬 .value는 input 태그의 실제 입력값
    const title = document.getElementById("project-title").value;
    const desc = document.getElementById("project-desc").value;
    const members = document.getElementById("project-members").value;

    // ⛓️ title, desc, members 값을 data 객체로 묶음
    const data = {
      title,
      desc,
      members,
    };

    try {
      // 🚀 awiat fetch() 서버에 데이터 전송(비동기)
      const res = await fetch("http://localhost:3000/projects", {
        method: "POST",
        // 🚀 보낼 데이터가 JSON이라는 의미
        headers: {
          "Content-Type": "application/json",
        },
        // 🚀 객체를 JSON 문자열로 바꿔서 보냄
        body: JSON.stringify(data),
      });

      // ✅ 응답코드가 true(200~299)가 아니면 에러 alert 표시
      if (!res.ok) throw new Error("Post 요청 Error");
      alert("프로젝트 등록 완료");

      // 💬 성공 시 hidden 클래스 추가로 모달창 자동 닫힘
      modal.classList.add("hidden");
    } catch (err) {
      console.log(err);
      alert("프로젝트 등록 중 err 발생");
    }
  });
});
