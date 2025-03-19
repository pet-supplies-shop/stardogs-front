// 로그인
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const pwd = document.getElementById("loginPwd").value;
  const data = { email, pwd };

  console.log("입력된 데이터:", data);

  //tokenLogin API로 POST 요청
  try {
    const response = await axios.post("http://localhost:8080/tokenLogin", data);
    console.log("서버 응답:", response.data);
  } catch (error) {
    console.error("요청 실패:", error);
  }

  //Authorization 값이 있으면 로그인 성공
  const token = response.data.Authorization;

  if (token) {
    sessionStorage.setItem("Authorization", token);
    sessionStorage.setItem("name", response.data.name);
    axios.defaults.headers.common["Authorization"] = token;
    console.log("로그인 성공", token);
  } else {
    alert("로그인 실패: " + response.data.msg);
  }

  //   console.error("로그인 실패:", error);
  //   alert("로그인 실패 서버 오류.");
});

// 로그인 유지 (새로고침 시)
const Authorization = sessionStorage.getItem("Authorization"); //저장된 토큰 가져옴
const name = sessionStorage.getItem("name"); //저장된 이름 가져옴옴

if (Authorization && name) {
  axios.defaults.headers.common["Authorization"] = Authorization;
  //   document.getElementById("사용자 이름 띄울 곳").innerHTML = `${name}
  //         <button class="btn btn-danger btn-sm" id="logoutBtn">Logout</button>`;
}

//로그아웃
// document
//   .getElementById("signInLink")
//   .addEventListener("click", async (event) => {
//     if (event.target.id == "로그아웃 버튼 id") {
//       try {
//         await axios.post("http://localhost:8080/logout");
//         sessionStorage.removeItem("name"); //세션 스토리지에서 이름 삭제
//         sessionStorage.removeItem("Authorization"); //세션 스토리지에서 토큰 삭제
//         axios.defaults.headers.common["Authorization"] = ""; //axios authorization 제거
//         window.location.reload(); //페이지 새로고침하여 로그인 상태 초기화
//       } catch (error) {
//         console.error("로그아웃 실패:", error);
//       }
//     }
//   });
