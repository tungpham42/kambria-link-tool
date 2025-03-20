import Footer from "./components/Footer";
import UrlConverter from "./components/UrlConverter";
import RomanizeTool from "./components/RomanizeTool";

const App = () => {
  return (
    <>
      <h1 className="text-center my-4">Kambria Link Builder</h1>
      <UrlConverter />
      <RomanizeTool />
      <Footer />
    </>
  );
};

export default App;
