const menButton = document.getElementById("menButton");
const womenButton = document.getElementById("womenButton");
const kidsButton = document.getElementById("kidsButton");

const section = document.querySelector(".items-list");

let data = null;
async function fetchDataFromAPI() {
  const response = await fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  );
  data = await response.json();
}

window.addEventListener("load", async () => {
  await fetchDataFromAPI();
  printCardData(0); // Default to men's products
});

async function printCardData(index) {
  section.innerHTML = "";
  data.categories[index].category_products.forEach((item) => {
    const compareAtPrice = Number(item.compare_at_price);
    const price = Number(item.price);
    const discount = Math.floor(
      ((compareAtPrice - price) / compareAtPrice) * 100
    );
    const itemData = `
            <div class="item">
                <div class="img-container" style="background-image: url('${
                  item.image
                }');">
                    ${
                      item.badge_text === null
                        ? ""
                        : '<div id="badge_text">' + item.badge_text + "</div>"
                    }
                </div>
                <div class="information-container">
                    <p>
                        <span id="title-cloth">${item.title}</span>
                        <span>&#x2022;</span>
                        <span id="vendor">${item.vendor}</span>
                    </p>
                    <p style="margin-top: -5px">
                        <span id="discounted-price">Rs. ${item.price}</span>
                        <span id="original-price">Rs. ${
                          item.compare_at_price
                        }</span>
                        <span id="discount">${discount}% Off</span>
                    </p>
                </div>
                <div class="cart-container">
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
    section.innerHTML += itemData;
  });
}

const allButtons = [menButton, womenButton, kidsButton];
allButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    section.innerHTML = "";
    allButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    printCardData(index);
  });
});
