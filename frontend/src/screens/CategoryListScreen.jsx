import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { deleteCategory, listCategory } from '../actions/categoryActions';
import { CATEGORY_DELETE_RESET } from '../constants/categoryConstants';

export default function CategoryListScreen(props) {
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, error, loading } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    // loading: loadingDelete,
    error: errorDelete,
    success,
  } = categoryDelete;

  function userIdFormatter(cell, row) {
    return(
      <span>{cell.substring(0, 8)} . . .</span>
    )
  }

  // table
  const columns = [
    {
      dataField: '_id',
      text: 'ID',
      formatter: userIdFormatter,
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Nama',
      sort: true,
    },
    {
      dataField: "link",
      text: "Aksi",
      formatter: (rowContent, row) => {
        return(
          <>
          {/* <a to={"/kategori/" + row._id}> */}
          <a href={"/kategori/" + row._id}>
            <Button color="primary" className="mr-2">
              <i className="fa text-white fa-eye"></i>
            </Button>
          </a>
          <Button color="danger" className="mr-2" onClick={() => deleteHandler(row._id)}>
            <i className="fa text-white fa-trash"></i>
          </Button>
          </>
        )
      }
    }
  ];

  const { SearchBar } = Search;


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategory());
    if (success) {
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
  }, [dispatch, success]);

  const deleteHandler = (id) => {
    if (window.confirm('Hapus kategori ?')) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="mt-4">
      {errorDelete && (<MessageBox variant="danger">{errorDelete}</MessageBox>)}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ToolkitProvider
          keyField="_id"
          data={ categories }
          columns={ columns }
          search
        >
          {
            props => (
              <div>
                <div className="rowC">
                  <div>
                  <a href="/tambah-kategori">
                    <Button color="primary">Tambah Kategori</Button>
                  </a>
                  </div>
                  <div>
                    <SearchBar { ...props.searchProps } />
                  </div>
                </div>
                <hr />
                <p>Jumlah Kategori : {categories.length}</p>
                <BootstrapTable
                  { ...props.baseProps }
                  pagination={ paginationFactory() }
                />
              </div>
            )
          }
        </ToolkitProvider>
      )}
    </div>
  );
}
