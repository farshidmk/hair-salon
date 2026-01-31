import { IRenderInput } from "@/types/renderItem";
import RenderMoneyFormItem from "./RenderMoneyFormItem";
import RenderTextFormItem from "./RenderTextFormItem";

type Props = {
  item: IRenderInput;
};

const RenderFormItems = ({ item }: Props) => {
  switch (item.inputType) {
    case "text":
      return <RenderTextFormItem item={item} />;
    case "money":
      return <RenderMoneyFormItem item={item} />;

    default:
      break;
  }
};

export default RenderFormItems;
