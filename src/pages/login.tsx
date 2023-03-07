import { imageApp } from "@/assets/images";
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
interface LoginPageProps {}
const StyledInput = styled(Input)`
  .ant-input {
    padding: 7px 11px;
  }
`;
export default function LoginPage(props: LoginPageProps) {
  const [formLogin] = Form.useForm();
  return (
    <div className="h-[100vh] flex">
      <div className="flex-1 bg-[#59c6f1] h-full"></div>
      <div className="flex-1 h-full justify-center items-center bg-[#a09e9e]">
        <div className="h-full flex flex-col justify-center items-center">
          <div className="w-[600px] h-[700px] p-6 mx-auto form-style">
            <div className="text-center">
              <Image src={imageApp.logo} alt="" />
            </div>
            <div className="mt-10">
              <p className="text-[18px] text-primaryColor">Chào mừng trở lại</p>
              <p className="mt-1">Đăng nhập để tiếp tục mua sắm</p>
            </div>
            <div className="mt-4">
              <Form
                autoComplete="off"
                style={{ maxWidth: 600 }}
                layout="vertical"
                form={formLogin}
              >
                <Form.Item
                  label="Email"
                  name="username"
                  rules={[{ required: true, message: "Vui lòng nhập E-mail" }]}
                >
                  <input
                    type="text"
                    className="w-full py-[11px] px-2 border-none outline-none rounded-md"
                    placeholder="Nhập email"
                  />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                  ]}
                >
                  <input
                    type="password"
                    className="w-full py-[11px] px-2 border-none outline-none rounded-md"
                    placeholder="Nhập password"
                  />
                </Form.Item>
                <Form.Item>
                  <div className="mt-10">
                    <p className="bg-primaryColor hover:scale-105 duration-300 ease-in-out rounded-md px-4 py-2 text-center text-white cursor-pointer">
                      Đăng nhập
                    </p>
                  </div>
                </Form.Item>
              </Form>
            </div>
            {/* login with */}
            <div className="text-center">
              <p>Đăng nhập với</p>
              <div className="flex gap-2 justify-center my-3">
                <p>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    color="#556ee6"
                    className="text-[24px]"
                  />
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faGoogle}
                    color="#f46a6a"
                    className="text-[24px]"
                  />
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faTwitter}
                    color="#50a5f1"
                    className="text-[24px]"
                  />
                </p>
              </div>
            </div>
            {/* register */}
            <div className="flex justify-center gap-2 mt-2">
              <p className="opacity-70">Chưa có tài khoản?</p>{" "}
              <Link href={"/register"} passHref>
                <p className="text-primaryColor cursor-pointer">Đăng kí ngay</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
