import React from "react";
import { Row } from "react-bootstrap";
// import { Card, Row } from "react-bootstrap";
// import './Search__page.css'
import "./Posts.css";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {posts.map((value, index) => {
        return value.questions.map((value, index) => {
          return (
            <Row
              className="myRow"
              style={{ borderBottom: "1px solid #00000029" }}
            >
              <b>
                <span key={index} className="Ques">
                  {" "}
                  {value.question}
                </span>
              </b>
              <p key={index} className="Answ">
                {value.answer}
              </p>
            </Row>
          );
        });
      })}
    </div>
  );
};

export default Posts;
