import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  OverlayTrigger,
  Tooltip,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheck,
  faLink,
  faArrowRight,
  faList,
  faExternalLinkAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { romanizeString } from "./utils";

const UrlConverter = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convertUrl = (url) => {
    const urlPattern = /^https:\/\/cday\.kambria\.io\/(knth|cdcg)-(.*)$/;
    const matches = url.match(urlPattern);

    if (!matches) {
      throw new Error(
        'Invalid URL format. URL must start with https://cday.kambria.io/ followed by either "knth-" or "cdcg-"'
      );
    }

    const [, prefix, content] = matches;
    return `https://${prefix}.cday.global/${romanizeString(content)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setConvertedUrl("");
    setCopied(false);

    try {
      setConvertedUrl(convertUrl(inputUrl.trim()));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = () => {
    window.open(convertedUrl, "_blank", "noopener,noreferrer");
  };

  const handleResultChange = (e) => {
    setConvertedUrl(e.target.value);
    setCopied(false);
  };

  return (
    <Container className="pt-5 col-lg-8 col-md-10 col-sm-10 col-12">
      <Card className="shadow-lg rounded">
        <Card.Header>
          <h2 className="text-center">
            <FontAwesomeIcon icon={faLink} className="me-2" />
            Kambria URL Converter
          </h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label className="h5">
                <FontAwesomeIcon icon={faLink} className="me-2" />
                Enter URL:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. https://cday.kambria.io/cdcg-news"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                autoFocus
              />
              <Button variant="primary" type="submit" className="w-100 mt-2">
                <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                Convert URL
              </Button>
            </Form.Group>
          </Form>

          {convertedUrl && (
            <Card className="mt-3 p-0">
              <Card.Body className="p-0">
                <h5>
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                  Result:
                </h5>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={convertedUrl}
                    onChange={handleResultChange}
                  />
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{copied ? "Copied!" : "Copy"}</Tooltip>}
                  >
                    <Button variant="outline-secondary" onClick={handleCopy}>
                      <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Open link</Tooltip>}
                  >
                    <Button
                      variant="outline-secondary"
                      onClick={handleOpenLink}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </Button>
                  </OverlayTrigger>
                </InputGroup>
              </Card.Body>
            </Card>
          )}

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          <Card className="mt-4">
            <Card.Body>
              <h5>
                <FontAwesomeIcon icon={faList} className="me-2" />
                Examples:
              </h5>
              <ul>
                <li>
                  https://cday.kambria.io/knth-<strong>tin-tuc</strong> →
                  https://knth.cday.global/<strong>tin-tuc</strong>
                </li>
                <li>
                  https://cday.kambria.io/cdcg-<strong>news</strong> →
                  https://cdcg.cday.global/<strong>news</strong>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UrlConverter;
