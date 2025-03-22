import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKeyboard,
  faMagic,
  faCheckCircle,
  faCopy,
  faCheck,
  faCircleExclamation,
  faList,
  faQuestionCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { romanizeString } from "./utils";

// Translation object
const translations = {
  en: {
    title: "Slug Tool",
    inputLabel: "Input the text:",
    inputPlaceholder: "Input the text you want to convert",
    convertButton: "Convert to Slug",
    errorMessage: "Please enter some text!",
    resultLabel: "Result:",
    charCount: "Character count:",
    examplesLabel: "Examples:",
    modalTitle: "What is a Slug?",
    modalBody1:
      "A slug is a human-readable, URL-friendly version of a piece of text. It is typically used in web addresses to make them more readable and SEO-friendly and is placed after a domain. Slugs are usually:",
    modalList: [
      "Lowercase",
      "Use hyphens (-) instead of spaces",
      "Contain only alphanumeric characters",
      "Remove special characters and accents",
    ],
    modalBody2:
      'For example, a blog post titled "My Awesome Blog Post!" would become "my-awesome-blog-post" as a slug.',
    closeButton: "Close",
    copyTooltip: "Copy",
    copiedTooltip: "Copied!",
    characters: "characters",
  },
  vi: {
    title: "Công cụ tạo Slug",
    inputLabel: "Nhập văn bản:",
    inputPlaceholder: "Nhập vào văn bản cần chuyển",
    convertButton: "Chuyển thành Slug",
    errorMessage: "Vui lòng nhập văn bản!",
    resultLabel: "Kết quả:",
    charCount: "Số ký tự:",
    examplesLabel: "Ví dụ:",
    modalTitle: "Slug là gì?",
    modalBody1:
      "Slug là phiên bản thân thiện với URL, dễ đọc của một đoạn văn bản. Nó thường được sử dụng trong địa chỉ web để làm cho chúng dễ đọc hơn và tối ưu hóa SEO, được đặt sau tên miền. Slug thường:",
    modalList: [
      "Viết thường",
      "Sử dụng dấu gạch nối (-) thay cho khoảng trắng",
      "Chỉ chứa ký tự chữ và số",
      "Loại bỏ ký tự đặc biệt và dấu",
    ],
    modalBody2:
      'Ví dụ, một bài đăng blog có tiêu đề "My Awesome Blog Post!" sẽ trở thành "my-awesome-blog-post" dưới dạng slug.',
    closeButton: "Đóng",
    copyTooltip: "Sao chép",
    copiedTooltip: "Đã sao chép!",
    characters: "ký tự",
  },
};

const RomanizeTool = ({ language }) => {
  const [inputText, setInputText] = useState("");
  const [romanizedText, setRomanizedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const t = translations[language];

  useEffect(() => {
    if (error) {
      setError(t.errorMessage); // Update error message when language changes
    }
  }, [t.errorMessage, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setError(t.errorMessage);
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

  const handleResultChange = (e) => {
    const newText = e.target.value;
    setRomanizedText(newText);
    setCharCount(newText.length);
    setCopied(false);
  };

  return (
    <Container className="my-5 col-lg-8 col-md-10 col-sm-10 col-12">
      <Card className="shadow rounded">
        <Card.Header className="d-flex align-items-center justify-content-center">
          <h2 className="text-center m-0 me-2">{t.title}</h2>
          <Button
            variant="link"
            onClick={() => setShowModal(true)}
            className="p-0 text-dark"
            style={{ textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
          </Button>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="h5">
                <FontAwesomeIcon icon={faKeyboard} className="me-2" />
                {t.inputLabel}
              </Form.Label>
              <Form.Control
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.inputPlaceholder}
              />
              <Button variant="primary" type="submit" className="w-100 mt-2">
                <FontAwesomeIcon icon={faMagic} className="me-2" />
                {t.convertButton}
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
            <Card className="mt-3 p-0">
              <Card.Body className="p-0">
                <h5>
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                  {t.resultLabel}
                </h5>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={romanizedText}
                    onChange={handleResultChange}
                  />
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        {copied ? t.copiedTooltip : t.copyTooltip}
                      </Tooltip>
                    }
                  >
                    <Button variant="outline-secondary" onClick={handleCopy}>
                      <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                    </Button>
                  </OverlayTrigger>
                </InputGroup>
                <p className="mt-2">
                  {t.charCount} <strong>{charCount}</strong>
                </p>
              </Card.Body>
            </Card>
          )}

          <Card className="mt-3">
            <Card.Body className="p-0">
              <h5>
                <FontAwesomeIcon icon={faList} className="me-2" />
                {t.examplesLabel}
              </h5>
              <ul>
                <li>"Xin chào!" → "xin-chao" (8 {t.characters})</li>
                <li>"Hello World!" → "hello-world" (11 {t.characters})</li>
                <li>"This & That" → "this-that" (9 {t.characters})</li>
                <li>"Café Olé" → "cafe-ole" (8 {t.characters})</li>
                <li>
                  "Multiple Spaces" → "multiple-spaces" (15 {t.characters})
                </li>
                <li>"こんにちは" → "konnitiha" (9 {t.characters})</li>
                <li>"안녕하세요" → "annyeonghaseyo" (14 {t.characters})</li>
              </ul>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t.modalBody1}</p>
          <ul>
            {t.modalList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>{t.modalBody2}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faTimes} className="me-1" />
            {t.closeButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RomanizeTool;
