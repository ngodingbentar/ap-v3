import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
  const { product } = props;
  return (
    <>
      <div key={product._id} className="kartu">
        <Link to={`/product/${product._id}`}>
          <img className="medium1 img-product" src={product.image} alt={product.name} />
          <div className="card-body">
            { (product.name).length < 30 ? 
              (<p className="text-nol"><strong>{product.name}</strong></p>) : 
              (<p className="text-nol"><strong>{(product.name).substring(0, 30)}. . .</strong></p>)
            }
            <p className="text-nol">Stok : {product.countInStock}</p>
            {/* <button onClick={() => console.log(product)}>cek</button> */}
            <p className="text-nol">Rp. {new Intl.NumberFormat('ID').format(product.price)}</p>
          </div>
        </Link>
      </div>
  </>
  );
}
