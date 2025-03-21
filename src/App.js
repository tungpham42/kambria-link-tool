import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import UrlConverter from "./components/UrlConverter";
import RomanizeTool from "./components/RomanizeTool";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

// Translation object for App component
const translations = {
  en: {
    title: "Kambria Link Builder",
  },
  vi: {
    title: "Công cụ tạo liên kết của Kambria",
  },
};

const App = () => {
  // Initialize language from localStorage, default to "vi" if not set
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "vi";
  });

  // Update localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = translations[language];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-5 px-3">
        <h1 className="text-center flex-grow-1 h2">{t.title}</h1>
        <Dropdown>
          <Dropdown.Toggle
            variant="link"
            id="language-dropdown"
            className="text-dark"
          >
            <FontAwesomeIcon icon={faGlobe} size="lg" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => setLanguage("vi")}
              active={language === "vi"}
            >
              Tiếng Việt
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setLanguage("en")}
              active={language === "en"}
            >
              English
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <UrlConverter language={language} />
      <RomanizeTool language={language} />
      <Footer />
    </>
  );
};

export default App;
