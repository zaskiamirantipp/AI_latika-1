// 1. Array Objects sebagai pengganti Database Menu
const menuData = [
  {
    id: 1,
    nama: "Es Kopi Susu Senja",
    kategori: "minuman",
    harga: 18000,
    gambar: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=200"
  },
  {
    id: 2,
    nama: "Matcha Latte",
    kategori: "minuman",
    harga: 22000,
    gambar: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=200"
  },
  {
    id: 3,
    nama: "Nasi Goreng Spesial",
    kategori: "makanan",
    harga: 25000,
    gambar: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200"
  },
  {
    id: 4,
    nama: "French Fries Crispy",
    kategori: "camilan",
    harga: 15000,
    gambar: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200"
  }
];

let cart = [];

// 2. Fungsi Menampilkan Menu ke Layar
function renderMenu(data) {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";

  data.forEach(item => {
    container.innerHTML += `
      <div class="menu-card">
        <img src="${item.gambar}" alt="${item.nama}">
        <div class="menu-info">
          <div>
            <div class="menu-title">${item.nama}</div>
            <div class="menu-price">Rp ${item.harga.toLocaleString('id-ID')}</div>
          </div>
          <button class="btn-add" onclick="addToCart(${item.id})">+ Tambah</button>
        </div>
      </div>
    `;
  });
}

// 3. Fungsi Filter berdasarkan Kategori
function filterMenu(kategori) {
  // Ubah status tombol aktif
  const buttons = document.querySelectorAll('.btn-category');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (kategori === 'semua') {
    renderMenu(menuData);
  } else {
    const filtered = menuData.filter(item => item.kategori === kategori);
    renderMenu(filtered);
  }
}

// 4. Fungsi Menambah Item ke Keranjang
function addToCart(id) {
  const item = menuData.find(m => m.id === id);
  const existingItem = cart.find(c => c.id === id);

  if (existingItem) {
    existingItem.jumlah += 1;
  } else {
    cart.push({ ...item, jumlah: 1 });
  }

  updateCartView();
}

// 5. Fungsi Mengelolakan Tampilan Keranjang & Total
function updateCartView() {
  const cartList = document.getElementById("cart-list");
  const totalPrice = document.getElementById("total-price");
  
  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = "<li style='color:#888;'>Belum ada pesanan dipilih</li>";
  } else {
    cart.forEach(item => {
      const subtotal = item.harga * item.jumlah;
      total += subtotal;
      cartList.innerHTML += `
        <li class="cart-item">
          <span>${item.nama} x ${item.jumlah}</span>
          <span>Rp ${subtotal.toLocaleString('id-ID')}</span>
        </li>
      `;
    });
  }

  totalPrice.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// 6. Integrasi Kirim Pesanan ke WhatsApp Kasir (Ganti nomor sesuai kebutuhan)
function checkoutWA() {
  if (cart.length === 0) {
    alert("Silakan pilih menu terlebih dahulu!");
    return;
  }

  const nomerWA = "6281234567890"; // Ganti dengan nomor WhatsApp kasir
  let pesan = "Halo, saya mau pesan menu berikut:\n\n";

  let total = 0;
  cart.forEach((item, index) => {
    const subtotal = item.harga * item.jumlah;
    total += subtotal;
    pesan += `${index + 1}. ${item.nama} (${item.jumlah}x) - Rp ${subtotal.toLocaleString('id-ID')}\n`;
  });

  pesan += `\n*Total: Rp ${total.toLocaleString('id-ID')}*`;

  // Encode teks pesan agar bisa dikirim via URL
  const url = `https://wa.me/${nomerWA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
}

// Jalankan fungsi awal saat halaman dimuat
renderMenu(menuData);
updateCartView();
