import { IRenderInput } from "@/types/renderItem";
import React from "react";
import RenderTextFormItem from "./RenderTextFormItem";

type Props = {
  item: IRenderInput;
};

const RenderFormItems = ({ item }: Props) => {
  switch (item.inputType) {
    case "text":
      return <RenderTextFormItem item={item} />;

    default:
      break;
  }
};

export default RenderFormItems;
