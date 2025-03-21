// 로그인 상태에 따른 텍스트 변경 (페이지 로드 시)
document.addEventListener("DOMContentLoaded", () => {
  const Authorization = sessionStorage.getItem("Authorization");
  const signInLink = document.getElementById("signInLink");

  if (Authorization) {
    signInLink.textContent = "Sign Out"; // 로그인 상태면 "Sign Out"으로 변경
  } else {
    signInLink.textContent = "Sign In"; // 로그인 안 되어 있으면 "Sign In"
  }
});

// 로그인 처리
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
      sessionStorage.setItem("email", email);
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
const email = sessionStorage.getItem("email");

if (Authorization && name && email) {
  axios.defaults.headers.common["Authorization"] = Authorization;
  //console.log(`로그인 유지: ${name} (${email})`);
}

//로그아웃 처리
document.getElementById("logDiv").addEventListener("click", async (event) => {
  if (event.target.id == "sginInLink") {
    await axios.post("http://localhost:8080/logout");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("email");
    axios.defaults.headers.common["Authorization"] = ""; // Authorization 헤더에서 삭제
    window.location.reload();
  }
});
