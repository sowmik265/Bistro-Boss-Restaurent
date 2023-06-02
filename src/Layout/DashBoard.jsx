import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome } from 'react-icons/fa';
import useCart from '../Hooks/useCart';

const DashBoard = () => {
    const [ cart] = useCart();
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
                <ul className="menu p-4 w-80 h-full bg-[#D1A054] text-base-content">
                    {/* Sidebar content here */}
                    <li><NavLink to='/userhome'><FaHome></FaHome>USER HOME</NavLink></li>
                    <li><NavLink to='/reservations'><FaCalendarAlt></FaCalendarAlt>RESERVATIONS</NavLink></li>
                    <li><NavLink to='/payment'><FaWallet></FaWallet>PAYMENT HISTORY</NavLink></li>
                    <li><NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart>MY CART<div className="badge badge-secondary">{cart?.length || 0}</div></NavLink></li>
                    <div className="divider"></div>
                    <li><NavLink to='/'><FaHome></FaHome>HOME</NavLink></li>
                    <li><NavLink to='/menu'>Menu</NavLink></li>
                    <li><NavLink to='/order/salad'>Order Food</NavLink></li>
                    <li>Sidebar Item 2</li>
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;