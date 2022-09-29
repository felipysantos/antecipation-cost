import { Center } from "@chakra-ui/react";
import { HomePage } from "./Page/HomePage";
import { DateProvider } from "./Providers";

function App() {
  return (
    <DateProvider>
      <Center
        bgColor={{ base: "#fff", lg: "#d1d8e0" }}
        py={{ base: 20, lg: 0 }}
        w={"100vw"}
        h={"auto"}
        minH={"100vh"}
      >
        <HomePage />
      </Center>
    </DateProvider>
  );
}

export default App;
