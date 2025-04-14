document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("editBtn");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector("svg");
  const cancelBtn = document.getElementById("cancelBtn");
  const submitBtn = document.getElementById("submitBtn");

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
