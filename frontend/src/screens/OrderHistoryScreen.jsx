import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import { Link } from 'react-router-dom';

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  function userIdFormatter(cell, row) {
    return(
      <span>{cell.substring(0, 8)} . . .</span>
    )
  }

  function dateFormatter(cell, row) {
    if(cell){
      return(
        <span>{cell.substring(0, 10)}</span>
      )
    } else {
      return(
        <span>--</span>
      )
    }
  }

  const columns = [{
    dataField: '_id',
    text: 'ID',
    sort: true,
    formatter: userIdFormatter,
  }, {
    dataField: 'createdAt',
    text: 'Tanggal',
    sort: true,
    formatter: dateFormatter,
  }, {
    dataField: 'totalPrice',
    text: 'Total',
    sort: true,
    // formatter: priceFormatter,
  }, {
    dataField: 'paidAt',
    text: 'Terbayar',
    sort: true,
    formatter: dateFormatter,
  }, {
    dataField: 'deliveredAt',
    text: 'Dikirim',
    sort: true,
    formatter: dateFormatter,
  },
  {
    dataField: "link",
    text: "Aksi",
    formatter: (rowContent, row) => {
      return(
        <>
        <a href={"/order/" + row._id}>
          <Button color="primary" className="mr-2">
            <i className="fa text-white fa-eye"></i>
          </Button>
        </a>
        </>
      )
    }
  }
];

  return (
    <div>
      <h3>Riwayat pesanan</h3>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        <ToolkitProvider
        keyField="_id"
        data={ orders }
        columns={ columns }
        search
      >
        {
          props => (
            <div>
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              
              {loading && (
                <div className="text-center">
                  <LoadingBox></LoadingBox>
                </div>
              )}
              {orders && (
                <>
                <p>Jumlah Pesanan : {orders.length}</p>
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
        </>
        // <table className="table">
        //   <thead>
        //     <tr>
        //       <th>ID</th>
        //       <th>Tanggal</th>
        //       <th>Total</th>
        //       <th>Terbayar</th>
        //       <th>Dikirim</th>
        //       <th>Aksi</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {orders.map((order) => (
        //       <tr key={order._id}>
        //         <td>{order._id}</td>
        //         <td>{order.createdAt.substring(0, 10)}</td>
        //         <td>{order.totalPrice.toFixed(2)}</td>
        //         {/* <td>{order.isPaid ? 'Yes' : 'No'}</td> */}
        //         <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Belum'}</td>
        //         <td>
        //           {order.isDelivered
        //             ? order.deliveredAt.substring(0, 10)
        //             : 'No'}
        //         </td>
        //         <td>
        //           <a href={"/order/"+order._id}>
        //             {/* <button
        //               type="button"
        //               className="small"
        //             >
        //               Details
        //             </button> */}
        //             <Button color="primary" className="mr-2">
        //               <i className="fa text-white fa-eye"></i>
        //             </Button>
        //           </a>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
      )}
    </div>
  );
}
