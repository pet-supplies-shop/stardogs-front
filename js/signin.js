// 로그인
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const pwd = document.getElementById("loginPwd").value;
  const data = { email, pwd };

  console.log("입력된 데이터:", data);

  try {
    const response = await axios.post("http://localhost:8080/tokenLogin", data);
    console.log("서버 응답:", response.data);

    // Authorization 값이 있으면 로그인 성공
    if (response.data && response.data.Authorization) {
      const token = response.data.Authorization;
      sessionStorage.setItem("Authorization", token);
      sessionStorage.setItem("name", response.data.name);
      axios.defaults.headers.common["Authorization"] = token;

      console.log("로그인 성공", token);
      alert("로그인 성공!");

      // 로그인 후 홈페이지로 이동 (예: index.html)
      window.location.href = "../index.html";
    } else {
      alert("로그인 실패: " + (response.data.msg || "알 수 없는 오류"));
    }
  } catch (error) {
    console.error("요청 실패:", error);
    alert("로그인 실패: 서버 오류");
  }
});

// 로그인 유지 (새로고침 시)
const Authorization = sessionStorage.getItem("Authorization");
const name = sessionStorage.getItem("name");

if (Authorization && name) {
  axios.defaults.headers.common["Authorization"] = Authorization;
  //   updateAuthUI(true);
}

// // 로그아웃
// document.addEventListener("click", async (event) => {
//   if (event.target.id === "signInLink") {
//     try {
//       await axios.post("http://localhost:8080/logout");
//       sessionStorage.removeItem("name");
//       sessionStorage.removeItem("Authorization");
//       axios.defaults.headers.common["Authorization"] = "";

//       alert("로그아웃 되었습니다.");
//       window.location.reload(); // 페이지 새로고침하여 로그인 상태 초기화
//     } catch (error) {
//       console.error("로그아웃 실패:", error);
//       alert("로그아웃 실패");
//     }
//   }
// });
