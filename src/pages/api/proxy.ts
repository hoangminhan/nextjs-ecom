import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
const proxy = httpProxy.createProxyServer();

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log("run proxy")
   return new Promise((resolve) => {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("accessToken");
    // don't sent cookies to Api server
    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`;

      // delete cookie, ko gui len api server
      req.headers.cookie = "";
    }

    // khi nhận được kq từ api server trả về => api proxy k làm gì cả mà trả về cho client luôn
    proxy.web(req, res, {
      // đường dẫn tới server
      target: process.env.API_URL,
      /* A flag that tells the proxy to not handle the response. */
      selfHandleResponse: false,
      /* Telling the proxy to change the origin of the request to the target. */
      changeOrigin: true,
    });

    /* A callback function that is called when the proxy response is received. */
    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });
}
