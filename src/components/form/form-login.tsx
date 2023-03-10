import * as React from "react";
import { InputField } from "../input-field";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputFieldNew } from "../input-field-new";

const schema = yup
  .object({
    username: yup.string().required("this is required"),
  })
  .required();

interface IFormLoginProps {
  handleSubmitForm: (values: any) => void;
}
type FormValue = {
  username: string;
  password: string;
};

// get input , validation
export function FormLogin(props: IFormLoginProps) {
  const { handleSubmitForm } = props;
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitFormLogin: SubmitHandler<FormValue> = (
    values: FormValue
  ) => {
    console.log("///", values);
    handleSubmitForm(values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitFormLogin)}>
        {/* <InputField name="username" form={formLogin} /> */}
        <InputFieldNew control={control} name="password" />
      </form>
    </div>
  );
}
