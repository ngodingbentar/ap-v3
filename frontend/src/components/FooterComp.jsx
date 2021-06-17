import React from 'react'
import { Link } from 'react-router-dom';

export default function FooterComp() {
  return (
    <div className="kaki mt-4">
      <div>
        <ul className="socials">
          <li>
            <Link to="/tentang">
              Tentang Kami
            </Link>
          </li>
          <li>||</li>
          <li>
            <Link to="/kontak">
              Kontak
            </Link>
          </li>
          <li>||</li>
          <li>
            <Link to="/panduan-belanja">
              Panduan Belanja
            </Link>
          </li>
        </ul>
      </div>
      <ul className="socials">
        <li><a target="_blank" rel="noreferrer" href="https://www.facebook.com/Aruspinggir-823536244683984"><i className="fa fa-facebook"></i></a></li>
        <li><a target="_blank" rel="noreferrer" href="http://instagram.com/aruspinggir"><i className="fa fa-instagram"></i></a></li>
        <li><a target="_blank" rel="noreferrer" href="https://api.whatsapp.com/send/?phone=6285645523575&text&app_absent=0"><i className="fa fa-whatsapp"></i></a></li>
      </ul>
      &copy; 2021 Aruspinggir
    </div>
  )
}
