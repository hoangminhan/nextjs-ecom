import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "method not supported" });
  }
  return new Promise((resolve) => {
    req.headers.cookie = "";
    const handleRegisterResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", (chunk) => {
        console.log("first", chunk);
        body += chunk;
      });
      proxyRes.on("end", function () {
        try {
          console.log("body", body);
          const { accessToken, message } = JSON.parse(body);
          console.log(",,,", JSON.parse(body));
          if (!accessToken) {
            return (res as NextApiResponse)
              .status(400)
              .json({ message: message });
          }
          console.log("run");

          const cookies = new Cookies(req, res, {
            /* Checking if the environment is not in development mode, then it will set the cookie to be
              secure. */
            secure: process.env.NODE_ENV !== "development",
          });
          cookies.set("access_token", accessToken, {
            httpOnly: true,
            /* A security feature that prevents CSRF attacks. */
            sameSite: "lax",
          });
          (res as NextApiResponse).status(200).json({
            message: "register success",
          });
          resolve(true);
        } catch (error) {
          console.log(error);
          (res as NextApiResponse)
            .status(500)
            .json({ message: "something went wrong" });
          resolve(false);
        }
      });
    };
    proxy.once("proxyRes", handleRegisterResponse);
    proxy.web(req, res, {
      target: "https://www.kaitoshop.tk/",
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
