exports.handler = async function(event) {
  const { lat, lng, cuisines } = event.queryStringParameters;

  const GOOGLE_API_KEY = "AIzaSyBgG_-lz40ijWGWUQ92uiyORPKWBlgZq0o";

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=restaurant&keyword=${encodeURIComponent(cuisines || '')}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
