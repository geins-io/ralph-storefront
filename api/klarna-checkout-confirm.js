const express = require('express');
const app = express();

app.get('/', (req, res) => {
  global.Headers = global.Headers || fetch.Headers;

  const meta = {
    Authorization: 'Basic UEsyMjkzMl9hZjA5YzE5N2VmN2I6UjIyUkEzeTBpQ1NEYnpMSg==',
    'Content-Type': 'application/json'
  };
  const myHeaders = new Headers(meta);

  const raw = JSON.stringify({
    purchase_country: 'SE',
    purchase_currency: 'SEK',
    locale: 'sv-SE',
    order_amount: 50000,
    order_tax_amount: 4545,
    order_lines: [
      {
        type: 'physical',
        reference: '19-402-USA',
        name: 'Red T-Shirt',
        quantity: 5,
        quantity_unit: 'pcs',
        unit_price: 10000,
        tax_rate: 1000,
        total_amount: 50000,
        total_discount_amount: 0,
        total_tax_amount: 4545
      }
    ],
    merchant_urls: {
      terms: 'https://www.example.com/terms.html',
      checkout: 'http://localhost:3000/checkout',
      confirmation: 'http://localhost:3000/checkout/confirm',
      push: 'https://www.example.com/api/push'
    }
  });

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch('https://api.playground.klarna.com/checkout/v3/orders', requestOptions)
    .then(response => response.json())
    .then(result => {
      res.json(result);
    })
    .catch(error => console.log('error', error));
});

module.exports = {
  path: 'api/klarna-checkout-orders',
  handler: app
};
