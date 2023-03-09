import { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";

/* Creating a proxy server that is used to proxy the request to the target server. */
const proxy = httpProxy.createProxyServer();
/* A Next.js API configuration. */
export const config = {
  api: {
    bodyParser: false,
  },
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not support" });
  }
  return new Promise((resolve) => {
    req.headers.cookie = "";
    req.url = req.url ? req.url.replace(/^\/api/, "") : req.url;

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      console.log("@@@",proxyRes)
      let body :Buffer[] = [];
      proxyRes.on("data", function (chunk:Buffer) {
        console.log("c",chunk);
        body.push(chunk);
      });
      //   done
      proxyRes.on("end", function () {
        try {
          const data = Buffer.concat(body).toString();
          console.log("body", data);
          // const { token: accessToken } = JSON.parse(body);
          const accessToken = "123123ss";

          //   convert token to cookies
          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== "development",
          });
          cookies.set("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
          });
          (res as NextApiResponse)
            .status(200)
            .json({ message: "Login success" });
          resolve(true);
        } catch (error) {
          console.log("erorr", error);
          (res as NextApiResponse)
            .status(500)
            .json({ message: "Someting went wrong" });
          resolve(false);
        }
      });
      proxy.on("error", () => {
        console.log("error");
        resolve(false);
      });
    };

    /* A callback function that is called when the proxy response is received. */
    proxy.once("proxyRes", handleLoginResponse);

    /* A proxy server that is used to proxy the request to the target server. */
    proxy.web(req, res, {
      // target: "https://corebe-cloud-staging.solarbk.vn/",
      target:process.env.API_URL,
      /* Telling the proxy to handle the response. */
      selfHandleResponse: true,
      changeOrigin: true,
    });
  });
}
