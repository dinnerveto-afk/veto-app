const https = require("https");
 
exports.handler = async function (event) {
  const { lat, lng, cuisines } = event.queryStringParameters || {};
 
  const GOOGLE_API_KEY = "AIzaSyBgG_-lz40ijWGWUQ92uiyORPKWBlgZq0o";
 
  const query = encodeURIComponent(cuisines || "restaurant");
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=restaurant&keyword=${query}&key=${GOOGLE_API_KEY}`;
 
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        resolve({
          statusCode: 200,
          headers: { "Access-Control-Allow-Origin": "*" },
          body: data,
        });
      });
    }).on("error", (err) => {
      resolve({
        statusCode: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: err.message }),
      });
    });
  });
};
 
