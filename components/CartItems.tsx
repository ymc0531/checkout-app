import { Minion, MoneyBackGuarantee, DeliveryTruck } from '../assets/images';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const CartItems = () => {
  const cartItems = useSelector((state: RootState) => state.cartItems);
  const items = cartItems.items.items;

  const renderCartItems = () => {
    return items.map((props, index) => {
      return (
        <div className="sidebar-section-item-row" key={props.id}>
          <div className="item-stat">
            <div className="item-image">
              <span className="item-amount">{props.quantity}</span>
              <div className="item-image-border">
                <img src={props.image} style={{height: '62px', width: '62px'}} />
              </div>
            </div>
            <div className="item-detail">
              <div className="item-name">{props.title}</div>
              <div className="item-description">{props.product_description}</div>
            </div>
          </div>
          <div className="item-price">${props.final_price}</div>
        </div>
      );
    })
  }

  return (
    <div className="sidebar-section-item">
      {items?(renderCartItems()):(null)}
    </div>
  ) 
}

export default CartItems