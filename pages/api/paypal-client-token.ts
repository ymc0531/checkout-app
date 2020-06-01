import withRest from "@moxy/next-rest-api";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from 'isomorphic-unfetch';

const token = async (req: NextApiRequest, res: NextApiResponse) => {
  const customerId = '9DKYPHJ384QJU';
  const accessToken = req.body.access_token;
  
  const token =  Buffer.from(
    accessToken
  ).toString("base64");

  const resp =  await fetch("https://api.sandbox.paypal.com/v1/identity/generate-token", {
    body: JSON.stringify({ customer_id: "any_random_customer_id" }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": "en_US",
    },
    method: "POST",
  });
  
  const data = await resp.json();
  return data
};

export default withRest({
  POST: token
});
