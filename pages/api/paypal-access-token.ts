import withRest from "@moxy/next-rest-api";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from 'isomorphic-unfetch';

const token = async (req: NextApiRequest, res: NextApiResponse) => {
  const username = `Ae5eEO7TFAgs06hDUUgx7qd7D2wcy7BBkwxp5QaFASLX-PWR2WPWucu80kyyTD-Egg8ZrwD-Z9XgwaRJ`;
  const password = `EFPe-9P3E-fvrM_asFh4UtM843FonxHKUIJIqC0UUXgkkPRadVkXRiIkZZXydzuT1ILNy54ARIG8lEm3`;

  const token =  Buffer.from(
    `${username}:${password}`
  ).toString("base64");

  const resp =  await fetch("https://api.sandbox.paypal.com/v1/oauth2/token", {
    body: "grant_type=client_credentials",
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  });
  
  const data = await resp.json();
  return data
};

export default withRest({
  GET: token
});
