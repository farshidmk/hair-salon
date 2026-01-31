import { IText } from "@/types/renderItem";
import { TextField } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  item: IText;
};

const RenderTextFormItem = ({ item }: Props) => {
  const { formState, register } = useFormContext();
  const fieldError = formState.errors[item.name]?.message;

  return (
    <TextField
      size="small"
      {...register(item.name)}
      label={item.label}
      {...item.elementProps}
      error={Boolean(fieldError)}
      helperText={fieldError as string}
      fullWidth
    />
  );
};

export default RenderTextFormItem;
