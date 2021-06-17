import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function CategoriesComp() {
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  return (
    <div className="row center">
      {loading && (
        <LoadingBox></LoadingBox>
      )}
      {error && (
        <MessageBox>{error}</MessageBox>
      )}
      {categories && (
        categories.map((c) => (
          <div key={c._id} className="img-container">
            <Link to={'/search/category/'+c.name}>
              <img className="image-cat" src={c.image} alt="Avatar" />
              <div className="img-overlay">
                <div className="img-text">{c.name}</div>
              </div>
              <div className="text-categories">{c.name}</div>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}
