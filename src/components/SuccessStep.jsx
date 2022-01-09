import React, { useContext } from "react";
import Context from "../context";

const SuccessStep = () => {
  const { state } = useContext(Context);

  const handleExit = async () => {
    
    // localStorage.setItem("videos", state.videos);
  };

  return (
    <div>
      <h1 className="text-center">Well done</h1>
      <h5>{state?.videos?.length}</h5>
      <p className="my-4 text-center">You have completed your interview</p>

      <div className="d-flex justify-content-center">
        <button onClick={handleExit} className="btn text-center btn-success">
          Done
        </button>
      </div>

      {state?.videos?.map(({ blob, interviewId, questionId }, i) => (
        <div className="mt-5" key={`video_${i}`}>
          <h4>
            Interview {interviewId} - question {Number(questionId) + 1}
          </h4>
          <video
            style={{ width: 500 }}
            src={window.URL.createObjectURL(blob)}
            autoPlay
            loop
          />
          <div>
            <button onClick={() => this.deleteVideo(blob)}>Delete</button>
            <a href={window.URL.createObjectURL(blob)}>Download</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuccessStep;
