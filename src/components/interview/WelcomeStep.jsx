import React, { useContext } from "react";
import Context from "../../context";

const WelcomeStep = ({ step, setStep }) => {
  const { state } = useContext(Context);

  return (
    <div className="mt-3">
      <p>Hi There</p>
      <p>
        Thank you for using our platform. We welcome you to our website and hope
        you have a great experience
      </p>
      <p>
        Before proceeding to your scheduled video interview, please verify your
        following personal information
      </p>
      {state.loading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <table className="my-4">
          <tr>
            <td>
              <h6>Name</h6>
            </td>
            <td className="px-3">
              <h6>{state?.candidate?.name}</h6>
            </td>
          </tr>
          <tr>
            <td>
              <h6>Email</h6>
            </td>
            <td className="px-3">
              <h6>{state?.candidate?.email}</h6>
            </td>
          </tr>
          <tr>
            <td>
              <h6>Phone</h6>
            </td>
            <td className="px-3">
              <h6>{state?.candidate?.phone}</h6>
            </td>
          </tr>
          <tr>
            <td>
              <h6>Interview Title</h6>
            </td>
            <td className="px-3">
              <h6>{state?.interview?.title}</h6>
            </td>
          </tr>
        </table>
      )}
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

      <button
        disabled={
          !state?.candidate?._id || !state?.interview?._id ? true : false
        }
        onClick={() => setStep(step + 1)}
        className="btn btn-success"
      >
        Continue
      </button>
    </div>
  );
};

export default WelcomeStep;
