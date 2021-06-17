import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Button } from 'reactstrap';

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <h3>Riwayat pesanan</h3>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tanggal</th>
              <th>Total</th>
              <th>Terbayar</th>
              <th>Dikirim</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                {/* <td>{order.isPaid ? 'Yes' : 'No'}</td> */}
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Belum'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <a href={"/order/"+order._id}>
                    {/* <button
                      type="button"
                      className="small"
                    >
                      Details
                    </button> */}
                    <Button color="primary" className="mr-2">
                      <i className="fa text-white fa-eye"></i>
                    </Button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
