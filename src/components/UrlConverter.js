import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { transliterate } from "transliteration";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheck,
  faLink,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const UrlConverter = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const romanizeString = (str) => {
    return transliterate(str)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const convertUrl = (url) => {
    try {
      const urlPattern = /^https:\/\/cday\.kambria\.io\/(knth|cdcg)-(.*)$/;
      const matches = url.match(urlPattern);

      if (!matches) {
        throw new Error(
          'Invalid URL format. URL must start with https://cday.kambria.io/ followed by either "knth-" or "cdcg-"'
        );
      }

      const [, prefix, content] = matches;
      return `https://${prefix}.cday.global/${romanizeString(content)}`;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setConvertedUrl("");
    setCopied(false);

    try {
      const result = convertUrl(inputUrl.trim());
      setConvertedUrl(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container className="pt-5 col-lg-8 col-md-10 col-sm-10 col-12">
      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Header>
              {/* Heading with Font Awesome icon */}
              <h1 className="text-center">Kambria URL Converter</h1>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="urlInput">
                  {/* Label with Font Awesome icon */}
                  <Form.Label>
                    <FontAwesomeIcon icon={faLink} className="me-2" />
                    Enter URL to convert
                  </Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    placeholder="e.g. https://cday.kambria.io/cdcg-news"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Format: https://cday.kambria.io/[knth|cdcg]-[content]
                  </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2">
                  {/* Button with Font Awesome icon */}
                  <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                    Convert URL
                  </Button>
                </div>
              </Form>

              {convertedUrl && (
                <Card className="mt-4">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>Converted URL:</h5>
                        <p className="text-success mb-0">
                          <a
                            href={convertedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {convertedUrl}
                          </a>
                        </p>
                      </div>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            {copied ? "Copied!" : "Copy to clipboard"}
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={handleCopy}
                          className="ms-2"
                        >
                          <FontAwesomeIcon
                            icon={copied ? faCheck : faCopy}
                            className={copied ? "text-success" : ""}
                          />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Card.Body>
                </Card>
              )}

              {error && (
                <Card className="mt-4 bg-danger text-white">
                  <Card.Body>
                    <h5>Error:</h5>
                    <p>{error}</p>
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UrlConverter;
