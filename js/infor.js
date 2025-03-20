document.addEventListener("DOMContentLoaded", function () {
  const email = sessionStorage.getItem("email");
  if (!email) {
    console.error("로그인된 이메일이 없습니다.");
    return;
  }

  fetch(`http://localhost:8080/infor/getAllInfor/${email}`)
    .then((response) => response.json())
    .then((data) => {
      //console.log("서버에서 받은 데이터:", data);

      if (Array.isArray(data) && data.length > 0) {
        const info = data[0];

        document.getElementById("joinName").value = info.name || "";
        document.getElementById("joinEmail").value = info.email || "";
        document.getElementById("petName").value = info.petName || "";
        document.getElementById("species").value = info.species || "";
        document.getElementById("age").value = info.age || "";
        document.getElementById("gender").value = info.gender || "";
        document.getElementById("weight").value = info.weight || "";
      } else {
        //console.warn("서버에서 가져온 데이터가 비어 있습니다.");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});
