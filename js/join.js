// 회원가입
document.getElementById("insertMemberBtn").addEventListener("click", async () => {
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