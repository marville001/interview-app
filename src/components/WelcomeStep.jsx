import React, { useEffect, useState } from "react";

const WelcomeStep = ({ step, setStep }) => {
  const [video, setVideo] = useState({});
  useEffect(() => {
    const vs = localStorage.getItem("videos");
    console.log(vs);
    if (vs.length > 1) {
      // setVideo(vs[0]);
    }
  }, []);

  return (
    <div className="mt-3">
      <p>Hi There</p>
      {video.blob && (
        <video
          style={{ width: 500 }}
          src={window.URL.createObjectURL(new Blob(video.blob))}
          autoPlay
          loop
        />
      )}
      <p>
        Thank you for using our platform. We welcome you to our website and hope
        you have a great experience
      </p>
      <p>
        Before proceeding to your scheduled video interview, please verify your
        following personal information
      </p>
      <table className="my-4">
        <tr>
          <td>
            <h6>Name</h6>
          </td>
          <td className="px-3">
            <h6>Martin Mwangi</h6>
          </td>
        </tr>
        <tr>
          <td>
            <h6>Email</h6>
          </td>
          <td className="px-3">
            <h6>mwangitttttttttttttt@gmail.com</h6>
          </td>
        </tr>
        <tr>
          <td>
            <h6>Position</h6>
          </td>
          <td className="px-3">
            <h6>Developer</h6>
          </td>
        </tr>
        <tr>
          <td>
            <h6>Company</h6>
          </td>
          <td className="px-3">
            <h6>HGHGHGH GGH</h6>
          </td>
        </tr>
      </table>
      <div className="d-flex align-items-center">
        <input
          id="check"
          type="checkbox"
          name=""
          className="form-controll mt-1"
        />
        <label htmlFor="check" className="py-0 m-0 mx-2">
          I verify that the above information is correct
        </label>
      </div>
      <div className="d-flex mt-3 align-items-center">
        <h6 className="">Deadline:</h6>
        <h6>
          <span className="mx-3 ">01/01/2020 - 11:59:59 Central Time</span>
        </h6>
      </div>
      <p>
        This is the date untill when you should complete and submit your video
        ineterview
      </p>

      <button onClick={() => setStep(step + 1)} className="btn btn-success">
        Continue
      </button>
    </div>
  );
};

export default WelcomeStep;
