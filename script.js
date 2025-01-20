// hamburger menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

// loader
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    const loaderDuration = 1000; 

    setTimeout(() => {
        loader.classList.add("loader-hidden");
    }, loaderDuration);

    loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader); 
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortOptions = document.getElementById("sortOptions");
    const scrollTop = document.getElementById("scrollTop");
  
    fetch("products.json")
      .then((response) => response.json())
      .then((products) => {
        populateCategories(products); // Populate categories dynamically
        displayProducts(products);
        categoryFilter.addEventListener("change", () => filterProducts(products));
        sortOptions.addEventListener("change", () => filterProducts(products));
      });
  
    function displayProducts(products) {
      productGrid.innerHTML = products
        .map(
          (product) => `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}" />
            <div class="details">
              <p class="prod-title">${product.name}</p>
              <p>$${product.price.toFixed(2)}</p>

               <button class="cart-button">
	                <span class="add-to-cart ripple-btn">Add to cart</span>
	                <span class="added">Added</span>
	                <i class="fas fa-shopping-cart"></i>
	                <i class="fas fa-box"></i>
                </button>
            </div>
          </div>
        `
        )
        .join("");
        attachRippleEffect();
        const cartButtons = document.querySelectorAll('.cart-button');

        cartButtons.forEach(button => {
        	button.addEventListener('click', cartClick);
        });

        function cartClick() {
        	let button = this;
        	button.classList.add('clicked');
        }
    }
  
    function populateCategories(products) {
      const categories = [...new Set(products.map((product) => product.category))];
  
      categoryFilter.innerHTML = `
        <option value="">All Categories</option>
        ${categories.map((category) => `<option value="${category}">${category}</option>`).join("")}
      `;
    }
  
    function filterProducts(products) {
      const category = categoryFilter.value;
      const sortOption = sortOptions.value;
  
      let filteredProducts = products.filter((product) =>
        category ? product.category === category : true
      );
  
      if (sortOption === "priceLowHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === "priceHighLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
  
      displayProducts(filteredProducts);
    }
  
  
    // Scroll-to-top button
    window.addEventListener("scroll", () => {
      scrollTop.style.display = window.scrollY > 200 ? "block" : "none";
    });
  
    scrollTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });


function attachRippleEffect() {
    const buttons = document.querySelectorAll(".ripple-btn");
  
    buttons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        let ripple = document.createElement("span");
        ripple.classList.add("ripple");
        this.appendChild(ripple);
  
        let x = e.clientX - e.currentTarget.getBoundingClientRect().left;
        let y = e.clientY - e.currentTarget.getBoundingClientRect().top;
  
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
  
        setTimeout(() => {
          ripple.remove();
        }, 300);
      });
    });
  }
  