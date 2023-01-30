import "./App.css";
import { useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import usePasswordToggle from "./hooks/usePasswordToggle";

const App = () => {
  const nameRef = useRef();
  const ageRef = useRef();
  const sexRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isFocus, setIsFocus] = useState(false);
  const [doesPasswordMatch, setDoesPasswordMatch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cfError = document.querySelector("#cp-error");
  const [pType, pIcon] = usePasswordToggle();
  const [cfType, cfIcon] = usePasswordToggle();

  function passwordMatch() {
    if (
      passwordRef.current !== undefined &&
      confirmPasswordRef.current !== undefined
    )
      return passwordRef.current.value === confirmPasswordRef.current.value
        ? true
        : false;
  }

  function checkChange() {
    if (
      passwordRef.current.value.length === 0 ||
      confirmPasswordRef.current.value.length === 0
    )
      setDoesPasswordMatch(false);
    else setDoesPasswordMatch(passwordMatch());
  }

  function reset() {
    nameRef.current.value = "";
    ageRef.current.value = "";
    sexRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!doesPasswordMatch) {
      cfError.style.opacity = 1;
      setTimeout(function () {
        cfError.style.opacity = 0;
      }, 3000);
      return;
    }
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    reset();
  }

  return (
    <>
      <div id="form">
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={nameRef}
                    placeholder="Name"
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="forAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    ref={ageRef}
                    placeholder="Age"
                    step={1}
                    min={13}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="forSex">
                  <Form.Label>Sex</Form.Label>
                  <Form.Select ref={sexRef}>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Others</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="forEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="abc@xyz.com"
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3 icon-container"
                  controlId="forPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={pType}
                    ref={passwordRef}
                    required
                    onChange={() => checkChange()}
                  ></Form.Control>
                  <span className="icon">{pIcon}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group
                  className="mb-1 icon-container"
                  controlId="forConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={cfType}
                    ref={confirmPasswordRef}
                    onChange={() => checkChange()}
                    required
                    className="focus"
                    style={
                      isFocus
                        ? isFocus && doesPasswordMatch
                          ? { boxShadow: "0 0 0 .2rem rgba(0,200,0,.6)" }
                          : { boxShadow: "0 0 0 .2rem rgba(200,0,0,.6)" }
                        : {}
                    }
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                  ></Form.Control>
                  <span className="icon">{cfIcon}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <div id="cp-error">Password doesn't match</div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <div className="mb-2 text-center text-center">
                  <Button
                    variant="outline-primary"
                    className="me-4"
                    type="submit"
                  >
                    Sign up
                  </Button>
                  <Button variant="outline-danger" onClick={() => reset()}>
                    Reset
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Account created successfully!</Modal.Body>
      </Modal>
    </>
  );
};

export default App;
