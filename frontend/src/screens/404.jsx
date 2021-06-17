import React from 'react'
// import logo from '../..public/404light.svg';

export default function NotFoundScreen() {
  return (
    <div className="Notfound">
      <h3><b>Halaman tidak tersedia</b></h3>
      <h4><b><a href="/">Aruspinggir</a></b></h4>
      <hr/>
      <img className="imgNotfound" src='https://aruspinggir-bucket.s3.ap-southeast-1.amazonaws.com/404light.svg' alt="Logo" />
    </div>
  )
}
