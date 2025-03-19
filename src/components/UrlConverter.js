import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

const UrlConverter = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [error, setError] = useState("");

  const convertUrl = (url) => {
    try {
      // Check if URL matches the expected pattern with specific prefixes
      const urlPattern = /^https:\/\/cday\.kambria\.io\/(knth|cdcg)-(.*)$/;
      const matches = url.match(urlPattern);

      if (!matches) {
        throw new Error(
          'Invalid URL format. URL must start with https://cday.kambria.io/ followed by either "knth-" or "cdcg-"'
        );
      }

      const [, prefix, content] = matches;

      // Construct new URL
      const newUrl = `https://${prefix}.cday.global/${content}`;
      return newUrl;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setConvertedUrl("");

    try {
      const result = convertUrl(inputUrl.trim());
      setConvertedUrl(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-5 col-lg-10 col-md-10 col-sm-10 col-12">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header>
              <h1 className="text-center">Kambria URL Converter</h1>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="urlInput">
                  <Form.Label>Enter URL to convert</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. https://cday.kambria.io/cdcg-news"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Format: https://cday.kambria.io/[knth|cdcg]-[content]
                  </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Convert URL
                  </Button>
                </div>
              </Form>

              {convertedUrl && (
                <Card className="mt-4">
                  <Card.Body>
                    <h5>Converted URL:</h5>
                    <p className="text-success">
                      <a
                        href={convertedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {convertedUrl}
                      </a>
                    </p>
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
