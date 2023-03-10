import { Input } from "antd";
import * as React from "react";
import { Controller, useForm, UseFormReturn } from "react-hook-form";

export interface InputFieldProps {
  name: string;
  label?: string;
  form: any;
  [key: string]: any;
}

export function InputField(props: InputFieldProps) {
  const { name, label, form } = props;
  const {
    formState: { errors, touchedFields },
  } = form;
  const hashError = errors[name] && touchedFields[name] ? true : false;
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <Input status={hashError ? "error" : "warning"} {...field} />
      )}
    ></Controller>
  );
}
