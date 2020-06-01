import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import dotProp from 'dot-prop-immutable';
import { RootState } from "../redux/store";
import { updateShippingInfo } from '../redux/slice/shippingInfoSlice';
import { updateBillingInfo } from '../redux/slice/billingInfoSlice';
import { updateShippingMethod } from '../redux/slice/shippingMethodSlice';
import { updatePaymentMethod } from '../redux/slice/paymentMethodSlice';
import Sidebar from './Sidebar';
import Timer from './Timer';
import CreditCardField from './CreditCardField'

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Button } from '@material-ui/core';
import { PaypalLogo, MoneyBackGuarantee, DeliveryTruck, MasterCard, Visa } from '../assets/images';
import Countdown from 'react-countdown';
import {Collapse} from "@material-ui/core";
import {FiShoppingCart} from 'react-icons/fi';
import {IoIosArrowDown} from 'react-icons/io';
import BarLoader from "react-spinners/BarLoader";

const Main = () => {
	const [value, setValue] = useState();
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [siList, setSiList] = useState(Object.assign({}));
  const [siCheckList, setSiCheckList] = useState(Object.assign({}));
  const [biList, setBiList] = useState(Object.assign({}));
  const [biCheckList, setBiCheckList] = useState(Object.assign({}));
  const [shippingForm, setShippingForm] = useState(Object.assign({}));
  const [allDone, setAllDone] = useState(false);
  const [ccField, setCcfield] = useState(null);

  const dispatch = useDispatch();

  const shippingInfo = useSelector((state: RootState) => state.shippingInfo);
  const billingInfo = useSelector((state: RootState) => state.billingInfo);
  const paymentMethod = useSelector((state: RootState) => state.paymentMethod);

  const checkLineRef = useRef(null);

  const validationList = {
    shippingInfo: ['email', 'firstName', 'lastName', 'phoneNumber', 'address', 'city', 'country', 'region', 'postalCode'],
    billingInfo: ['firstName', 'lastName', 'address', 'city', 'country', 'region', 'postalCode'],
  };

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

	const openSidebar = () => {
		setIsOpenSidebar(!isOpenSidebar);
	}

  const submitOrder = () => {
    let siBool = dataValidation();
    let biBool = true;
    if(!biList.isSame)
      biBool = dataValidation2();
    if(siBool&&biBool)
      alert('all field is correct')
    else
      scrollToRef(checkLineRef);
  }

  //shipping info
  const dataValidation = () => {
    let bool = true;
    const siValList = validationList.shippingInfo;
    let tmpSiCheckList = Object.assign({}, siCheckList);
    for(let i in siValList) {
      if(!siList[siValList[i]] || siList[siValList[i]]==='') {
        tmpSiCheckList[siValList[i]] = false;
        bool = false;
      }else
        tmpSiCheckList[siValList[i]] = true;
    }
    setSiCheckList(tmpSiCheckList);
    return bool
  }

  //billing info
  const dataValidation2 = () => {
    let bool = true;
    const biValList = validationList.billingInfo;
    let tmpBiCheckList = Object.assign({}, biCheckList);
    for(let i in biValList) {
      if(!biList[biValList[i]] || biList[biValList[i]]==='') {
        tmpBiCheckList[biValList[i]] = false;
        bool = false;
      }else
        tmpBiCheckList[biValList[i]] = true;
    }
    setBiCheckList(tmpBiCheckList);
    return bool
  }

  //shipping info input
  const inputHandleChange = (infoType :string, val :any) => {
    let list = dotProp.set(siList, infoType, val);
    if(infoType=='country') {
      list = dotProp.set(list, 'region', '');
    }
    if(siCheckList[infoType]===false) {
      const checkList = dotProp.set(siCheckList, infoType, true);
      setSiCheckList(checkList);
    }
    setSiList(list);
  }

  //billing info input
  const inputHandleChange2 = (infoType :string, val :any) => {
    let list = dotProp.set(biList, infoType, val);
    if(infoType=='country') {
      list = dotProp.set(list, 'region', '');
    }
    if(biCheckList[infoType]===false) {
      const checkList = dotProp.set(biCheckList, infoType, true);
      setBiCheckList(checkList);
    }
    setBiList(list);
  }

  //initiate all list from redux store
  useEffect(() => {
    setSiList(Object.assign({}, shippingInfo));
    setBiList(Object.assign({}, billingInfo));
  }, [])

  //initiate data validation checking list
  useEffect(() => {
    const siValList = validationList.shippingInfo;
    let tmpSiCheckList = Object.assign({}, siCheckList);
    for(let i in siValList) {
      tmpSiCheckList[siValList[i]] = true;
    }
    setSiCheckList(tmpSiCheckList);

    const biValList = validationList.billingInfo;
    let tmpBiCheckList = Object.assign({}, biCheckList);
    for(let i in biValList) {
      tmpBiCheckList[biValList[i]] = true;
    }
    setBiCheckList(tmpBiCheckList);
  }, [])

	return (
		<div className='main'>
			<div className='main-header'>Demo Store</div>
			<div className="sidebar-responsive">
				<div className="sidebar-toggler" onClick={openSidebar}>
					<div className="sidebar-toggler-row">
						<div className="sidebar-toggler-button">
							<FiShoppingCart size={18}/>&nbsp;&nbsp;
							{isOpenSidebar?('Hide order summary'):('Show order summary')}
							&nbsp;
							<div className={`arrow-container ${isOpenSidebar?('arrow-container-rotate'):('')}`}>
								<IoIosArrowDown size={16}/>
							</div>
						</div>
						<span className="sidebar-toggler-total">$88.00</span>
					</div>
				</div>
				<div className={`collapse-box ${isOpenSidebar?'collapse-box-opened':''}`}>
					<Collapse in={isOpenSidebar} timeout="auto" unmountOnExit={true}>
	          <Sidebar />
	        </Collapse>
        </div>
			</div>
			<div className='main-content'>
				<div className="reserved-box">
					<div className="reserved-title">🔥 An item you ordered is in high demand. No worries, we have reserved your order.</div>
					<div className="reserved-time">
						Your order is reserved for <Timer minutes={10} />
					</div>
				</div>
				<div className="paypal-section">
					<div className="paypal-logo-box">
						<PaypalLogo Height="22px" />
					</div>
				</div>
				<div ref={checkLineRef} className="seperate-line">
					<span className="line-label">OR</span>
				</div>
				<div id="contactInformation" className='section'>
					<div className='section-header'>
						Contact information
					</div>
          <div className="form-label-group">
            <input type="text" id="inputEmail" placeholder="Email address" 
              className={`form-control normal-input ${siCheckList.email===false?'error-input':''}`} 
              onChange={(e)=>inputHandleChange('email',e.target.value)}
            />
            <label htmlFor="inputEmail" className={`${siCheckList.email===false?'error-font':''}`}>
              {siCheckList.email===false?('Invalid email'):('Email address')}
            </label>
          </div>
			    <div className='checkbox-row'>
			    	<div className="custom-control custom-checkbox">
					    <input type="checkbox" className="custom-control-input" id="subscribe" defaultChecked onChange={()=>{
                 inputHandleChange('isSubscribe', !siList['isSubscribe'])
              }}/>
					    <label className="custom-control-label" htmlFor="subscribe">
					    	Keep me up to date on news and exclusive offers
					    </label>
						</div>
			    </div>
			  </div>

			  <div id="shppingAddress" className='section-2'>
					<div className='section-header'>
						Shipping address
					</div>
					<div className='section-row'>
						<div className='column-501'>
              <div className="form-label-group">
                <input type="text" id="inputFirstName" placeholder="Email address" 
                  className={`form-control normal-input ${siCheckList.firstName===false?'error-input':''}`} 
                  onChange={(e)=>inputHandleChange('firstName',e.target.value)}
                />
                <label htmlFor="inputFirstName" className={`${siCheckList.firstName===false?'error-font':''}`}>
                  {siCheckList.firstName===false?('First name required'):('First name')}
                </label>
              </div>
						</div>
						<div className='column-502'>
							<div className="form-label-group">
                <input type="text" id="inputLastName" placeholder="Last Name" 
                  className={`form-control normal-input ${siCheckList.lastName===false?'error-input':''}`} 
                  onChange={(e)=>inputHandleChange('lastName',e.target.value)}
                />
                <label htmlFor="inputLastName" className={`${siCheckList.lastName===false?'error-font':''}`}>
                  {siCheckList.lastName===false?('Last name required'):('Last name')}
                </label>
              </div>
						</div>
					</div>
					<div className='section-row'>
						<div className='column-100'>
							<div className="form-label-group">
                <input type="text" id="inputPhoneNumber" placeholder="Phone Number" 
                  className={`form-control normal-input ${siCheckList.phoneNumber===false?'error-input':''}`} 
                  onChange={(e)=>inputHandleChange('phoneNumber',e.target.value)}
                />
                <label htmlFor="inputPhoneNumber" className={`${siCheckList.phoneNumber===false?'error-font':''}`}>
                  {siCheckList.phoneNumber===false?('Phone number required'):('Phone number')}
                </label>
              </div>
						</div>
					</div>
					<div className='section-row'>
						<div className='column-100'>
							<div className="form-label-group">
                <input type="text" id="inputAddress" placeholder="Address" 
                  className={`form-control normal-input ${siCheckList.address===false?'error-input':''}`} 
                  onChange={(e)=>inputHandleChange('address',e.target.value)}
                />
                <label htmlFor="inputAddress" className={`${siCheckList.address===false?'error-font':''}`}>
                  {siCheckList.address===false?('Address required'):('Address')}
                </label>
              </div>
						</div>
					</div>
					<div className='section-row'>
						<div className='column-100'>
              <div className="form-label-group">
                <input type="text" id="inputAddress2" placeholder="Apartment, suite, etc. (optional)" 
                  className={`form-control normal-input ${siCheckList.address_2===false?'error-input':''}`} 
                  onChange={(e)=>inputHandleChange('address_2',e.target.value)}
                />
                <label htmlFor="inputAddress2">Apartment, suite, etc. (optional)</label>
              </div>
						</div>
					</div>
					<div className='section-row'>
						<div className='column-100'>
							<div className="form-label-group">
                <input type="text" id="inputCity" placeholder="City" 
                  className={`form-control normal-input ${siCheckList.city===false?'error-input':''}`} 
                  onChange={(e)=>inputHandleChange('city',e.target.value)}
                />
                <label htmlFor="inputCity" className={`${siCheckList.city===false?'error-font':''}`}>
                  {siCheckList.city===false?('City required'):('City')}
                </label>
              </div>
						</div>
					</div>
					<div className='section-row'>
						<div className='column-331'>
							<div className="field-group">
						    <label className='field-label field-active'>
						      Country
						    </label>
				        <CountryDropdown
				          value={siList.country}
				          onChange={value => inputHandleChange('country', value)}
				          classes={`main-select ${siCheckList.country===false?'error-input':''}`}
				        />
			        </div>
		        </div>
		        <div className='column-332'>
		        	<div className="field-group">
                <label className={`field-label field-active ${siCheckList.region===false?'error-font':''}`}>
                  {siCheckList.region===false?('Region required'):('Region')}
                </label>
				        <RegionDropdown
				          country={siList.country}
				          value={siList.region}
				          onChange={value => inputHandleChange('region', value)}
				          disableWhenEmpty={true} 
				          classes={`main-select ${siCheckList.region===false?'error-input':''}`}
				        />
				      </div>
		        </div>
		        <div className='column-333'>
		        	<div className="form-label-group">
                <input type="text" id="inputPostalCode" placeholder="Postal Code" 
                  className={`form-control normal-input ${siCheckList.postalCode===false?'error-input':''}`} 
                  onChange={(e)=>inputHandleChange('postalCode',e.target.value)}
                />
                <label htmlFor="inputPostalCode" className={`${siCheckList.postalCode===false?'error-font':''}`}>
                  {siCheckList.postalCode===false?('Postal code required'):('Postal code')}
                </label>
              </div>
		        </div>
		      </div>
				</div>

				<div id="billingAddress" className='section-2'>
					<div className='section-header'>
						Billing address
					</div>
					<div className="section-row-2">
						<div className="billadrs-row">
							<div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" id="billingSame" name="billingAddress" defaultChecked onClick={() => {
                  inputHandleChange2('isSame', true)
                }}/>
                <label className="custom-control-label" htmlFor="billingSame">Same as shipping address</label>
              </div>
						</div>
						<div className={`billadrs-row-2 ${biList.isSame===false?'billadrs-row-2-active':''}`}>
							<div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" id="billingDiff" name="billingAddress" onClick={() => {
                  inputHandleChange2('isSame', false)
                }}/>
                <label className="custom-control-label" htmlFor="billingDiff">Use a different billing address</label>
              </div>
						</div>
						{biList.isSame===false ? (
					  	<div className="toggle-content">
								<div className='section-row'>
									<div className='column-501'>
                    <div className="form-label-group">
                      <input type="text" id="input2FirstName" placeholder="First Name" 
                        className={`form-control normal-input ${biCheckList.firstName===false?'error-input':''}`} 
                        onChange={(e)=>inputHandleChange2('firstName',e.target.value)}
                      />
                      <label htmlFor="input2FirstName" className={`${biCheckList.firstName===false?'error-font':''}`}>
                        {biCheckList.firstName===false?('First name required'):('First name')}
                      </label>
                    </div>
									</div>
									<div className='column-502'>
										<div className="form-label-group">
                      <input type="text" id="input2LastName" placeholder="Last Name" 
                        className={`form-control normal-input ${biCheckList.lastName===false?'error-input':''}`} 
                        onChange={(e)=>inputHandleChange2('lastName',e.target.value)}
                      />
                      <label htmlFor="input2LastName" className={`${biCheckList.lastName===false?'error-font':''}`}>
                        {biCheckList.lastName===false?('Last name required'):('Last name')}
                      </label>
                    </div>
									</div>
								</div>
								<div className='section-row'>
									<div className='column-100'>
										<div className="form-label-group">
                      <input type="text" id="input2Address" placeholder="Address" 
                        className={`form-control normal-input ${biCheckList.address===false?'error-input':''}`} 
                        onChange={(e)=>inputHandleChange2('address',e.target.value)}
                      />
                      <label htmlFor="input2Address" className={`${biCheckList.address===false?'error-font':''}`}>
                        {biCheckList.address===false?('Address required'):('Address')}
                      </label>
                    </div>
									</div>
								</div>
								<div className='section-row'>
									<div className='column-100'>
                    <div className="form-label-group">
                      <input type="text" id="input2Address2" placeholder="Apartment, suite, etc. (optional)" 
                        className={`form-control normal-input ${biCheckList.address_2===false?'error-input':''}`} 
                        onChange={(e)=>inputHandleChange2('address_2',e.target.value)}
                      />
                      <label htmlFor="input2Address2">Apartment, suite, etc. (optional)</label>
                    </div>
									</div>
								</div>
								<div className='section-row'>
									<div className='column-100'>
										<div className="form-label-group">
                      <input type="text" id="input2City" placeholder="City" 
                        className={`form-control normal-input ${biCheckList.city===false?'error-input':''}`} 
                        onChange={(e)=>inputHandleChange2('city',e.target.value)}
                      />
                      <label htmlFor="input2City" className={`${biCheckList.city===false?'error-font':''}`}>
                        {biCheckList.city===false?('City required'):('City')}
                      </label>
                    </div>
									</div>
								</div>
								<div className='section-row'>
									<div className='column-331'>
										<div className="field-group">
									    <label className='field-label field-active'>
									      Country
									    </label>
							        <CountryDropdown
							          value={biList.country}
							          onChange={value => inputHandleChange2('country', value)}
							          classes={`main-select ${biCheckList.country===false?'error-input':''}`}
							        />
						        </div>
					        </div>
					        <div className='column-332'>
					        	<div className="field-group">
                      <label className={`field-label field-active ${biCheckList.region===false?'error-font':''}`}>
                        {biCheckList.region===false?('Region required'):('Region')}
                      </label>
							        <RegionDropdown
							          country={biList.country}
							          value={biList.region}
							          onChange={value => inputHandleChange2('region', value)}
							          disableWhenEmpty={true} 
							          classes={`main-select ${biCheckList.region===false?'error-input':''}`}
							        />
							      </div>
					        </div>
					        <div className='column-333'>
					        	<div className="form-label-group">
                      <input type="text" id="input2PostalCode" placeholder="Postal Code" 
                        className={`form-control normal-input ${biCheckList.postalCode===false?'error-input':''}`} 
                        onChange={(e)=>inputHandleChange2('postalCode',e.target.value)}
                      />
                      <label htmlFor="input2PostalCode" className={`${biCheckList.postalCode===false?'error-font':''}`}>
                        {biCheckList.postalCode===false?('Postal code required'):('Postal code')}
                      </label>
                    </div>
					        </div>
					      </div>
							</div>
					  ) : (null)}
					</div>
				</div>

				<div id="shippingMethod" className='section-2'>
					<div className='section-header'>
						Shipping Method
					</div>
					<div className="section-row-2">
						<div className="billadrs-row">
							<div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" id="shippingStandard" name="shippingMethod" defaultChecked onClick={() => {
                  dispatch(updateShippingMethod('standard'))
                }}/>
                <label className="custom-control-label" htmlFor="shippingStandard">Standard</label>
              </div>
						  <span className="ship-amount">$10.00</span>
						</div>
						<div className="billadrs-row-2">
							<div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" id="shippingExpress" name="shippingMethod" onClick={() => {
                  dispatch(updateShippingMethod('express'))
                }}/>
                <label className="custom-control-label" htmlFor="shippingExpress">Express</label>
              </div>
						  <span className="ship-amount">$18.00</span>
						</div>
					</div>
				</div>

				<div id="paymentMethod" className='section-2'>
					<div className='section-header'>
						Payment Method
					</div>
					<div className="section-row-2">
						<div className="billadrs-row row-spacebetween">
              <div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" id="paymentCreditCard" name="paymentMethod" defaultChecked onClick={() => {
                  dispatch(updatePaymentMethod('creditCard'))
                }}/>
                <label className="custom-control-label" htmlFor="paymentCreditCard">Credit Card</label>
              </div>
              <div>
                <MasterCard Height={'30px'} />
                <Visa Height={'30px'} />
              </div>
            </div>
            <div className={`toggle-content-2 ${paymentMethod.paymentType==='creditCard'?(''):('no-display')}`}>
              <CreditCardField onLoad={(e)=>setCcfield(e)}/>
              {ccField===null ? (
                <div className='cc-field-loader'>
                  <BarLoader
                    height={5}
                    width={200}
                    color={'#0099cc'}
                    loading={true}
                  />
                </div>
              ) : (ccField===true ? (
                null
              ) : (
                <div className='cc-field-loader'>
                  <span>Credit card field is not available.</span>
                </div>
              ))}
            </div>
						<div className={`billadrs-row-2 ${paymentMethod.paymentType==='paypal'?'billadrs-row-2-active':''}`}>
							<div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" id="paymentPaypal" name="paymentMethod" onClick={() => {
                  dispatch(updatePaymentMethod('paypal'))
                }}/>
                <label className="custom-control-label" htmlFor="paymentPaypal">
                  <PaypalLogo Height="22px" />
                </label>
              </div>
						</div>
						{paymentMethod.paymentType==='paypal' ? (
					  	<div className="toggle-content">
					  		<div className="paypal-offsite-icon">
					  			<div className="icon--offsite"></div>
					  		</div>
								<span className="paypal-checkout-message">
									After clicking “Complete Purchase”, you will be redirected to PayPal to complete your purchase securely.
								</span>
							</div>
					  ) : (null)}
					</div>
				</div>

				<div className="section-3">
					<span>{'< Return to cart'}</span>
					<button className="order-button" onClick={submitOrder}>
						Complete order
					</button>
				</div>
				<div className="section-4">
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

export default Main