import { showMoney } from "@/services/utils";
import { IMoney } from "@/types/renderItem";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  item: IMoney;
};

const RenderMoneyFormItem = ({ item }: Props) => {
  const { formState, register, watch } = useFormContext();
  const fieldError = formState.errors[item.name]?.message;

  return (
    <TextField
      type="number"
      size="small"
      label={item.label}
      {...register(item.name)}
      {...item.elementProps}
      error={Boolean(fieldError)}
      fullWidth
      helperText={(fieldError ?? showMoney(watch(item.name))) as string}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">ریال</InputAdornment>,
        },
      }}
    />
  );
};

export default RenderMoneyFormItem;
