// cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')


cartIcon.onclick = () => {
    cart.classList.add("active");
};
closeCart.onclick = () => {
    cart.classList.remove("active");
};


// Cara Kerja Cart
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

//fungsi cart
function ready() {

    var reomveCartButtons = document.getElementsByClassName('cart-remove')
    console.log(reomveCartButtons)
    for (var i = 0; i < reomveCartButtons.length; i++) {
        var button = reomveCartButtons[i]
        button.addEventListener('click' , removeCartItem);
    }

    //reomve items from cart
    function removeCartItem(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.remove()
    }
    // quatity
    var quatityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quatityInputs.length; i++) {
        var input = quatityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // add To cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // buy button
    document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButtonClicked);

    // buy botton
    function buyButtonClicked(){
        alert("Barang Berhasil di Beli")
        var cartContent = document.getElementsByClassName('cart-content')[0]
        while (cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild)
        }
    }
}

document.querySelector('.btn-buy').addEventListener('click', function() {
    // Array untuk menyimpan detail produk yang dipilih
    var products = [];
    
    // Mendapatkan semua produk yang dipilih
    document.querySelectorAll('.product-box').forEach(function(productBox) {
        var productName = productBox.querySelector('.product-title').innerText;
        var productPrice = productBox.querySelector('.price').innerText;
        // Menambahkan detail produk ke dalam array
        products.push(productName + " - " + productPrice);
    });
    
    // Membuat pesan yang berisi detail semua produk yang dipilih
    var pesan = "Saya ingin memesan:\n\n";
    for (var i = 0; i < products.length; i++) {
        pesan += products[i] + "\n";
    }
    
    // Nomor telepon tujuan
    var nomorTelepon = "6288707773700"; // Ganti dengan nomor telepon tujuan
    
    // Membuat URL untuk aplikasi WhatsApp dengan pesan yang dipilih
    var url = "https://wa.me/" + nomorTelepon + "?text=" + encodeURIComponent(pesan);
    
    // Mengarahkan pengguna ke aplikasi WhatsApp
    window.location.href = url;
});

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//quatity change
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal(); 
}

// add co cart
function addCartClicked(event) {
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price , productImg);
    updatetotal();
}
function addProductToCart (title, price, productImg){ 
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title){
            alert("Item Sudah Tersedia di keranjang");
        return;
        }
        
    }


var cartBoxContent = `
                           <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            <div>
                                <i class='bx bx-trash cart-remove'></i> `;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("Rp.", ""))
        var quantity = quantityElement.value
        total= total + price * quantity;
    }
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = 'Rp.' + total + '.000';
    
}   