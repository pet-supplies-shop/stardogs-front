// // // 회원가입
// document
//   .getElementById("insertMemberBtn")
//   .addEventListener("click", async () => {
//     const name = document.getElementById("joinName").value; //입력한 이름
//     const email = document.getElementById("joinEmail").value; //입력한 이메일
//     const pwd = document.getElementById("joinPwd").value; //입력한 비밀번호

//     const memberdata = { email, pwd, name }; //json 형태로 만듦

//     const response = await axios.post(
//       "http://localhost:8080/insertMember",
//       memberdata
//     );
//     alert("회원가입 완료!");

//     // console.log(memberdata);
//   });
document
  .getElementById("insertMemberBtn")
  .addEventListener("click", async () => {
    const name = document.getElementById("joinName").value; //입력한 이름
    const email = document.getElementById("joinEmail").value; //입력한 이메일
    const pwd = document.getElementById("joinPwd").value; //입력한 비밀번호

    const memberdata = { email, pwd, name }; //json 형태로 만듦

    try {
      const response = await axios.post(
        "http://localhost:8080/insertMember",
        memberdata
      );
      alert("회원가입 완료!");

      // alert 창이 닫힌 후 1초 뒤에 signin.html로 이동
      setTimeout(() => {
        window.location.href = "signin.html";
      }, 1000);
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패");
    }
  });
