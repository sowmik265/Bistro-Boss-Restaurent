import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useCart from '../../../Hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyCart = () => {
    const [cart ,refetch] = useCart();
    console.log(cart)
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div className='w-full'>
            <Helmet>
                <title>Bistro Boss | MY CART</title>
            </Helmet>
            {/* <div className='mt-10'>
            <SectionTitle subHeading={'My Cart'} heading={'wanna add more ?'}></SectionTitle>
            </div> */}

            <div className='uppercase font-semibold felx justify-evenly items-center'>
                <h3 className='text-3xl'>Total Items : {cart.length}</h3>
                <h3 className='text-3xl'>Total Price : {total}$</h3>
                <button className="btn btn-warning btn-sm">PAY</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>PRICE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => <tr key={item._id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>

                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>

                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>$ {item.price}</td>
                            <td>
                                <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-lg bg-rose-700"><FaTrashAlt></FaTrashAlt></button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
            pongaaa maraa khaaaaa
        </div>
    );
};

export default MyCart;