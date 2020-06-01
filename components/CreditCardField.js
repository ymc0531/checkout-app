import React, { useState, useEffect, useRef } from "react";
import fetch from 'isomorphic-unfetch';
import Script from 'react-load-script';

const CreditCardField = ({onLoad}) => {
  const clientId = `Ae5eEO7TFAgs06hDUUgx7qd7D2wcy7BBkwxp5QaFASLX-PWR2WPWucu80kyyTD-Egg8ZrwD-Z9XgwaRJ`;
  const url = `https://www.paypal.com/sdk/js?components=hosted-fields&client-id=${clientId}`;

  const [accessToken, setAccessToken] = useState(null);
  const [clientToken, setClientToken] = useState(null);

  const handleScriptCreate = (e) => {
    //console.log(e)
  }

  const handleScriptError = (e) => {
    console.log(e)
  }

  const handleScriptLoad = (e) => {
    onLoad(paypal.HostedFields.isEligible())
    if(paypal.HostedFields.isEligible()) {
      paypal.HostedFields.render({
        createOrder: function () {return orderID;}, // replace orderID with your order ID
        styles: {
          'input': {
            'font-size': '14px',
            'font-family': 'helvetica, tahoma, calibri, sans-serif',
            'color': '#495057',
            'height': '2.8rem',
            'padding': '1.25rem .75rem .25rem .75rem',
            'border': '1px solid #ced4da',
            'border-radius': '.25rem',
            'line-height': '1.5',
            'background': 'white'
          },
          ':focus': {
            
          },
          'input::-webkit-input-placeholder': {
            'color': '#495057'
          },
          'input::-ms-input-placeholder': {
            'color': '#495057'
          },
          'input::-moz-input-placeholder': {
            'color': '#495057'
          },
          'label': {
            'display': 'none'
          }
        },
        fields: {
          number: {
            selector: '#card-number',
            placeholder: 'card number',
          }, 
          cvv: {
            selector: '#cvv',
            placeholder: 'card security number'
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: 'mm/yy'
          }
        }
      }).then(function (hf) {
        console.log(hf);
      });
    }
  }

  const testF = () => {
    let a = document.getElementById('braintree-hosted-field-number');
    var element = a.contentWindow.document.querySelector('form input[type="tel"]');
    console.log(element);
  }

  //get access token from paypal api
  useEffect(()=>{
    async function getAccessToken() {
      const res = await fetch('/api/paypal-access-token');
      const data = await res.json();
      setAccessToken(data.access_token);
    }
    getAccessToken();
  }, [])

  //get client token from paypal api
  useEffect(()=>{
    const param = {access_token: accessToken};
    const settings = {
      method: 'POST',
      body: JSON.stringify(param),
      headers: {'Content-Type': 'application/json'},
    };
    async function getClientToken() {
      const res = await fetch('/api/paypal-client-token', settings);
      const data = await res.json();
      setClientToken(data.client_token);
    }
    if(accessToken&&accessToken!='')
      getClientToken();
  }, [accessToken])

  return (
    <div>
      {accessToken&&clientToken ? (
        <Script
          url={url}
          onCreate={(e)=>handleScriptCreate(e)}
          onError={(e)=>handleScriptError(e)}
          onLoad={(e)=>handleScriptLoad(e)}
          attributes={{'data-client-token': clientToken}}
        />
      ) : (null)}
      <div id='test' className="cc-row">
        <label className='cc-label' htmlFor='card-number'>Card Number</label>
        <div id='card-number' className='card_field'></div>
      </div>
      <div id='test' className="cc-row">
        <label className='cc-label' htmlFor='card-holder-name'>Name On Card</label>
        <input className='cc-input' id='card-holder-name' placeholder='card holder name' />
      </div>
      <div className='cc-row-2'>
        <div className="cc-col-1">
          <label className='cc-label' htmlFor='expiration-date'>Expiration Date</label>
          <div id='expiration-date' className='card_field'></div>
        </div>
        <div className="cc-col-2">
          <label className='cc-label' htmlFor='cvv'>CVV</label>
          <div id='cvv' className='card_field'></div>
        </div>
      </div>
    </div>
  )
}

export default CreditCardField;

//export default CreditCardField