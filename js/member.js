// 회원가입
document.getElementById("memberForm").addEventListener("submit", async () => {
    const email = document.getElementById("email").value; //입력한 이메일
    const pwd = document.getElementById("pwd").value; //입력한 비밀번호
    const name = document.getElementById("name").value; //입력한 이름

    const memberdata = { email, pwd, name }; //json 형태로 만듦

    // insertMember API로 POST 요청
    try {
        const response = await axios.post("http://localhost:8080/insertMember", memberdata);
        document.getElementById("effetMsg").innerHTML = response.memberdata;

        //member DB에 정보가 정상 저장되면 pet 정보도 전달
        const petName = document.getElementById("petName").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const species = document.getElementById("species").value;
        const weight = document.getElementById("weight").value;
        const age = document.getElementById("age").value;

        const petData = { email, petName, gender, weight, age, species }; // email 포함된 pet DB 데이터

        const petResponse = await axios.post("http://localhost:8080/insertPet", petData);
        console.log(petResponse.data); // pet 정보 저장 성공 메시지 출력

    } catch (error) {
        console.error("회원가입 실패:", error);
        document.getElementById("effetMsg").innerHTML = "회원가입 실패";
    }
});


// 로그인
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // 기본 동작(폼 제출 및 새로고침) 방지

    const email = document.getElementById("loginEmail").value;
    const pwd = document.getElementById("loginPwd").value;
    const data = { email, pwd };

    console.log("입력된 데이터:", data);

    //tokenLogin API로 POST 요청
    try {
        const response = await axios.post("http://localhost:8080/tokenLogin", data);
        console.log("서버 응답:", response.data);

        //Authorization 값이 있으면 로그인 성공
        if (response.data.Authorization) {
            sessionStorage.setItem("Authorization", response.data.Authorization);
            sessionStorage.setItem("name", response.data.name);
            axios.defaults.headers.common["Authorization"] = response.data.Authorization;
            
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


//로그아웃
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