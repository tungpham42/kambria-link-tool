import React, { useState } from "react";
import { Container, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { transliterate } from "transliteration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faKeyboard,
  faMagic,
  faCheckCircle,
  faCopy,
  faCircleExclamation,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const RomanizeTool = () => {
  const [inputText, setInputText] = useState("");
  const [romanizedText, setRomanizedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  // Function to romanize the string
  const romanizeString = (str) => {
    return transliterate(str)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setError("Please enter some text!");
      setRomanizedText("");
      setCharCount(0);
      return;
    }
    setError("");
    const result = romanizeString(inputText);
    setRomanizedText(result);
    setCharCount(result.length);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(romanizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handler for changes to the result text
  const handleResultChange = (e) => {
    const newText = e.target.value;
    setRomanizedText(newText);
    setCharCount(newText.length); // Update character count based on edited text
    setCopied(false); // Reset copied state if text is modified
  };

  return (
    <Container className="my-5 col-lg-8 col-md-10 col-sm-10 col-12">
      <h2 className="mb-4">
        <FontAwesomeIcon icon={faLink} className="me-2" />
        URL tool
      </h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="h5">
            <FontAwesomeIcon icon={faKeyboard} className="me-2" />
            Input the text:
          </Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Text here"
              autoFocus
            />
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon={faMagic} className="me-2" />
              Convert to slug
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-3">
          <FontAwesomeIcon icon={faCircleExclamation} className="me-2" />
          {error}
        </Alert>
      )}

      {romanizedText && !error && (
        <div className="mt-3">
          <h5>
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Result:
          </h5>
          <InputGroup>
            <Form.Control
              type="text"
              value={romanizedText}
              onChange={handleResultChange} // Add onChange handler
            />
            <Button
              variant={copied ? "success" : "outline-success"}
              onClick={handleCopy}
            >
              <FontAwesomeIcon icon={faCopy} className="me-2" />
              {copied ? "Copied" : "Copy"}
            </Button>
          </InputGroup>
          <p className="mt-2">
            Characters count: <strong>{charCount}</strong>
          </p>
        </div>
      )}

      <div className="mt-4">
        <h5>
          <FontAwesomeIcon icon={faList} className="me-2" /> Ví dụ:
        </h5>
        <ul>
          <li>"Xin chào!" → "xin-chao" (8 ký tự)</li>
          <li>"Hello World!" → "hello-world" (11 ký tự)</li>
          <li>"This & That" → "this-that" (9 ký tự)</li>
          <li>"Café Olé" → "cafe-ole" (8 ký tự)</li>
          <li>"Multiple Spaces" → "multiple-spaces" (15 ký tự)</li>
        </ul>
      </div>
    </Container>
  );
};

export default RomanizeTool;
