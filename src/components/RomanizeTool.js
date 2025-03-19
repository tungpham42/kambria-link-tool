import React, { useState } from "react";
import { Container, Form, Button, Alert, Card, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faKeyboard,
  faMagic,
  faCheckCircle,
  faCopy,
  faCheck,
  faCircleExclamation,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { romanizeString } from "./utils";

const RomanizeTool = () => {
  const [inputText, setInputText] = useState("");
  const [romanizedText, setRomanizedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

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

  return (
    <Container className="my-5 col-lg-8 col-md-10 col-sm-10 col-12">
      <Card>
        <Card.Header>
          <h2>
            <FontAwesomeIcon icon={faLink} className="me-2" />
            Slug Tool
          </h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="h5">
                <FontAwesomeIcon icon={faKeyboard} className="me-2" />
                Input the text:
              </Form.Label>
              <Form.Control
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text here"
                autoFocus
              />
              <Button variant="primary" type="submit" className="w-100 mt-2">
                <FontAwesomeIcon icon={faMagic} className="me-2" />
                Convert to Slug
              </Button>
            </Form.Group>
          </Form>

          {error && (
            <Alert variant="danger" className="mt-3">
              <FontAwesomeIcon icon={faCircleExclamation} className="me-2" />
              {error}
            </Alert>
          )}

          {romanizedText && (
            <Card className="mt-3">
              <Card.Body>
                <h5>
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                  Result:
                </h5>
                <InputGroup>
                  <Form.Control type="text" value={romanizedText} readOnly />
                  <OverlayTrigger placement="top" overlay={<Tooltip>{copied ? "Copied!" : "Copy"}</Tooltip>}>
                    <Button variant="outline-secondary" onClick={handleCopy}>
                      <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                    </Button>
                  </OverlayTrigger>
                </InputGroup>
                <p className="mt-2">
                  Character count: <strong>{charCount}</strong>
                </p>
              </Card.Body>
            </Card>
          )}

          <Card className="mt-4">
            <Card.Body>
              <h5>
                <FontAwesomeIcon icon={faList} className="me-2" />
                Examples:
              </h5>
              <ul>
                <li>"Xin chào!" → "xin-chao" (8 characters)</li>
                <li>"Hello World!" → "hello-world" (11 characters)</li>
                <li>"This & That" → "this-that" (9 characters)</li>
                <li>"Café Olé" → "cafe-ole" (8 characters)</li>
                <li>"Multiple Spaces" → "multiple-spaces" (15 characters)</li>
              </ul>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RomanizeTool;