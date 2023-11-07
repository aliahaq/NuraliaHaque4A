function buttonClicked() {
  var brand = document.getElementById("searchBrand").value;
  var category = document.getElementById("searchCategory").value;

  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&category=${category}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status} - ${response.statusText})`);
      }
      return response.json();
    })
    .then((data) => {
      const filteredProducts = data.filter((product) => {
        return product.brand === brand && product.product_type === category;
      });

      if (filteredProducts.length > 0) {
        var templateHTML = "";

        filteredProducts.forEach((product) => {
          templateHTML += `
          <div class="template">
            <div class="template-img">
              <img src="${product.image_link}">
            </div>
            <div class="template-details">
              <ul>
                <li> Brand: <span id="productBrand">${product.brand}</span></li>
                <li></li>
                <li> Name: <span id="productName">${product.name}</span></li>
                <li></li>
                <li> Type: <span id="productType">${product.product_type}</span> </li>
                <li></li>
                <li>Category: <span id="productCategory">${product.category}</span></li>
                <li></li>
                <li> Description: <span id="productDesc">${product.description}</span></li>
                <li></li>
                <li> Price: RM <span id="productPrice">${product.price}</span></li>
                <li></li>
                <li><button onclick="buyProduct('${product.product_link}')">Buy now</button></li>
                <li></li>
                <li><button onclick="visitWeb('${product.website_link}')">Read More</button></li>
              </ul>
            </div>
          </div>
          `;
        });

        document.getElementById("product").innerHTML = templateHTML;
      } else {
        document.getElementById("product").innerHTML = "No products found";
      }
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    });
}

function buyProduct(link) {
  window.open(link, '_blank');
}

function visitWeb(link) {
  window.open(link, '_blank');
}

function feedback() {
  window.location.href = 'feedback.html';
}
