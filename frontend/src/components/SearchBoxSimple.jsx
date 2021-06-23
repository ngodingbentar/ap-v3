import React, { useState } from 'react';

export default function SearchBoxSimple(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search-simple" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="search"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search text-white"></i>
        </button>
      </div>
    </form>
  );
}
