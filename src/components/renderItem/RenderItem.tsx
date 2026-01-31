import { IRenderFormInput } from "@/types/renderItem";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const RenderItem = (props: IRenderFormInput) => {
  const { name, label, errors, elementProps, control, inputType } = props;
  if (inputType === "text") {
    return (
      <>
        <TextField
          label={label}
          error={Boolean(errors?.[name as string]?.message)}
          helperText={errors?.[name as string]?.message as string}
          // InputLabelProps={{ shrink: true }}
          {...control}
          {...elementProps}
          fullWidth
          size="small"
        />
      </>
    );
  }

  if (inputType === "select") {
    const { options } = props;
    return (
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          error={errors?.[name as string]?.message as string}
          fullWidth
          {...control}
          {...elementProps}
        >
          {options?.map((option) => (
            <MenuItem key={`${option.value}-${option.title}`} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
        {!!errors?.[name as string]?.message && (
          <FormHelperText sx={{ color: (theme) => theme.palette.error.main }}>
            {errors?.[name as string]?.message as string}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
  if (inputType === "checkbox") {
    return (
      <FormGroup>
        <FormControlLabel
          {...control}
          {...elementProps}
          control={
            <Checkbox
              checked={!!control.value}
              onChange={(e) => control.onChange(e.target.checked)}
              name={control.name}
            />
          }
          label={label}
        />

        {!!errors?.[name as string]?.message && (
          <FormHelperText sx={{ color: (theme) => theme.palette.error.main }}>
            {errors?.[name as string]?.message as string}
          </FormHelperText>
        )}
      </FormGroup>
    );
  }

  if (inputType === "custom") {
    const { render } = props;
    return render;
  }
  return <h1>type not supported</h1>;
};

export default RenderItem;
