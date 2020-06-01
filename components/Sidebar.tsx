import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartItems from './CartItems';

import { updateDiscountCode } from '../redux/slice/paymentMethodSlice';
import { updateCartItems } from '../redux/slice/cartItemsSlice';

import { MoneyBackGuarantee, DeliveryTruck } from '../assets/images';

const Sidebar = () => {
  const dispatch = useDispatch();
  const paymentMethod = useSelector((state: RootState) => state.paymentMethod);
  const shippingMethod = useSelector((state: RootState) => state.shippingMethod);
  const cartItems = useSelector((state: RootState) => state.cartItems);
  const shippingFee = shippingMethod.shippingFee[shippingMethod.shippingType];
	
  //get cart items
  useEffect(()=>{
    async function getCartItems() {
      const res = await fetch('/api/cart-items');
      const data = await res.json();
      dispatch(updateCartItems(data))
    }
    getCartItems();
  }, [])

	return (
		<div className='sidebar'>
			<div className='sidebar-content'>
				<CartItems />
				<div className="sidebar-section">
					<div className="sidebar-section-row">
						<div className="discount-code">
              <div className="form-label-group">
                <input type="text" id="inputDiscountCode" placeholder="Discount Code" 
                  className={`form-control normal-input`} 
                  onChange={(e)=>dispatch(updateDiscountCode(e.target.value))}
                />
                <label htmlFor="inputDiscountCode">Discount Code</label>
              </div>
						</div>
						<div className="discount-button-box">
							<button className="discount-button">Apply</button>
						</div>
					</div>
				</div>
				<div className="sidebar-section-2">
					<div className="sidebar-section-row-2">
						<span>Subtotal</span>
						<span>${cartItems?(cartItems.items.items_subtotal_price):(0)}.00</span>
					</div>
					<div className="sidebar-section-row-2">
						<span>Shipping</span>
						<span>${shippingFee}.00</span>
					</div>
				</div>
				<div className="sidebar-section-3">
					<div className="sidebar-section-row-2">
						<span className="total-title">Total</span>
						<div className="total-right">
							<span className="currency">USD</span>
							<span className="total-price">${cartItems.items.items?(cartItems.items.items_subtotal_price+shippingFee):(0)}.00</span>
						</div>
					</div>
				</div>
				<div className="sidebar-section-4">
					<div className="whyus-label">
						<span>Why choose us?</span>
					</div>
					<div className="whyus-row">
						<div className="whyus-badge">
							<MoneyBackGuarantee Width="64px" />
						</div>
						<div className="badge-description">
							<div className="badge-description-header">
								30-day Satisfaction Guarantee with Money Back
							</div>
							<div className="badge-description-body">
								If you're not satisfied with the products, we will issue a full refund without questions.
							</div>
						</div>
					</div>
					<div className="whyus-row">
						<div className="whyus-badge">
							<DeliveryTruck Width="64px" />
						</div>
						<div className="badge-description">
							<div className="badge-description-header">
								Over 20,000+ Successfully Shipped Orders
							</div>
							<div className="badge-description-body">
								We made as much happy customers as many orders we shipped. You simply have to join our big family.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sidebar