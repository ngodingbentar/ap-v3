import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { deleteProduct, listAllProduct } from '../actions/productActions';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';

export default function ProductListScreen(props) {
  const allProduct = useSelector((state) => state.allProduct);
  const { loading, error, products } = allProduct;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    // loading: loadingCreate,
    // error: errorCreate,
    success: successCreate,
    // product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    // loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const { SearchBar } = Search;
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm('Hapus data ?')) {
      dispatch(deleteProduct(id));
    }
  };

  function userIdFormatter(cell, row) {
    return(
      <span>{cell.substring(0, 8)} . . .</span>
    )
  }

  function nameFormatter(cell, row) {
    return(
      <>
        {cell.length > 20 ? (
          <span>{cell.substring(0, 20)} . . .</span>
        ) : (
          <span>{cell}</span>
        )}
      </>
    )
  }

  function authorFormatter(cell, row) {
    return(
      <>
        {cell.length > 20 ? (
          <span>{cell.substring(0, 20)} . . .</span>
        ) : (
          <span>{cell}</span>
        )}
      </>
    )
  }

  function priceFormatter(cell, row) {
    return(
      <span>{new Intl.NumberFormat('ID').format(cell)}</span>
    )
  }

//   const selectOptions = {
//     0: 'Fiksi',
//     1: 'Nonfiksi'
//   };

// const selectOptionsArr = [{
//   value: 0,
//   label: 'good'
// }, {
//   value: 1,
//   label: 'Bad'
// }, {
//   value: 2,
//   label: 'unknown'
// }];

  const columns = [{
    dataField: '_id',
    text: 'ID',
    sort: true,
    formatter: userIdFormatter,
  }, {
    dataField: 'name',
    text: 'Nama',
    sort: true,
    formatter: nameFormatter,
  }, {
    dataField: 'price',
    text: 'Harga',
    sort: true,
    formatter: priceFormatter,
  }, {
    dataField: 'countInStock',
    text: 'Stok',
    sort: true,
  },{
    dataField: 'author',
    text: 'Penulis',
    sort: true,
    formatter: authorFormatter,
  }, {
    dataField: 'category',
    text: 'Kategori',
    sort: true,
    // formatter: cell => selectOptions[cell],
    // filter: selectFilter({
    //   options: selectOptions
    // })
  }, {
    dataField: "link",
    text: "Aksi",
    formatter: (rowContent, row) => {
      return(
        <>
        <Link to={"/product/" + row._id +"/edit"}>
          <Button color="primary" className="mr-2">
            <i className="fa text-white fa-eye"></i>
          </Button>
        </Link>
        <Button color="danger" className="mr-2" onClick={() => deleteHandler(row._id)}>
          <i className="fa text-white fa-trash"></i>
        </Button>
        </>
      )
    }
  }];

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      // props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listAllProduct()
    );
  }, [dispatch, successDelete, successCreate]);

  return (
    <div>
      
      {errorDelete && (
        <MessageBox variant="danger">{errorDelete}</MessageBox>
      )}
      {loading ? (
        <h1>Loading</h1>
      ) : (
      <ToolkitProvider
        keyField="_id"
        data={ products }
        columns={ columns }
        search
      >
        {
          props => (
            <div>
              <div className="rowC mt-4">
                <a href="/create-product">
                  <Button color="primary">Tambah produk</Button>
                </a>
                {/* <button onClick={()=>console.log(products)}>cek</button> */}
                <SearchBar { ...props.searchProps } />
              </div>
              
              <hr />
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              
              {loading && (
                <div className="text-center">
                  <LoadingBox></LoadingBox>
                </div>
              )}
              {products && (
                <>
                <p>Jumlah Produk : {products.length}</p>
                <BootstrapTable
                  { ...props.baseProps }
                  pagination={ paginationFactory() }
                  // filter={ filterFactory() }
                />
                </>
              )}
            </div>
          )
        }
      </ToolkitProvider>
      )}
    </div>
  )
}
