import React, { useContext, useState } from "react";
import Context from "../../context";

const ConfirmAudioStep = ({ step, setStep }) => {
  const [checkCam, setCheckCam] = useState(false);
  const [checkTerms, setCheckTerms] = useState(false);
  const [checkNet, setCheckNet] = useState(false);
  
  return (
    <div className="my-5">
      <p>
        This video interview will last 4-9 mins. Before proceeding check your
        internet connectivity, webcam and audio settings
      </p>

      <div className="d-flex justify-content-center mb-3 mt-2">
        <button className="btn btn-outline-primary checkCam">
          Check Camera & Audio
        </button>
      </div>
      <p>Please confirm the following before you proceed</p>
      <div className="d-flex align-items-center">
        <input
          id="internet"
          type="checkbox"
          name=""
          checked={checkNet}
          onChange={e=>setCheckNet(e.target.checked)}
          className="form-controll mt-1 mx-3"
        />
        <label htmlFor="internet" className="py-0 m-0 mx-2">
          I have a stable internet connection
        </label>
      </div>
      <div className="d-flex align-items-center my-2">
        <input
          id="check"
          type="checkbox"
          name=""
          checked={checkCam}
          onChange={e=>setCheckCam(e.target.checked)}
          className="form-controll mt-1 mx-3"
        />
        <label htmlFor="check" className="py-0 m-0 mx-2">
          I have checked my camera and audio
        </label>
      </div>
      <div className="d-flex align-items-center">
        <input
          id="terms"
          type="checkbox"
          name=""
          checked={checkTerms}
          onChange={e=>setCheckTerms(e.target.checked)}
          className="form-controll mt-1 mx-3"
        />
        <label htmlFor="terms" className="py-0 m-0 mx-2">
          I have read and understood all <a href="#d">terms and conditions</a>{" "}
          and agree with them all
        </label>
      </div>

      <div className="d-flex justify-content-center mb-3 mt-5">
        <button
        disabled={checkTerms && checkNet && checkCam ? false: true}
          onClick={() => setStep(step + 1)}
          className="btn btn-primary checkCam"
        >
          Proceed To The Practice Interview
        </button>
      </div>
    </div>
  );
};

export default ConfirmAudioStep;
