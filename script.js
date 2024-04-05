// script.js

document.addEventListener("DOMContentLoaded", function() {
    const toggler = document.getElementById('toggler');
    const navbar = document.querySelector('.navbar');
    const addToCartButtons = document.querySelectorAll('.cart-btn');

    toggler.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });

    function addToCart() {
        alert('Item Telah Ditambahkan');
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function initMap() {
        // Koordinat lokasi yang akan ditampilkan pada peta
        var myLatLng = {lat: -0.7893, lng: 113.9213}; // Ini hanya contoh koordinat, sesuaikan dengan lokasi Anda

        // Buat objek peta dan tentukan elemen HTML di mana peta akan dimuat
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10, // Besarnya zoom peta
            center: myLatLng // Lokasi tengah peta
        });

        // Buat penanda pada peta
        var marker = new google.maps.Marker({
            position: myLatLng, // Lokasi penanda
            map: map, // Objek peta yang akan digunakan
            title: 'Klik di sini' // Judul penanda (tampilkan saat kursor diarahkan ke penanda)
        });

        // Tambahkan event listener untuk penanda, sehingga ketika penanda diklik, akan muncul pesan
        marker.addListener('click', function() {
            alert('Anda mengklik penanda!');
        });
    }
});
