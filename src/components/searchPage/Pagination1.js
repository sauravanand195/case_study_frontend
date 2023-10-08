/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import "./Pagination1.css";

function Pagination1({ pages, setCurrentPage }) {
  //Set number of pages
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const numberOfPages = [];
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  // Current active button number
  const [currentButton, setCurrentButton] = useState(1);

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if (currentButton > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentPage(currentButton);
  }, [ currentButton]);

  return (
    <div className="footer" >
      <div className="pagination-container">
        <a id="button"
          href="#"
          className={`${currentButton === 1 ? "disabled" : ""}`}
          onClick={() =>
            setCurrentButton((prev) => (prev <= 1 ? prev : prev - 1))
          }
        >
          Prev
        </a>

        {arrOfCurrButtons.map((item, index) => {
          return (
            <a
              href="#"
              key={index}
              className={`${currentButton === item ? "active" : ""}`}
              onClick={() => setCurrentButton(item)}
            >
              {item}
            </a>
          );
        })}

        <a id="button"
          href="#"
          className={`${
            currentButton === numberOfPages.length ? "disabled" : ""
          }`}
          onClick={() =>
            setCurrentButton((prev) =>
              prev >= numberOfPages.length ? prev : prev + 1
            )
          }
        >
          Next
        </a>
      </div>
    </div>
  );
}

export default Pagination1;
