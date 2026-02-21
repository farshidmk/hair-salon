import {
  AutocompleteProps,
  CheckboxProps,
  Grid2Props,
  MenuItemProps,
  SelectProps,
  SxProps,
  TextFieldProps,
} from "@mui/material";
import { QueryStatus } from "@tanstack/react-query";
import React from "react";
import { FieldErrors, FieldValue, FieldValues, ControllerRenderProps } from "react-hook-form";
import { DatePickerProps } from "react-multi-date-picker";

type TInputTypes = "text" | "autocomplete" | "checkbox" | "select" | "date" | "password" | "custom";

interface IBaseInput<T = FieldValues> {
  inputType: TInputTypes;
  label: string;
  name: keyof T;
  gridProps?: Grid2Props;
}

type TOption = MenuItemProps | { title: React.ReactNode; value: string | number | boolean };

interface IText<T = FieldValues> extends IBaseInput<T> {
  inputType: "text";
  elementProps?: TextFieldProps;
}
interface IMoney<T = FieldValues> extends IBaseInput<T> {
  inputType: "money";
  elementProps?: TextFieldProps;
}

interface IPassword<T = FieldValues> extends IBaseInput<T> {
  inputType: "password";
  elementProps?: TextFieldProps;
}
interface ISelect<T = FieldValues> extends IBaseInput<T> {
  inputType: "select";
  elementProps?: SelectProps;
  options: TOption[];
  status?: QueryStatus;
  refetch?: () => void;
}
interface IAutocomplete<T = FieldValues> extends IBaseInput<T> {
  inputType: "autocomplete";
  elementProps?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>;
  options: TOption[];
  status?: QueryStatus;
  refetch?: () => void;
}
interface ICheckbox<T = FieldValues> extends IBaseInput<T> {
  inputType: "checkbox";
  elementProps?: CheckboxProps;
}

interface IDate<T = FieldValues> extends IBaseInput<T> {
  inputType: "date";
  elementProps?: Partial<DatePickerProps<DayValue>>;
}
interface ICustomInput<T = FieldValues> extends IBaseInput<T> {
  inputType: "custom";
  render: React.ReactElement;
  elementProps?: SxProps;
}

type IRenderInput<T = unknown> =
  | IText<T>
  | IMoney<T>
  | IPassword<T>
  | ISelect<T>
  | IAutocomplete<T>
  | ICheckbox<T>
  | IDate<T>
  | ICustomInput<T>;

type IRenderFormInput<T = FieldValue> = IRenderInput<T> & {
  errors: FieldErrors<T>;
  control: ControllerRenderProps;
  // control: ControllerRenderProps<FieldValues, string>;
  setValue?: UseFormSetValue<T>;
  gridProps?: Grid2Props;
};
