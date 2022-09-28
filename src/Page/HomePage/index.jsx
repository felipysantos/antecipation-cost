import {
  FormControlComponent,
  InputComponent,
} from "../../Components/FormControl";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { sendDataForm } from "../../Service/api";
import { useContext, useState } from "react";
import { DateContext } from "../../Providers";
import { mask as masker, unMask } from "remask";
export const HomePage = () => {
  const { isDate, setDate } = useContext(DateContext);
  const [isMaskValue, setMaskValue] = useState("");

  const onChangeMaskerade = (ev) => {
    let cell = unMask(ev.target.value);
    setMaskValue(
      masker(cell, [
        "9,99",
        "99,99",
        "999,99",
        "9.999,99",
        "99.999,99",
        "999.999,99",
        "9.999.999,99",
        "99.999.999.999,99",
        "999.999.999.999,99",
      ])
    );
  };
  const signUpSchema = yup.object().shape({
    amount: yup.string().required("Campo obrigatório"),
    installments: yup.string().required("Campo obrigatório"),
    mdr: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const handleCreateData = (dataForm) => {
    let newInstallments = "";

    if (dataForm.amount.substr(newInstallments.length - 2) === "00") {
      newInstallments = dataForm.amount.substr(newInstallments.length - 2);
    }
    const data = {
      amount: parseInt(dataForm.amount),
      installments: parseInt(newInstallments),
      mdr: parseInt(dataForm.mdr),
      days: [1, 15, 30, 90],
    };
    console.log(newInstallments);
    // sendDataForm({ data, isDate, setDate });
  };
  return (
    <Stack flexDir={{ base: "column", lg: "row" }} alignItems={"baseline"}>
      <VStack>
        <Heading>Simule sua Antecipação</Heading>
        <form onSubmit={handleSubmit(handleCreateData)}>
          <FormControlComponent
            onChange={onChangeMaskerade}
            value={isMaskValue}
            placeholder={"R$ 1.000,00"}
            register={{ ...register("amount") }}
            errors={errors.amount}
            min={"1000"}
            helper={"Valor mínimo R$1.000,00"}
          >
            {{ name: "Informe o valor da venda*" }}
          </FormControlComponent>
          <FormControlComponent
            register={{ ...register("installments") }}
            errors={errors.installments}
            min={"1"}
            max={"12"}
            helper={"Máximo de 12 parcelas"}
          >
            {{ name: "Em quantas parcelas*" }}
          </FormControlComponent>
          <FormControlComponent
            register={{ ...register("mdr") }}
            errors={errors.mdr}
          >
            {{ name: "Informe o percentual de MDR" }}
          </FormControlComponent>
          <Button type={"submit"}>Enviar</Button>
        </form>
      </VStack>

      <VStack>
        <Heading>Você receberá:</Heading>
        <VStack>
          <Text>Amanhã: {isDate.length && isDate[0][1]}</Text>
          <Text>Em 15 dias: {isDate.length && isDate[0][15]}</Text>
          <Text>Em 30 dias: {isDate.length && isDate[0][30]}</Text>
          <Text>Em 90 dias: {isDate.length && isDate[0][90]}</Text>
        </VStack>
      </VStack>
    </Stack>
  );
};
