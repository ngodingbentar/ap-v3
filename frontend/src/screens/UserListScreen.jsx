import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET
    })
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    // console.log(user.isAdmin)
    if (window.confirm('Hapus data ?')) {
      dispatch(deleteUser(id));
    }
  };

  function userIdFormatter(cell, row) {
    return(
      <span>{cell.substring(0, 8)} . . .</span>
    )
  }

  function nameFormatter(cell, row) {
    return(
      <span>{cell.substring(0, 35)}</span>
    )
  }

  const { SearchBar } = Search;

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
    dataField: 'email',
    text: 'Email',
    sort: true,
  }, {
    dataField: "link",
    text: "Aksi",
    formatter: (rowContent, row) => {
      return(
        <>
        <Link to={"/user/" + row._id +"/edit"}>
          <Button color="primary" className="mr-2">
            <i className="fa text-white fa-eye"></i>
          </Button>
        </Link>
        {!row.isAdmin && (
          <Button color="danger" className="mr-2" onClick={() => deleteHandler(row._id)}>
            <i className="fa text-white fa-trash"></i>
          </Button>
        )}
        </>
      )
    }
  }];


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
        data={ users }
        columns={ columns }
        search
      >
        {
          props => (
            <div>
              
              <div className="rowC mt-4">
                <h5 className="my-4">Daftar Pengguna</h5>
                <SearchBar { ...props.searchProps } />
              </div>
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              
              {loading && (
                <div className="text-center">
                  <LoadingBox></LoadingBox>
                </div>
              )}
              {users && (
                <BootstrapTable
                  { ...props.baseProps }
                  pagination={ paginationFactory() }
                  // filter={ filterFactory() }
                />
              )}
            </div>
          )
        }
      </ToolkitProvider>
      )}
    </div>
  )
}
