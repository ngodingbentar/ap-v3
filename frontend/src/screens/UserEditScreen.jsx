import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function UserEditScreen(props) {
  const userId = props.match.params.id;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(detailsUser(userId));
    }
  }, [dispatch, props.history, user, userId]);

  return (
    <div>
      <div className="form">
        <div>
          <h3>Detail Pengguna</h3>
          <Link to="/daftar-pengguna">
            <Button color="secondary mt-4">
              <i className="fa fa-arrow-left"></i>
              {' '}Kembali
            </Button>
          </Link>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <table className="mx-4 biodata">
              <tbody>
                <tr>
                  <th>Nama</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Label Alamat</th>
                  <td>{user.labelAddress}</td>
                </tr>
                <tr>
                  <th>Nomor telp.</th>
                  <td>
                    {(user.phone.substring(0,1) === '8' ? (<span>0</span>):(<span></span>))}{user.phone}
                  </td>
                </tr>
                <tr>
                  <th>Provinsi</th>
                  <td>{user.province}</td>
                </tr>
                <tr>
                  <th>Kota</th>
                  <td>{user.city}</td>
                </tr>
                <tr>
                  <th>Kode Pos</th>
                  <td>{user.postalCode}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
