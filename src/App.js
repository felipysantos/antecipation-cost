import { HomePage } from "./Page/HomePage";
import { DateProvider } from "./Providers";

function App() {
  return (
    <>
      <DateProvider>
        <HomePage />
      </DateProvider>
    </>
  );
}

export default App;
