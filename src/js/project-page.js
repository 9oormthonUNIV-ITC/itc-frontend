document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("editBtn");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const closeBtn = document.querySelector("svg"); // 닫기 버튼
  const cancelBtn = document.getElementById("cancelBtn");
  const submitBtn = document.getElementById("submitBtn");
  const deleteBtn = document.getElementById("delete-btn");
  const updateBtn = document.getElementById("update-btn");
  const cardContainer = document.querySelector(".grid");
  const cards = cardContainer.querySelectorAll(".project-card");
  const emptyText = document.getElementById("empty-text");

  // ============================================================== //
  // 🚀 캐릭터 애니메이션 작업
  const frames = document.querySelectorAll(".svg-frame");
  let current = 0;

  // 카드가 있는지 없는지 검사
  if (cards.length === 0) {
    emptyText.classList.remove("hidden");
    setInterval(showNextFrame, 200); // 카드 없을 때만 애니메이션 시작
  } else {
    emptyText.classList.add("hidden");
  }

  function showNextFrame() {
    frames.forEach((frame, index) => {
      frame.classList.add("hidden"); // 다 숨겨
      if (index === current) {
        frame.classList.remove("hidden"); // 지금 보여줄 것만 보여
      }
    });
    current = (current + 1) % frames.length; // 다음 프레임으로 이동
  }

  // 200ms마다 showNextFrame 실행
  // setInterval(showNextFrame, 4000);

  // ============================================================== //
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add("hidden");
  }
  // 👉 에딧 모달창 배경 클릭 감지
  const editModal = document.getElementById("modal");
  editModal.addEventListener("click", (e) => {
    if (e.target === editModal) {
      closeModal("modal");
    }
  });
  // 👉 상세 모달창 배경 클릭 감지
  const detailModal = document.getElementById("detail-modal");
  detailModal.addEventListener("click", (e) => {
    if (e.target === detailModal) {
      detailModal.classList.add("hidden");
    }
  });

  // ============================================================== //
  // 🦁 에딧 모달창 로직
  // ============================================================== //
  // 🚀 에딧 모달 열기
  editButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // 🚀 에딧 모달 닫기 -> X 버튼 클릭시
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // 🚀 에딧 모달 닫기 -> 취소 버튼 클릭시
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // 🚀 저장 버튼 클릭 -> json-server로 POST 요청
  submitBtn.addEventListener("click", async () => {
    // 사용자가 입력한 제목, 설명, 팀원 정보 가져오기
    const title = document.getElementById("project-title").value;
    const desc = document.getElementById("project-desc").value;
    const members = document.getElementById("project-members").value;

    // 사용자가 선택한 이미지 파일 가져오기
    const imageInput = document.getElementById("project-image");
    const imageFile = imageInput.files[0];

    // 이미지 파일을 Base64로 인코딩
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let imageBase64 = "";
    if (imageFile) {
      // 이미지 파일이 있으면 Base64로 인코딩
      try {
        imageBase64 = await toBase64(imageFile);
      } catch (e) {
        console.error("이미지 인코딩 실패", e);
        alert("이미지 업로드 중 오류 발생");
        return;
      }
    }

    // 🔥 data 만들기
    // data는 서버에 보낼 데이터
    const data = {
      title,
      desc,
      members,
      image: imageBase64 || undefined, // 새 이미지가 있으면 보내고, 없으면 undefined
    };

    try {
      // mode를 통헤 수정인지 등록인지 구분
      const mode = modal.dataset.mode;
      const id = modal.dataset.id;

      if (mode === "edit" && id) {
        // 수정
        // 수정 모드일 경우 해당 게시글 ID에 PATCH 요청
        const res = await fetch(`http://localhost:3000/projects/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("수정 요청 실패");
        alert("프로젝트 수정 완료");
      } else {
        // 등록
        // 등록 모드일 경우 POST 요청
        const res = await fetch("http://localhost:3000/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("등록 요청 실패");
        alert("프로젝트 등록 완료");
      }

      // 공통 작업
      modal.classList.add("hidden"); // 모달 닫기
      cardContainer.innerHTML = ""; // 기존 카드 지우기 -> 근데 왜 초기화 안됨??
      renderProjects(); // 다시 렌더링
    } catch (err) {
      console.error(err);
      alert("작업 중 오류 발생");
    }
  });

  // ============================================================== //
  // 👉 상세 모달 구현
  // ============================================================== //
  // 👉 상세 모달 요소 추가
  // const detailModal = document.getElementById("detail-modal");
  const detailCloseBtn = document.getElementById("detailCloseBtn");

  // 👉 카드 클릭 시 모달 띄우기
  const openDetailModal = (project) => {
    console.log("프로젝트 상세 보기", project);

    // ✨ 상세 모달에 값 넣기
    document.getElementById("detail-title").textContent = project.title; // 제목
    document.getElementById("detail-desc").textContent = project.desc; // 소개
    document.getElementById("detail-members").textContent = project.members; // 팀원

    // 🚀 project id값 저장
    detailModal.dataset.id = project.id;
    // ✨ 상세 모달 띄우기
    detailModal.classList.remove("hidden");

    // Todo : 상세 모달에 이미지 안 보임, 왜?
    const imageElement = document.getElementById("detail-image");
    if (project.image) {
      imageElement.src = project.image;
      imageElement.classList.remove("hidden");
    } else {
      imageElement.src = ""; // 이미지가 없으면 src를 빈 문자열로 설정
      imageElement.classList.add("hidden"); // 이미지 요소 숨기기
    }
  };

  //================================================= //
  // 👉 상세 모달 닫기
  detailCloseBtn.addEventListener("click", () => {
    detailModal.classList.add("hidden");
  });

  // ============================================================== //
  // 👉 게시글 수정 및 삭제, 렌더링 로직
  // ============================================================== //
  // 👉 게시글 삭제 클릭 이벤트
  deleteBtn.addEventListener("click", async () => {
    const projectId = detailModal.dataset.id; // 삭제할 프로젝트 ID 가져오기

    if (!projectId) {
      alert("삭제할 프로젝트를 찾을 수 없습니다.");
      return;
    }
    // 삭제 재확인 모달창
    const confirmDelete = confirm("정말로 삭제하시겠습니까?");
    if (!confirmDelete) {
      // "아니요" 누르면 삭제 취소
      return;
    }

    try {
      // 서버한테 DELETE 요청
      // json-server는 DELETE 요청을 받으면 해당 ID의 데이터를 삭제함
      const res = await fetch(`http://localhost:3000/projects/${projectId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 요청 실패");
      alert("프로젝트 삭제 완료");
      detailModal.classList.add("hidden");
      cardContainer.innerHTML = ""; // 화면에 있던 기존 데이터 지우기
      renderProjects(); // 서버에서 다시 카드들 렌더링
    } catch (err) {
      console.error("프로젝트 삭제 실패", err);
      alert("프로젝트 삭제 중 오류 발생");
    }
  });

  // 👉 게시글 수정
  updateBtn.addEventListener("click", async () => {
    const id = detailModal.dataset.id; // 수정할 프로젝트 ID 가져오기
    if (!id) {
      alert("수정할 프로젝트를 찾을 수 없습니다.");
      return;
    }

    // 상세 모달 닫기
    detailModal.classList.add("hidden");

    // 에딧 모달 열기
    modal.classList.remove("hidden");

    // 기존 데이터 채워넣기
    // 상세 보기 모달 안에 있는 데이터를 수정창 입력란에 미리 복사하기
    document.getElementById("project-title").value =
      document.getElementById("detail-title").textContent;
    document.getElementById("project-desc").value =
      document.getElementById("detail-desc").textContent;
    document.getElementById("project-members").value =
      document.getElementById("detail-members").textContent;

    // 이미지 파일은 새로 선택하게 한다 (초기화)
    document.getElementById("project-image").value = "";

    // 수정 모드임을 표시
    // submit 누를때 수정인지 삭제인지 구분하기 위헤
    modal.dataset.mode = "edit";
    modal.dataset.id = id;

    // 수정 모드일 경우 버튼 텍스트 "수정"으로 변경
    submitBtn.textContent = "수정하기";
  });

  // 👉 서버에서 프로젝트 불러와서 게시글 렌더링
  const renderProjects = async () => {
    try {
      const res = await fetch("http://localhost:3000/projects");
      // fetch로 json-server에 GET 요청
      // json-server는 기본적으로 http://localhost:3000/로 실행됨
      const projects = await res.json();
      // 서버가 보낸 data를 json(객체 및 배열)으로 바꿔서 저장

      projects.forEach((project) => {
        // 받아온 project 배열을 순회하며 카드 생성
        const card = document.createElement("div");
        // 카드 요소 생성

        card.className = // card 요소에 클래스 추가
          "flex flex-col items-start w-[18.75rem] bg-itc-white cursor-pointer";
        card.dataset.id = project.id; // 카드에 프로젝트 ID 추가

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

        // 카드에 클릭 이벤트 추가하여 클릭 시 상세 모달 열기
        card.addEventListener("click", () => openDetailModal(project));
        cardContainer.appendChild(card); // 만든 카드를 .grid 박스에 넣어버린다.
      });
      // try / catch문으로 감싸서 에러 처리
    } catch (err) {
      console.error("프로젝트 로드 실패", err);
    }
  };

  // 페이지 로딩 시 실행
  renderProjects();

  // ============================================================== //
  // ============================================================== //
});
