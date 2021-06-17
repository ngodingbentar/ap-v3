import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProductCategories, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { prices } from '../utils';
import { Col } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function SearchScreen(props) {
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const [dropdownOpenSort, setdropdownOpenSort] = useState(false);
  const toggleSort = () => setdropdownOpenSort(prevState => !prevState);

  const [dropdownOpenCategory, setdropdownOpenCategory] = useState(false);
  const toggleCategory = () => setdropdownOpenCategory(prevState => !prevState);

  const [dropdownOpenPrice, setdropdownOpenPrice] = useState(false);
  const togglePrice = () => setdropdownOpenPrice(prevState => !prevState);

  const [isActive, setIsActive] = useState('newest');

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        order,
      })
    );
    dispatch(listProductCategories())
  }, [category, dispatch, max, min, name, order, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
  };

  const sorting = (x) => {
    setIsActive(x)
    props.history.push(getFilterUrl({ order: x }));
  }
  return (
    <div>
      {/* <div className="rowC mt-4">
        <div></div>
        <div>
          Urutkan{' '}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Terbaru</option>
            <option value="lowest">Harga: Rendah ke Tinggi</option>
            <option value="highest">Harga: Tinggi ke Rendah</option>
          </select>
        </div>
      </div> */}
      <div className="custome">
        <div>
        <Dropdown isOpen={dropdownOpenSort} toggle={toggleSort}>
          <DropdownToggle caret>
            Urutkan
          </DropdownToggle>
          <DropdownMenu className="search-drop">
            <DropdownItem
              className={'newest' === isActive ? 'activeSort' : ''}
              onClick={() => sorting('newest')}
            >Terbaru</DropdownItem>
            <DropdownItem
              className={'lowest' === isActive ? 'activeSort' : ''}
              onClick={() => sorting('lowest')}
            >Harga: Rendah ke Tinggi</DropdownItem>
            <DropdownItem
              className={'highest' === isActive ? 'activeSort' : ''}
              onClick={() => sorting('highest')}
            >Harga: Tinggi ke Rendah</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
        <div>
        <Dropdown isOpen={dropdownOpenCategory} toggle={toggleCategory}>
          <DropdownToggle caret>
            Kategori
          </DropdownToggle>
          <DropdownMenu className="search-drop">
            {categories ? (
              <>
              <Link
                to={getFilterUrl({ category: 'all' })}
              >
                <DropdownItem
                  className={'all' === category ? 'drop-active' : ''}
                >
                  Semua
                </DropdownItem>
              </Link>
              {categories.map((c) => (
              <Link
                key={c._id}
                to={getFilterUrl({ category: c.name })}
              >
                  <DropdownItem
                    className={c.name === category ? 'drop-active' : ''}
                  >
                    {c.name}
                  </DropdownItem>
                </Link>
                ))}
              </>
            ) : (
              <h1>Loading</h1>
            )}
          </DropdownMenu>
        </Dropdown>
        </div>
        <div>
        <Dropdown isOpen={dropdownOpenPrice} toggle={togglePrice}>
          <DropdownToggle caret>
            Harga
          </DropdownToggle>
          <DropdownMenu right className="search-drop">
            {prices ? (
              <>
              {prices.map((p) => (
                <Link
                  key={p.id}
                  to={getFilterUrl({ min: p.min, max: p.max })}
                >
                  <DropdownItem
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'drop-active' : ''
                    }
                  >
                    {p.name}
                  </DropdownItem>
                </Link>
                ))}
              </>
            ) : (
              <h1>Loading</h1>
            )}
          </DropdownMenu>
        </Dropdown>
        </div>
      </div>
      <div className="rowC list-product-search">
        {/* <Col xs="2">
          <div className="">
            <h3>Kategori</h3>
            {categories ? (
              <div>
              <ul className="search-ul">
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  >
                    Semua
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c._id}>
                    <Link
                      className={c.name === category ? 'active' : ''}
                      to={getFilterUrl({ category: c.name })}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            ) : (
              <LoadingBox></LoadingBox>
            )}
            
            <div className="mt-4">
              <h3>Harga</h3>
              <ul className="search-ul">
                {prices.map((p) => (
                  <li key={p.name}>
                    <Link
                      to={getFilterUrl({ min: p.min, max: p.max })}
                      className={
                        `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                      }
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col> */}
        <Col xs="12">
          <div className="">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                {products.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}
                <div className="row center">
                  {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
                </div>
                <div className="row center pagination-custom">
                  {[...Array(pages).keys()].map((x) => (
                    <Link
                      className={x + 1 === page ? 'active' : ''}
                      key={x + 1}
                      to={getFilterUrl({ page: x + 1 })}
                    >
                      {x + 1}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </Col>
      </div>
    </div>
  );
}
