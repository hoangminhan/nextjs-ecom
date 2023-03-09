import Cookies from "cookies";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "method not supported" });
  }
  const cookies = new Cookies(req, res);
  cookies.set("accessToken");
  res.status(200).json({ message: "Logout successfully" });
}
