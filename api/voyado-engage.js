const { parse } = require('querystring');

export default async function(req, res, next) {
  try {
    const queryParams = parse(req.url.split('?')[1]);
    const email = encodeURI(queryParams.email);

    const response = await fetch(
      `https://bubbleroom.voyado.com/api/v2/contacts/id?email=${email}`,
      {
        headers: {
          apikey: process.env.VOYADO_ENGAGE_API_KEY
        }
      }
    );

    const data = await response.json();
    return res.end(data);
  } catch (error) {
    // TODO: Implement error handling for voyado errors
    res.end('');
  }
}
