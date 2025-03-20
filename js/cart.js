document.addEventListener("DOMContentLoaded", async function () {
    await loadCart(); // 장바구니 목록 불러오기
});

// 장바구니 불러오기
async function loadCart() {
    try {
        const response = await axios.get("http://localhost:8080/getCart");
        const cartItems = response.data;

        let cartHtml = "";
        cartItems.forEach((item) => {
            cartHtml += `
                <div class="cart-item">
                    <img src="img/${item.pimg}" class="cart-img">
                    <div class="cart-info">
                        <p>${item.prodname}</p>
                        <p class="text-danger">${item.price}원</p>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.prodcode})">삭제</button>
                    </div>
                </div>
            `;
        });

        document.getElementById("cartList").innerHTML = cartHtml;
    } catch (error) {
        console.error("장바구니 데이터를 불러오는 중 오류 발생:", error);
    }
}

// 장바구니에 추가
async function addToCart(prodcode) {
    try {
        await axios.post("http://localhost:8080/addToCart", { prodcode });
        alert("장바구니에 추가되었습니다!");
        await loadCart(); // 장바구니 새로고침
    } catch (error) {
        console.error("장바구니 추가 오류:", error);
        alert("장바구니 추가에 실패했습니다.");
    }
}

// 장바구니에서 삭제
async function removeFromCart(prodcode) {
    try {
        await axios.post("http://localhost:8080/removeFromCart", { prodcode });
        alert("상품이 삭제되었습니다!");
        await loadCart(); // 장바구니 새로고침
    } catch (error) {
        console.error("장바구니 삭제 오류:", error);
        alert("삭제에 실패했습니다.");
    }
}