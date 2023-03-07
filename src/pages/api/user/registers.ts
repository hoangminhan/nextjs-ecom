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
  if (req.method !== "POST")
    return res.status(404).json({ message: "method not supported" });
  return new Promise((resolve) => {
    req.headers.cookie = "";
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", (chunk) => (body += chunk));
      proxyRes.on("end", async () => {
        try {
          const { message } = JSON.parse(body);
          console.log("message",message)
          const accessToken ="123adadasd"

          // if (!accessToken) {
          //   (res as NextApiResponse).status(400).json({ message });
          // } 
            console.log("k co");

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
              message: "register successful",
            });
        } catch (error) {
          console.log(error);
          (res as NextApiResponse)
            .status(500)
            .json({ message: "something went wrong" });
        }
        resolve(true);
      });
    };
    proxy.once("proxyRes", handleLoginResponse);
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
