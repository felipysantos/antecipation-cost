import { FormControlComponent } from "../../Components/FormControl";
import {
  Button,
  Center,
  Heading,
  Stack,
  Text,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { sendDataForm } from "../../Service/api";
import { useContext, useEffect } from "react";
import { DateContext } from "../../Providers";

export const HomePage = () => {
  const { isDate, setDate, isLoading, setLoading } = useContext(DateContext);
  const toast = useToast();
  const signUpSchema = yup.object().shape({
    amount: yup.string().required("Campo obrigatório"),
    installments: yup.string().required("Campo obrigatório"),
    mdr: yup.string().required("Campo obrigatório"),
  });

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const handleCreateData = (dataForm) => {
    setLoading(true);
    const data = {
      amount: parseInt(dataForm.amount),
      installments: parseInt(dataForm.installments),
      mdr: parseInt(dataForm.mdr),
      days: [1, 15, 30, 90],
    };
    sendDataForm({ data, isDate, setDate, toast, setLoading });
  };
  return (
    <Stack
      w={{ base: "80vw", lg: "auto" }}
      flexDir={{ base: "column", lg: "row" }}
      alignItems={"baseline"}
    >
      <VStack
        borderLeftRadius={8}
        pt={{ base: 0, lg: 8 }}
        h={"500px"}
        px={{ base: 0, lg: 10 }}
        bgColor={"#fff"}
      >
        <Heading>Simule sua Antecipação</Heading>
        <form onSubmit={handleSubmit(handleCreateData)}>
          <FormControlComponent
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
          <Button
            bgColor={"#4b7bec"}
            _hover={{ filter: "brightness(1.1)" }}
            color={"#fff"}
            type={"submit"}
          >
            Enviar
          </Button>
        </form>
      </VStack>

      <VStack
        borderRadius={{ base: 8, lg: 0 }}
        borderRightRadius={{ base: 8, lg: 8 }}
        bgColor={"#778ca3"}
        color={"#fff"}
        fontStyle={"italic"}
        w={{ base: "80vw", lg: "auto" }}
        h={{ base: "400px", lg: "500" }}
        pt={8}
        px={8}
      >
        <Heading>Você receberá:</Heading>
        <Center flexDir={"column"} justifyContent={"space-around"} h={"50vh"}>
          {isLoading ? (
            <Spinner size="xl" />
          ) : (
            <>
              <Text>Amanhã: R$ {isDate.length && isDate[0][1]},00</Text>
              <Text>Em 15 dias: R$ {isDate.length && isDate[0][15]},00</Text>
              <Text>Em 30 dias: R$ {isDate.length && isDate[0][30]},00</Text>
              <Text>Em 90 dias: R$ {isDate.length && isDate[0][90]},00</Text>
            </>
          )}
        </Center>
      </VStack>
    </Stack>
  );
};
