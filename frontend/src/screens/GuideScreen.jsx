import React from 'react'

export default function GuideScreen() {
  return (
    <div className="container mt-4">
      <div className="text-center">
        <h3>Panduan Belanja</h3>
      </div>
      <h5>1. Pilih Produk</h5>
      <p>Pilih produk yang ingin dibeli, dan tentukan jumlahnya.</p>
      <h5>2. Tambah ke Keranjang</h5>
      <p>Setelah itu klik "Masukkan ke Keranjang". Kemudian akan di arahkan ke keranjang.</p>
      <h5>3. Beli Produk</h5>
      <p>Setelah itu klik "Beli" jika ingin langsung membelinya.</p>
      <h5>4. Alamat Pengiriman</h5>
      <p>Setelah itu isi data-data alamat pengiriman, kemudian klik "Lanjut".</p>
      <h5>5. Metode Pembayaran</h5>
      <p>Kemudian pilih metode pembayaran yang diinginkan, kemudian klik "Lanjut".</p>
      <h5>6. Pesan Produk</h5>
      <p>Kemudian pilih jasa pengiriman, dan lihat detail pesananmu, jika sudah benar maka klik "Pesan Sekarang".</p>
      <h5>7. Pembayaran</h5>
      <p>Lakukan pembayaran ke rekening yang ditampilkan di halaman detail pesanan.</p>
      <h5>8. Konfirmasi Pembayaran</h5>
      <p>Jika sudah melakukan pembayaran, lalu lakukan konfirmasi pembayaran dengan cara upload bukti transfer di bagian "Upload bukti transfer" yang ada di halaman detail pemesanan. Setelah berhasil upload bukti transfer klik Konfirmasi.</p>
      <h5>9. Proses Pengiriman</h5>
      <p>Setelah kami menerima konfirmasi pembayaran anda, kami akan segera melakukan pengiriman pesanan anda.</p>
      <hr/>
      <h4> <i>Terima kasih telah berbelanja di Aruspinggir !</i></h4>
    </div>
  )
}
