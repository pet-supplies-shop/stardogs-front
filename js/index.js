// 카테고리 클릭 이벤트 처리
document.addEventListener("DOMContentLoaded", function () {
  const categoryItems = document.querySelectorAll('.category');
  categoryItems.forEach(item => {
    item.addEventListener('click', async (event) => {
      const category = event.target.getAttribute('data-category');
      console.log(`${category} 카테고리 클릭됨`); // 확인용 로그

      try {
        const response = await axios.get(`http://localhost:8080/getProductsByCategory?category=${category}`);
        const productList = response.data;
        let productListDiv = '';

        productList.forEach(item => {
          productListDiv += `
            <div class="product-card">
              <img src="img/${item.pimg}" class="card-img-top" alt="${item.prodname}">
              <div class="card-body">
                <b class="card-title">${item.prodname}</b>
                <p class="card-text">${item.price}원</p>
              </div>
            </div>
          `;
        });

        // 상품 목록을 섹션에 추가
        document.getElementById("productList").innerHTML = productListDiv;

      } catch (error) {
        console.error("카테고리 상품을 가져오는 데 오류가 발생했습니다:", error);
      }
    });
  });
});