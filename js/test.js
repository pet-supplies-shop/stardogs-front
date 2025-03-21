const products = [
    { name: "오리젠 사료 오리지널 독 2kg", category: "전연령용", price: "35,000원" },
    { name: "뉴트리나 건강백서 사료 푸들 10.2kg", category: "전연령용", price: "40,000원" },
    { name: "뉴트리나 건강백서 사료 말티즈 10.2kg", category: "전연령용", price: "38,000원" },
    { name: "뉴트리나 건강백서 사료 건강한 체중 6kg", category: "전연령용", price: "25,000원" },
    { name: "뉴트리나 건강백서 사료 건강한 관절 10.2kg", category: "전연령용", price: "42,000원" },
    { name: "네츄럴코어 센시티브케어 바다 물메기 35g", category: "전연령용", price: "12,000원" },
    { name: "네츄럴코어 센시티브케어 밀웜 35g", category: "전연령용", price: "15,000원" },
    { name: "오리젠 사료 오리지널 독 2kg", category: "전연령용", price: "35,000원" },
    { name: "오리젠 사료 퍼피 라지브리드 독 11.4kg", category: "자견용", price: "32,000원" },
    { name: "오리젠 사료 퍼피 독 11.4kg", category: "자견용", price: "34,000원" },
    { name: "오리젠 사료 퍼피 독 2kg", category: "자견용", price: "29,000원" },
    { name: "아카나 사료 퍼피 스몰브리드 독 6kg", category: "자견용", price: "41,000원" },
    { name: "로얄캐닌 강아지사료 푸들 퍼피 1.5kg", category: "자견용", price: "40,000원" },
    { name: "로얄캐닌 강아지사료 엑스스몰 퍼피 3kg", category: "자견용", price: "36,000원" },
    { name: "로얄캐닌 강아지사료 라브라도리트리버 퍼피 3kg", category: "자견용", price: "22,000원" },
    { name: "뉴트리나 건강백서 사료 건강한 1세 2kg", category: "자견용", price: "27,000원" }
];

const productList = document.getElementById('productList');
const visualSection = document.querySelector('.visual');

// 상품 목록을 초기화하고 화면에 출력하는 함수
function displayProducts(productArray) {
    productList.innerHTML = ''; // 기존 목록 초기화

    if (productArray.length > 0) {
        // "사료" 제목 추가
        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = '사료';
        productList.appendChild(title);

        // "분류보기" 텍스트 추가
        const categoryBox = document.createElement('div');
        categoryBox.className = 'category-box';
        
        // "분류보기" 텍스트와 화살표 아이콘 추가
        categoryBox.innerHTML = `
            <span class="category-text">분류보기</span>
            <img src="./img/dropdown.svg" class="dropdown-icon" alt="Dropdown Arrow">
        `;
        
        productList.appendChild(categoryBox);

        // "전연령용" 카테고리 텍스트 추가
        const detailCategoryBox = document.createElement('div');
        detailCategoryBox.className = 'detail-category-box';
        detailCategoryBox.innerHTML = '<span class="detail-category-text">전연령용</span>';
        productList.appendChild(detailCategoryBox);
    }

    productArray.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';

        // 이미지 경로 자동 설정 (img/카테고리명/상품명.jpg)
        const imagePath = `img/${product.category}/${product.name}.jpg`;

        // 상품 이름과 가격을 추가
        productItem.innerHTML = `
            <img src="${imagePath}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="product-price">${product.price}</p> <!-- 가격 추가 -->
        `;
        
        productList.appendChild(productItem);
    });

    // 상품이 존재하면 visual 섹션 숨기고, productList 표시
    visualSection.style.display = productArray.length > 0 ? 'none' : 'block';
    productList.style.display = productArray.length > 0 ? 'flex' : 'none';
}

// 카테고리 버튼 클릭 이벤트
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', () => {
        const selectedCategory = category.getAttribute('data-category');
        const filteredProducts = products.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    });
});

// 초기에는 상품을 표시하지 않음 (홈 화면 유지)
productList.style.display = 'none';
