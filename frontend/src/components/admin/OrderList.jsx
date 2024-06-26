/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { adminOrders as adminOrdersAction, deleteOrders  } from '../../actions/orderAction';
import { clearOrderDeleted, clearOrderError  } from '../../slices/orderSlice';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Loader from '../layouts/loader';
import {MDBDataTable} from 'mdbreact'

const OrderList = () => {

    const {adminOrders=[], loading =true, error, isOrderDeleted}=useSelector(state=>state.orderState);
    const dispatch=useDispatch();

    const setOrders=()=>{
        const data={
            columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Number of Items',
                    field:'noOfItems',
                    sort:'asc'
                },
                {
                    label:'Amount',
                    field:'amount',
                    sort:'asc'
                },
                {
                    label:'Status',
                    field:'status',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                },
            ],
            rows:[]
        }

        adminOrders.forEach(order=>{
            data.rows.push({
                id:order._id,
                noOfItems:order.orderItems.length,
                amount:`$${order.totalPrice}`,
                status:<p style={{color:order.orderStatus ==="Processing"?'red':'green'}}>{order.orderStatus}</p>,
                actions:(
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className='btn btn-primary'><i className='fa fa-pencil'></i></Link>
                        <button onClick={e=>deleteHandler(e,order._id)} className='btn btn-danger py-1 px-2 ml-2'>
                            <i className='fa fa-trash'></i>
                        </button>
                    </Fragment>
                )
            })
        })
        return data ;
    }

    const deleteHandler=(e,id)=>{
        e.target.disabled=true;
        dispatch(deleteOrders(id))
    }

    useEffect(()=>{
        if(error){
          toast(error, {
            type:'error',
            onOpen:()=>{
              dispatch(clearOrderError())
            }
          })
          return
        }

        if(isOrderDeleted){
            toast("Product Deleted Successfully",{
              type:'success',
              onOpen:()=> dispatch(clearOrderDeleted())
            })
            return
          }

        dispatch(adminOrdersAction)

    },[dispatch, error, isOrderDeleted])
  return (
    <div className="row">
    <div className="col-12 col-md-2">
      <Sidebar />
    </div>
    <div className="col-12 col-md-10">
      <h1 className="my-4">Order List</h1>
        <Fragment>
            {loading ? <Loader/>:
            <MDBDataTable
            data={setOrders()}
            bordered
            striped
            hover
            className='px-3'
            />}
        </Fragment>
    </div>
  </div>
  )
}

export default OrderList
