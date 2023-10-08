import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import DeleteConfirmation from "./deleteConfirm/DeleteConfirm";
import SubmitModal from "./submitModal/SubmitModal";
import "./Home.css";
import "./Home_test.css";

function Home() {
  const [primaryInfo, setprimaryInfo] = useState({
    candidateName: "",
    department: "",
    clientName: "",
    technology: "",
  });

  const [questions, setQuestions] = useState([]);

  const [singleQuestion, setsingleQuestion] = useState({
    question: "",
    answer: "",
    difficultyLevel: "",
  });
  //error state
  const [candidateNameError, setcandidateNameError] = useState("");
  const [departmentError, setdepartmentError] = useState("");
  const [clientNameError, setclientNameError] = useState("");
  const [technologyError, settechnologyError] = useState("");
  const [questionError, setquestionError] = useState("");
  const [difficultyError, setdifficultyError] = useState("");

  const [questionAtSubmitError, setquestionAtSubmitError] = useState("");
  const [difficultyAtSubmitError, setdifficultyAtSubmitError] = useState("");

  //delete modal
  const [delIndex, setdelIndex] = useState();
  const [isShowDelete, setisShowDelete] = useState(false);
  const [isShowSubmitModal, setisShowSubmitModal] = useState(false);

  //send del index to modal
  const sendDelIndex = (index) => {
    setdelIndex(index);
  };

  // validateCandidateName();
  // validateDepartment();
  // validateClientName();
  // validateTechnology();
  // validateQuestion();
  // validateDifficulty();
  // if (validateCandidateName() && validateDepartment() && validateClientName() && validateTechnology() && validateQuestion() && validateDifficulty()) {

  /// update at submit
  // const updateOnSubmit=()=>{

  //   setTimeout(() => {
  //     updateToQuestionData()
  //     updateToMergeState()
  //   }, 100);

  // }

  // send data to server
  let sendDataToServer = async (serverData) => {
    // let data = JSON.stringify(serverData);
    // console.log(data);
    try {
      const response = await axios.post(
        "http://192.168.43.67:2000/qna/add-questions-answers",
        serverData
        // { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // merge data after submit
  const updateToMergeState = () => {
    let submitQuestionsCopy = [...questions];
    submitQuestionsCopy.push(singleQuestion);
    setQuestions([...submitQuestionsCopy]);
    console.log("submitQuestionsCopy", submitQuestionsCopy);

    const serverData = {
      ...primaryInfo,
      questions: submitQuestionsCopy,
    };

    console.log("Server Data", serverData);
    sendDataToServer(serverData);

    setisShowSubmitModal(true);

    //clearing all the fields
    //clearing primary
    setprimaryInfo({
      candidateName: "",
      department: "",
      clientName: "",
      technology: "",
    });
    setQuestions([]);

    setsingleQuestion({
      question: "",
      answer: "",
      difficultyLevel: "",
    });
  };

  // console.log('singleQuestion',singleQuestion);

  //delete question
  const getDeleteDataIndex = (index) => {
    const newquestionsData = [...questions];
    newquestionsData.splice(index, 1);
    setQuestions(newquestionsData);
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // update primary data
  const updatePrimaryData = (event) => {
    setprimaryInfo({
      ...primaryInfo,
      [event.target.name]: event.target.value,
    });
  };

  let validateCandidateName = () => {
    if (primaryInfo.candidateName) {
      setcandidateNameError("");
      return true;
    } else {
      setcandidateNameError("Please enter the name");
    }
    return false;
  };

  let validateDepartment = () => {
    if (primaryInfo.department) {
      setdepartmentError("");
      return true;
    } else {
      setdepartmentError("Select the department");
    }
    return false;
  };

  let validateClientName = () => {
    if (primaryInfo.clientName) {
      setclientNameError("");
      return true;
    } else {
      setclientNameError("Please enter the Client name");
    }
    return false;
  };

  let validateTechnology = () => {
    if (primaryInfo.technology) {
      settechnologyError("");
      return true;
    } else {
      settechnologyError("Select the technology");
    }
    return false;
  };

  // ///validate question at submit
  // let validateQuestionAtSubmit = () => {
  //   for (let index in questions) {
  //     if (questions[index].question) {
  //       setquestionAtSubmitError('');
  //       return true;
  //     } else {
  //       setquestionAtSubmitError('Enter the question');
  //     }
  //     return false;
  //   }
  // }


  // update single questionData
  const updateQuestionData = (event) => {
    setsingleQuestion({
      ...singleQuestion,
      [event.target.name]: event.target.value,
    });
  };

  let validateQuestion = () => {
    if (singleQuestion.question) {
      setquestionError("");
      return true;
    } else {
      setquestionError("Enter the question");
    }
    return false;
  };

  let validateDifficulty = () => {
    if (singleQuestion.difficultyLevel) {
      setdifficultyError("");
      return true;
    } else {
      setdifficultyError("Select the difficulty");
    }
    return false;
  };

  // update SinglequestionData to Questions array

  const updateToQuestionData = () => {
    // validateCandidateName();
    // validateDepartment();
    // validateClientName();
    // validateTechnology();
    // validateQuestion();
    // validateDifficulty();
    // if (validateCandidateName() && validateDepartment() && validateClientName() && validateTechnology() && validateQuestion() && validateDifficulty()) {
    let questionsCopy = [...questions];
    questionsCopy.push(singleQuestion);
    setQuestions([...questionsCopy]);

    setsingleQuestion({
      question: "",
      answer: "",
      difficultyLevel: "",
    });
    // }
  };

  //update question on typing
  const updateQuestionOnTyping = (event, index) => {
    let newquestionsCopy = [...questions];
    newquestionsCopy[index].question = event.target.value;
    setQuestions(newquestionsCopy);
  };

  //update difficulty on typing
  const updateDifficultyOnTyping = (event, index) => {
    let newquestionsCopy = [...questions];
    newquestionsCopy[index].difficultyLevel = event.target.value;
    setQuestions(newquestionsCopy);
  };

  //update answer on typing
  const updateAnswerOnTyping = (event, index) => {
    let newquestionsCopy = [...questions];
    newquestionsCopy[index].answer = event.target.value;
    setQuestions(newquestionsCopy);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col md={12}>
              <div id="header">Upload Your Questions</div>
            </Col>
          </Row>
          <Row className="g-3" /* id="tab-spc" */>
            <Col md={3}>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Candidate Name"
              >
                <Form.Control
                  type="Condidate Name"
                  placeholder="name@example.com"
                  name="candidateName"
                  onChange={(e) => {
                    updatePrimaryData(e);
                  }}
                  value={primaryInfo.candidateName}
                />
                {candidateNameError && (
                  <div className="error_for_home">{candidateNameError}</div>
                )}
              </FloatingLabel>
            </Col>

            <Col md={3}>
              <FloatingLabel controlId="floatingInputGrid" label="Department">
                <Form.Select
                  aria-label="Floating label select example"
                  name="department"
                  onChange={(e) => {
                    updatePrimaryData(e);
                  }}
                  value={primaryInfo.department}
                >
                  <option>Select.....</option>
                  <option value="hr">HR</option>
                  <option value="it">IT</option>
                </Form.Select>
                {departmentError && (
                  <div className="error_for_home">{departmentError}</div>
                )}
              </FloatingLabel>
            </Col>
            <Col md={3}>
              <FloatingLabel controlId="floatingInputGrid" label="Client Name">
                <Form.Control
                  type="Client Name"
                  placeholder="name@example.com"
                  name="clientName"
                  onChange={(e) => {
                    updatePrimaryData(e);
                  }}
                  value={primaryInfo.clientName}
                />
                {clientNameError && (
                  <div className="error_for_home">{clientNameError}</div>
                )}
              </FloatingLabel>
            </Col>
            <Col md={3}>
              <FloatingLabel controlId="floatingInputGrid" label="Technology">
                <Form.Select
                  aria-label="Floating label select example"
                  name="technology"
                  onChange={(e) => {
                    updatePrimaryData(e);
                  }}
                  value={primaryInfo.technology}
                >
                  <option>Select.....</option>
                  <option value="reactjs">ReactJs</option>
                  <option value="vuejs">VueJs</option>
                  <option value="angular">Angular</option>
                  <option value="java">Java</option>
                </Form.Select>
                {technologyError && (
                  <div className="error_for_home">{technologyError}</div>
                )}
              </FloatingLabel>
            </Col>
          </Row>

          {/* display question data */}
          <div>
            {questions.map((data, index) => {
              return (
                <Row key={index} className="g-3">
                  <Col md={9}>
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Question"
                    >
                      <Form.Control
                        type="Question"
                        value={data.question}
                        placeholder="name@example.com"
                        name="question"
                        onChange={(event) => {
                          updateQuestionOnTyping(event, index);
                        }}
                      />
                      {questionAtSubmitError && (
                        <div className="error_for_home">
                          {questionAtSubmitError}
                        </div>
                      )}
                    </FloatingLabel>
                  </Col>
                  <Col md={3}>
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Difficulty Level"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        name="difficultyLevel"
                        onChange={(event) => {
                          updateDifficultyOnTyping(event, index);
                        }}
                        value={data.difficultyLevel}
                      >
                        <option>Select.....</option>
                        <option value="Easy">Easy</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                      </Form.Select>
                      {difficultyAtSubmitError && (
                        <div className="error_for_home">
                          {difficultyAtSubmitError}
                        </div>
                      )}
                    </FloatingLabel>
                  </Col>
                  <Col lg={9}>
                    <FloatingLabel controlId="floatingTextarea" label="Answer">
                      <Form.Control
                        value={data.answer}
                        as="textarea"
                        placeholder="name@example.com"
                        style={{ height: "100px" }}
                        onChange={(event) => {
                          updateAnswerOnTyping(event, index);
                        }}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={3} className="addButton">
                    <Button
                      onClick={() => {
                        sendDelIndex(index);
                        {
                          setisShowDelete(true);
                        }
                      }}
                      className="btnbtn float-end"
                      style={{
                        color: "white",
                        backgroundColor: "#FAA81D",
                        border: "none",
                      }}
                    >
                      <i className="fas fa-trash"></i>&nbsp;Delete
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </div>
          {/* ============================================== */}

          <Row className="g-3">
            <Col md={9}>
              <FloatingLabel controlId="floatingInputGrid" label="Question">
                <Form.Control
                  type="Question"
                  placeholder="name@example.com"
                  name="question"
                  onChange={(event) => {
                    updateQuestionData(event);
                  }}
                  value={singleQuestion.question}
                />
                {questionError && (
                  <div className="error_for_home">{questionError}</div>
                )}
              </FloatingLabel>
            </Col>

            <Col md={3}>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Defficulty Level"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  name="difficultyLevel"
                  onChange={(event) => {
                    updateQuestionData(event);
                  }}
                  value={singleQuestion.difficultyLevel}
                >
                  <option>Select.....</option>
                  <option value="Easy">Easy</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </Form.Select>
                {difficultyError && (
                  <div className="error_for_home">{difficultyError}</div>
                )}
              </FloatingLabel>
            </Col>
            <Col lg={7}>
              <FloatingLabel controlId="floatingTextarea" label="Answer">
                <Form.Control
                  as="textarea"
                  placeholder="name@example.com"
                  style={{ height: "100px" }}
                  name="answer"
                  onChange={(event) => {
                    updateQuestionData(event);
                  }}
                  value={singleQuestion.answer}
                />
              </FloatingLabel>
            </Col>

            <Col md={2} className="delMain">
              {questions[0] && (
                <Button
                  onClick={() => {
                    updateToQuestionData();
                  }}
                  className="btnbtn float-end"
                  style={{
                    color: "white",
                    backgroundColor: "#FAA81D",
                    border: "none",
                  }}
                >
                  <i className=""></i>&nbsp;Delete main
                </Button>
              )}
            </Col>
            <Col md={3} className="addButton">
              <Button
                onClick={() => {
                  updateToQuestionData();
                }}
                className="btnbtn float-end"
                style={{
                  color: "white",
                  backgroundColor: "#FAA81D",
                  border: "none",
                }}
              >
                <i className="fal fa-plus-circle"></i>&nbsp;Add New
              </Button>
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={12} className="submitButton">
              <Button
                className="sub float-end "
                style={{
                  color: "white",
                  backgroundColor: "#FAA81D",
                  border: "none",
                }}
                onClick={() => {
                  updateToMergeState();
                }}
                // onClick={() => {
                //   updateOnSubmit();
                // }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
      {isShowDelete && (
        <DeleteConfirmation
          setisShowDelete={setisShowDelete}
          delIndex={delIndex}
          getDeleteDataIndex={getDeleteDataIndex}
        />
      )}
      {isShowSubmitModal && (
        <SubmitModal setisShowSubmitModal={setisShowSubmitModal} />
      )}
    </div>
  );
}
export default Home;
