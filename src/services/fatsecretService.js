const axios = require("axios");

let token = null;
let tokenExpiresAt = null;

const getAccessToken = async () => {
  if (token && tokenExpiresAt && tokenExpiresAt > Date.now()) {
    return token;
  }

  const credentials = Buffer.from(
    `${process.env.FATSECRET_CLIENT_ID}:${process.env.FATSECRET_CLIENT_SECRET}`
  ).toString("base64");

  const response = await axios.post(
    "https://oauth.fatsecret.com/connect/token",
    "grant_type=client_credentials&scope=basic",
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  token = response.data.access_token;
  tokenExpiresAt = Date.now() + response.data.expires_in * 1000;

  return token;
};

const searchFoods = async (query) => {
  const accessToken = await getAccessToken();

  const response = await axios.get(
    "https://platform.fatsecret.com/rest/server.api",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        method: "foods.search",
        format: "json",
        search_expression: query,
      },
    }
  );

  return response.data;
};

module.exports = { searchFoods };
