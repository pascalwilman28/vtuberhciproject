var cart = [];
var cartList = document.getElementById("cartList");

function defaultCart() {
    cart = JSON.parse(localStorage.getItem("CART"));
    if (cart == null || cart.length == 0) {
        cart=[];
        hideCart();
    } else {
        showCart();
    }
}

function checkProductAvaibility(name){
    for (let i = 0; i < cart.length; i++) {
        if(name === cart[i].name){
            cart[i].qty += 1;
            localStorage.setItem("CART", JSON.stringify(cart));
            return true;
        }
    }
    return false;
}

//function untuk menambah item ke cart
function addToCart(item, category, qty) {
    //get children item karna name dan price ada di div child-nya item
    var details = item.children[1];

    //simpan teks di HTML ke variabel
    var image_src = item.children[0].getAttribute("src");
    var name = details.children[0].innerText;
    var price = details.children[1].innerText;

    if(!checkProductAvaibility(name)){
        //simpan variabel-variabel di atas ke local storage
        product = {id: cart.length-1*-1, img: image_src, name: name, price: price, category: category, qty : qty};
        cart.push(product);
        localStorage.setItem("CART", JSON.stringify(cart));
        alert("Product " + name + " Success add to cart");
    }else{
        alert("Product " + name + " Success Update to cart");
    }
}

//untuk mencari index item berdasarkan nama item
function searchItem(name) {
    for (let i = 0; i < cart.length; i++) {
        if(name === cart[i].name) return i;
    }
    return null;
}

//untuk menambah atau mengurangi qty item
function updateQty(item, action) {
    var details = item.previousElementSibling;
    var subtotal = item.nextElementSibling;
    var subtotalPrice = parseFloat(subtotal.innerText.slice(1));
    var grandtotal = document.getElementById("grandtotal");
    var grandtotalPrice = parseFloat(grandtotal.innerText.slice(1));
    var tax = document.getElementById("tax");
    var alltotal = document.getElementById("alltotal");

    var index = searchItem(details.children[1].children[1].innerText);
    
    if (index != null) {
        var itemPrice = parseFloat(cart[index].price.slice(1));

        if (action == "-" && cart[index].qty == 1) {    //kalau dikurang dan qty sisa 1, hapus item dari cart
            deleteFromCart(index, item.parentElement);
            return;
        } else if (action == "-") {     //kalau dikurang dan qty > 1 berarti kurangi seperti biasa
            cart[index].qty -= 1;
            subtotalPrice -= itemPrice;
            grandtotalPrice -= itemPrice;
        } else {    //action = "+"
            cart[index].qty += 1;
            subtotalPrice += itemPrice;
            grandtotalPrice += itemPrice;
        }
        localStorage.setItem("CART", JSON.stringify(cart)); //update local storage
        //update tampilan di HTML
        item.children[1].innerText = cart[index].qty;
        subtotal.innerText = "$" + subtotalPrice.toFixed(2).toString();
        grandtotal.innerText = "$" + grandtotalPrice.toFixed(2).toString();
        tax.innerText = "$" + (0.10 * grandtotalPrice).toFixed(2).toString();
        alltotal.innerText = "$" + (1.10 * grandtotalPrice).toFixed(2).toString();
    }
}

defaultCart();

function showCart(){
    document.getElementById("empty-cart").style.display = "none";
    document.getElementById("cart-info").style.display = "block";

    let price,qty,tax=0,subtotal=0,grandtotal=0,alltotal=0;
    for (let i = 0; i < cart.length; i++) {
        price = parseFloat(cart[i].price.slice(1));
        qty = parseInt(cart[i].qty);
        subtotal = price * qty;
        grandtotal += subtotal;
        cartList.innerHTML += `
                <div class="product-box">
                    <div class="product product-column">
                        <div class="photo"><img src="${cart[i].img}" alt=""></div>
                        <div class="product-detail">
                            <h4 class="category">${cart[i].category}</h4>
                            <h4 class="product-name">${cart[i].name}</h4>
                            <h4 class="product-price">${cart[i].price}</h4>
                            <button id="delete-product" onclick="deleteFromCart(${i}, this.parentElement.parentElement.parentElement)">
                                <span class="material-icons delete">delete</span>
                            </button>
                        </div>
                    </div>
                    <div class="product-qty quantity-column">
                        <button id="addQty" onclick="updateQty(this.parentElement, '-')">
                            <span class="material-icons-round qty">remove</span>
                        </button>
                        <p>${qty}</p>
                        <button id="minQty" onclick="updateQty(this.parentElement, '+')">
                            <span class="material-icons-round qty">add</span>
                        </button>
                    </div>
                    <div class="subtotal subtotal-column">
                        $${subtotal.toFixed(2)}
                    </div>
                </div>
                <hr class="line-gap">
        `
    }    

    tax = 0.10 * grandtotal;
    alltotal = grandtotal + tax;

    cartList.innerHTML += `
        <hr class="total-gap" size="8">
        <div class="price-detail">
            <div class="title-price">Subtotal</div>
            <div class="detail-price" id="grandtotal">$${grandtotal.toFixed(2)}</div>
        </div>
        <div class="price-detail">
            <div class="title-price">Tax</div>
            <div class="detail-price" id="tax">$${tax.toFixed(2)}</div>
        </div>
        <div class="price-detail">
            <div class="title-price">Total</div>
            <div class="detail-price" id="alltotal">$${alltotal.toFixed(2)}</div>
        </div>
    `
}

function hideCart() {
    $("#cart-info")
        .fadeOut()
        .css("display", "none");
    $("#empty-cart")
        .fadeIn(1000)
        .css("display", "block");
}

function deleteFromCart (index, container) {
    //hapus item dari cart
    cart.splice(index, 1);
    //update di local storage
    localStorage.setItem('CART', JSON.stringify(cart));
    //hapus item dari tampilan HTML
    $(container).animate({
        "margin-left": "100vw",
        "height": "toggle"
    }, "swing");
    $(container.nextElementSibling).fadeOut();

    //display cart empty kalau cart udah ga ada item lagi
    if (cart.length == 0) {
        hideCart();
    }
}

//function untuk validasi
function validate(){
    var name = document.getElementById("name");
    var maleBtn = document.getElementById("genderM");
    var femaleBtn = document.getElementById("genderF");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var address = document.getElementById("address");

    if(name.value == ""){
        alert("Name must be filled");
    }else if(name.value.length < 3){
        alert("Must be at least 3 characters");
    }else if(!maleBtn.checked && !femaleBtn.checked){
        alert("Must select one of your gender");
    }else if(email.value == ""){
        alert("Email must be filled");
    }else if(!email.value.endsWith(".com") || email.value.indexOf("@") === -1){
        alert("Must be a valid email (contains @ and ends with .com)");
    }else if(phone.value.indexOf("+81") === -1 || phone.value.length < 14){
        alert("Must starts with “+81” and must be 11 digits length (excluding the “+81”)");
    }else if(!address.value.endsWith("Street")){
        alert("Must ends with “Street”");
    }else{
        alert("Successfully Buy All Items, We will send it to " + name.value);
        $("#customerform").fadeOut(1000);
        localStorage.clear();
        defaultCart();

        setTimeout("location.reload(true);",3000);
    }
}

function checkout(){
    if(cart==null){
        alert("Sorry, your cart is empty...");
    }else{
        document.getElementById("customerform").style.visibility ="visible";
    }
}

function closeform(){
    document.getElementById("customerform").style.visibility = "hidden";
}
