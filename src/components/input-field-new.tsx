import { Input } from "antd";
import * as React from "react";
import { Control, useController } from "react-hook-form";

export interface InputFieldNewProps {
  name: string;
  label?: string;
  control: Control<any>;
}

export function InputFieldNew({ name, label, control }: InputFieldNewProps) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  //   can render whatever
  return (
    <Input
      value={value}
      onChange={(e) => {
        console.log(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}
