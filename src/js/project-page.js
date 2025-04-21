document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("editBtn");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector("svg");
  const cancelBtn = document.getElementById("cancelBtn");
  const submitBtn = document.getElementById("submitBtn");
  const deleteBtn = document.getElementById("delete-btn");

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

    // 🚀 project id값 저장
    detailModal.dataset.id = project.id;

    // ✅ 이미지 설정
    const imageElement = document.getElementById("detail-image");
    if (project.image) {
      imageElement.src = project.image;
      imageElement.classList.remove("hidden");
    } else {
      imageElement.src = "";
      imageElement.classList.add("hidden");
    }

    // ✨ 상세 모달 띄우기
    detailModal.classList.remove("hidden");
  };

  // 👉 카드 삭제 클릭 이벤트
  deleteBtn.addEventListener("click", async () => {
    const projectId = detailModal.dataset.id;

    if (!projectId) {
      alert("삭제할 프로젝트를 찾을 수 없습니다.");
      return;
    }
    const confirmDelete = confirm("정말로 삭제하시겠습니까?");
    if (!confirmDelete) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/projects/${projectId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 요청 실패");
      alert("프로젝트 삭제 완료");
      detailModal.classList.add("hidden");
      cardContainer.innerHTML = ""; // 기존 카드 초기화
      renderProjects(); // 다시 렌더링
    } catch (err) {
      console.error("프로젝트 삭제 실패", err);
      alert("프로젝트 삭제 중 오류 발생");
    }
  });

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
            <div class="w-[18.75rem] h-[12.5rem] bg-itc-gray300 rounded-[1rem] overflow-hidden">
              ${
                project.image
                  ? `<img src="${project.image}" class="w-full h-full object-cover"/>`
                  : ""
              }
            </div>
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
    const title = document.getElementById("project-title").value;
    const desc = document.getElementById("project-desc").value;
    const members = document.getElementById("project-members").value;

    // 🔥 이미지 파일 가져오기
    const imageInput = document.getElementById("project-image");
    const imageFile = imageInput.files[0];

    // 🔥 이미지 base64 인코딩 함수
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let imageBase64 = "";
    if (imageFile) {
      try {
        imageBase64 = await toBase64(imageFile);
      } catch (e) {
        console.error("이미지 인코딩 실패", e);
        alert("이미지 업로드 중 오류 발생");
        return;
      }
    }

    // 🔥 image 필드 포함
    const data = {
      title,
      desc,
      members,
      image: imageBase64,
    };

    try {
      const res = await fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Post 요청 Error");
      alert("프로젝트 등록 완료");
      modal.classList.add("hidden");

      // 🔥 새로고침 없이 새 카드 렌더링
      const newProject = await res.json();
      cardContainer.innerHTML = ""; // 기존 카드 초기화
      renderProjects(); // 다시 렌더링
    } catch (err) {
      console.log(err);
      alert("프로젝트 등록 중 err 발생");
    }
  });
});
