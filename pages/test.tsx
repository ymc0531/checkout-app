import React, { useState, useEffect, useRef } from "react";
import fetch from 'isomorphic-unfetch';
import Script from 'react-load-script';

/*const Test = () => {
  const clientId = `Ae5eEO7TFAgs06hDUUgx7qd7D2wcy7BBkwxp5QaFASLX-PWR2WPWucu80kyyTD-Egg8ZrwD-Z9XgwaRJ`;
  const url = `https://www.paypal.com/sdk/js?components=hosted-fields&client-id=${clientId}`;

  const [accessToken, setAccessToken] = useState(null);
  const [clientToken, setClientToken] = useState(null);

  const handleScriptCreate = (e) => {
    console.log(e)
  }

  const handleScriptError = (e) => {
    console.log(e)
  }

  const handleScriptLoad = (e) => {
    console.log(paypal);
    if(paypal.HostedFields.isEligible()) {
      paypal.HostedFields.render({
        createOrder: function () {return orderID;}, // replace orderID with your order ID
        styles: {
          'input': {
            'font-size': '14px',
            'font-family': 'helvetica, tahoma, calibri, sans-serif',
            'color': '#495057',
            'height': '2.8rem',
            'padding': '.75rem',
            'border': '1px solid #ced4da',
            'border-radius': '.25rem',
            'line-height': '1.5'
          },
          'input::-webkit-input-placeholder': {

          },
          'input:not(:placeholder-shown)': {
            'padding-top': '1.25rem',
            'padding-bottom': '.25rem'
          },
          'input:not(:placeholder-shown) ~ label': {
            'padding-top': '.25rem',
            'padding-bottom': '.25rem',
            'font-size': '12px',
            'color': '#777'
          },
          ':focus': {
            'color': 'black',
            'border-color': 'red',
            'box-shadow': '0px 0px 0px 0.05rem #4ab5e8'
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
      <form id='my-sample-form'>
        <div className='form-label-group'>
          <div id='card-number' className='card_field'></div>
        </div>
        <div>
          <label htmlFor='expiration-date'>Expiration Date</label><div id='expiration-date' className='card_field'></div>
        </div>
        <div>
          <label htmlFor='cvv'>CVV</label><div id='cvv' className='card_field'></div>
        </div>
        <label htmlFor='card-holder-name'>Name on Card</label><input type='text' id='card-holder-name' name='card-holder-name' placeholder='card holder name'/>
        <button value="submit" id="submit" className="btn">Continue</button>
      </form>
    </div>
  )
}*/

const Test2 = () => {
  const handleScriptCreate = (e) => {
    console.log(e)
  }

  const handleScriptError = (e) => {
    console.log(e)
  }

  const handleScriptLoad = (e) => {
    console.log(TEST_SCRIPT.start())
  }
  return (
    <div>
      <Script
        url='https://pm28k14qlj.codesandbox.io/test-external-script.js'
        onCreate={(e)=>handleScriptCreate(e)}
        onError={(e)=>handleScriptError(e)}
        onLoad={(e)=>handleScriptLoad(e)}
      />
      hello
    </div>
  )
}

export default Test2