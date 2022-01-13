import React from "react";

const SuccessStep = () => {
  return (
    <div>
      <h1 className="text-center">Well done</h1>
      <p className="my-4 text-center">You have completed your interview</p>

      <div className="d-flex justify-content-center">
        <button
          // onClick={submitInterviewAnswers}
          className="btn text-center btn-success"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default SuccessStep;
