import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

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
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h3 className="my-4">Daftar Pengguna</h3>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAMA</th>
              <th>EMAIL</th>
              {/* <th>ADMIN</th> */}
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td>{user.isAdmin ? 'YES' : 'NO'}</td> */}
                <td>
                  <Link to={"/user/" + user._id +"/edit"}>
                    <Button color="primary" className="mr-2">
                      <i className="fa text-white fa-eye"></i>
                    </Button>
                  </Link>
                  <Button color="danger" className="mr-2" onClick={() => deleteHandler(user)}>
                    <i className="fa text-white fa-trash"></i>
                  </Button>
                  {/* <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    <i className="fa text-white fa-trash"></i>
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
