// 회원가입
document.getElementById("아이디값 넣기").addEventListener("click", async () => {
    const email = document.getElementById("email").value; //입력한 이메일
    const pwd = document.getElementById("pwd").value; //입력한 비밀번호
    const name = document.getElementById("name").value; //입력한 이름

    const data = { email, pwd, name }; //json 형태로 만듦

    // insertMember API로 POST 요청
    try {
        const response = await axios.post("http://localhost:8080/insertMember", data);
        document.getElementById("effetMsg").innerHTML = response.data;
    } catch (error) {
        console.error("회원가입 실패:", error);
        document.getElementById("effetMsg").innerHTML = "회원가입 실패";
    }
});

// 로그인
document.getElementById("loginInp").addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const pwd = document.getElementById("loginPwd").value;
    const data = { email, pwd };

    try {
        //tokenLogin API로 POST 요청청
        const response = await axios.post("http://localhost:8080/tokenLogin", data);
        console.log("서버 응답:", response.data);

        if (response.data.Authorization) { // Authorization 값이 있으면 로그인 성공
            const token = response.data.Authorization;
            sessionStorage.setItem("Authorization", token); //세션 스토리지에 토큰 저장
            sessionStorage.setItem("name", response.data.name); //세션 스토리지에 이름 저장

            axios.defaults.headers.common["Authorization"] = token; //이후 요청 시 자동으로 헤더 추가가

            // document.getElementById("사용자 이름 띄울 곳").innerHTML = `${response.data.name}  
            //     <button class="btn btn-danger btn-sm" id="logoutBtn">Logout</button>`;
        } else {
            alert("로그인 실패: " + response.data.msg);
        }
    } catch (error) {
        console.error("로그인 실패:", error);
        alert("로그인 실패 서버 오류.");
    }
});

// 로그인 유지 (새로고침 시)
const Authorization = sessionStorage.getItem("Authorization"); //저장된 토큰 가져옴
const name = sessionStorage.getItem("name"); //저장된 이름 가져옴옴

if (Authorization && name) {
    axios.defaults.headers.common["Authorization"] = Authorization;
    document.getElementById("사용자 이름 띄울 곳").innerHTML = `${name}  
        <button class="btn btn-danger btn-sm" id="logoutBtn">Logout</button>`;
}

// 로그아웃
document.getElementById("사용자 이름 띄울 곳").addEventListener("click", async (event) => {
    if (event.target.id == "로그아웃 버튼 id") {
        try {
            await axios.post("http://localhost:8080/logout");
            sessionStorage.removeItem("name"); //세션 스토리지에서 이름 삭제
            sessionStorage.removeItem("Authorization"); //세션 스토리지에서 토큰 삭제
            axios.defaults.headers.common["Authorization"] = ""; //axios authorization 제거
            window.location.reload(); //페이지 새로고침하여 로그인 상태 초기화
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    }
});