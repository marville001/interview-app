import React from "react";

const PracticeInterviewStep = ({ step, setStep }) => {
  return (
    <div className="my-3">
      <p>
        Interview for #546673. This is the practice session and is not part of
        your actual interview. You can practice as many tims as you want.
      </p>

      <div className="quiz-container">
        <div className="quiz-row">
          <div className="p-2">
            <span style={{ fontWeight: "bold" }}>Question 1</span>
            <h6>Temm me about yourself? </h6>
          </div>
          <div className="cam-container">Camera</div>
        </div>
        <h6>
          Time left <strong className="mx-2">56 minutes</strong>
        </h6>
      </div>

      <div className="d-flex align-items-center justify-content-center mb-3 mt-5">
        <input type="checkbox" className="check-box" />
        <button className="btn btn-primary">
          Next Question
        </button>
      </div>
    </div>
  );
};

export default PracticeInterviewStep;
