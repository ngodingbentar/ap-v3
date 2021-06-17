import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  function dateFormatter(cell, row) {
    return(
      <span>{cell.substring(0, 10)}</span>
    )
  }

  function priceFormatter(cell, row) {
    return(
      <span>{new Intl.NumberFormat('ID').format(cell)}</span>
    )
  }

  function userIdFormatter(cell, row) {
    return(
      <span>{cell.substring(0, 8)} . . .</span>
    )
  }

  

  function confirmImgFormatter(cell, row){
    if(cell){
      return (
        <span>Sudah</span>
      )
    }else {
      return (
        <span>Belum</span>
      )
    }
    
  }


  function statusFormatter(cell, row){
    const timestamp = Date.parse(cell)
    const sekarang = Date.now()
    const jarak = timestamp + 86400000
    if(jarak < sekarang){
      return (
        <span>Sudah</span>
      )
    }else {
      return (
        <span>Belum</span>
      )
    }
    
  }

  function paidFormatter(cell, row) {
    if(cell === false ){
      return(
        <span>Belum</span>
      )
    } else {
      return(
        <span>Sudah</span>
      )
    }
  }

  // table
  const columns = [{
    dataField: '_id',
    text: 'ID',
    formatter: userIdFormatter,
    sort: true,
  }, {
    dataField: 'user.name',
    text: 'Nama',
    sort: true,
  }, {
    dataField: 'createdAt',
    text: 'Tanggal',
    sort: true,
    formatter: dateFormatter,
  }, {
    dataField: 'totalPrice',
    text: 'Total',
    sort: true,
    formatter: priceFormatter,
  }, {
    dataField: 'createdAt',
    text: 'Terlambat',
    sort: true,
    formatter: statusFormatter,
  }, {
    dataField: 'isPaid',
    text: 'Terbayar',
    sort: true,
    formatter: paidFormatter,
  },{
    dataField: 'isDelivered',
    text: 'Dikirim',
    sort: true,
    formatter: paidFormatter,
  },{
    dataField: 'confirmImg',
    text: 'Bukti',
    sort: true,
    formatter: confirmImgFormatter,
  },{
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
  }];

  const { SearchBar } = Search;


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);


  return (
    <div className="mt-4">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ToolkitProvider
          keyField="_id"
          data={ orders }
          columns={ columns }
          search
        >
          {
            props => (
              <div>
                <div className="rowC">
                  <div>
                    <h3>Daftar Pesanan</h3>
                    {/* <button onClick={() => console.log(orders)}>cek confirmImg</button> */}
                  </div>
                  <div>
                    <SearchBar { ...props.searchProps } />
                  </div>
                </div>
                <hr />
                <p>Jumlah Pesanan : {orders.length}</p>
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
