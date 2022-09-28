import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
export const FormControlComponent = ({
  register,
  errors,
  children,
  placeholder,
  helper,
  min,
  max,
  onChange,
  value,
}) => {
  return (
    <FormControl isInvalid={errors}>
      <FormLabel>
        {children.name}
        <Input
          placeholder={placeholder}
          _placeholder={{ color: "#778ca3" }}
          {...register}
          onChange={onChange}
          value={value}
          type="text"
          variant={"filled"}
          border={errors ? "2px solid #FF530D" : "2px solid #000"}
          bgColor={"#e1e1e1"}
          color={"#5e6b8a"}
          borderRadius={4}
          min={min}
          max={max}
          _focusWithin={{
            border: "2px solid #5e6b8a",
            boxShadow: "none",
            color: "#5e6b8a",
            bgColor: "#d1d8e0",
          }}
        />
        {helper ? <FormHelperText>{helper}</FormHelperText> : <></>}
      </FormLabel>
      <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
    </FormControl>
  );
};
