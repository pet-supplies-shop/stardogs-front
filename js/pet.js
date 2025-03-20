// 애견 정보 저장
document
  .getElementById("insertMemberBtn")
  .addEventListener("click", async () => {
    // insertMember API로 POST 요청
    const email = document.getElementById("joinEmail").value; //입력한 이메일
    const petName = document.getElementById("petName").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const species = document.getElementById("species").value;
    const weight = document.getElementById("weight").value;
    const age = document.getElementById("age").value;

    const petData = { email, petName, gender, weight, age, species }; // email 포함된 pet DB 데이터

    const petResponse = await axios.post(
      "http://localhost:8080/insertPet",
      petData
    );
    // console.log(petData); // pet 정보 저장 성공 메시지 출력
  });
