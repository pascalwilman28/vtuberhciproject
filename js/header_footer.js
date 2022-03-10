class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="header-container" id="header-container">
                    <!-- Logo -->
                    <div class="logo">
                        <a href="index.html">
                            <img src="./assets/logo/Virtual Talent Agency.png" alt="logo" id="logo">
                        </a>
                    </div>
            
                    <!-- Search Bar Website -->
                    <div class="search-bar">
                        <span class="material-icons-round search">search</span>
                        <input type="search" name="" id="search" size="25" placeholder="Search..." autocomplete="off">
                    </div>
            
                    <!-- Navigation Bar -->
                    <div class="dropdown">
                        <span class="material-icons-round menu">menu</span>
                        <div class="nav-menu">
                            <a href="index.html">
                                <img src="./assets/img/navbar/home.png" alt="home">Home
                            </a>
                            <a href="talent.html">
                                <img src="./assets/img/navbar/talent.png" alt="Talent">Talent
                            </a>
                            <a href="nendroid.html">
                                <img src="./assets/img/navbar/figure.png" alt="figure">Figure
                            </a>
                            <a href="merchandise.html">
                                <img src="./assets/img/navbar/merchandise.png" alt="merchandise">Merchandise
                            </a>
                            <a href="cart.html">
                                <img src="./assets/img/navbar/cart.png" alt="cart">Cart
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        `
    }
}

customElements.define("custom-header", CustomHeader);



class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="footer-1">
                    <p>Copyright &copy; 2022 All rights reserved.</p>
                </div>
                <div class="footer-2">
                    <p>Visit our social media!<p>
                    <div class="social-media">
                        <a href="https://facebook.com" target="_blank_"><img src="./assets/img/social_media/FacebookLogo.png" alt=""></a>
                        <a href="https://instagram.com" target="_blank_"><img src="./assets/img/social_media/InstagramLogo.png" alt=""></a>
                        <a href="https://twitter.com" target="_blank_"><img src="./assets/img/social_media/TwitterLogo.png" alt=""></a>
                    </div>
                </div>
            </footer>
        `
    }
}

customElements.define("custom-footer", CustomFooter);


//untuk efek scroll navbar
var prevLocation = window.pageYOffset;
window.onscroll = function() {
  var currentLocation = window.pageYOffset;
  if (prevLocation > currentLocation) {     //posisi sblmnya > posisi skrg berarti scroll up
    $("header").css("top", "0");
  } else {  //kalau scroll down
    $("header").css("top", "-60px");
  }
  prevLocation = currentLocation;
}


const menu = document.querySelector(".menu");
const dropdown = document.querySelector(".nav-menu");

//untuk show dropdown menu setelah diklik
menu.addEventListener("click", () => {
    dropdown.classList.toggle("show-dropdown");
});

//untuk close dropdown kalau klik yang lain
window.onclick = function(event) {
    if (dropdown.classList.contains("show-dropdown") &&
        !event.target.matches(".menu")) {
            dropdown.classList.remove("show-dropdown");
    }
}
