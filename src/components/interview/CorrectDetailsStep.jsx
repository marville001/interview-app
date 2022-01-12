import React, { useContext, useState } from "react";
import Context from "../../context";

const CorrectDetailsStep = ({ step, setStep }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { addCandidate, state } = useContext(Context);

  const handleSubmitDetails = async () => {
    if (email === "" || name === "" || phone === "") {
      alert("All fields are required");
      return;
    }

    let emailRegEx =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!email.match(emailRegEx)) {
      alert("Invalid email");
      return;
    }

    console.log(state);

    let {
      interview: { _id },
    } = state;

    const obj = {
      name: name,
      email: email,
      phone: phone,
      additionalDetails: "Test Data",
      interviewId: _id,
      deadline: "15/01/2022",
    };

    await addCandidate(obj);
  };

  console.log({state});

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

      <div className="my-4">
        <h6>Please update your details below to continue</h6>
        {state.loading ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            {state?.candidate?._id ? (
              <div>
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
              </div>
            ) : (
              <div className="form col col-12 col-sm-10 col-md-8 col-lg-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="examble@gmail.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone number
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control"
                    placeholder="+13456677777"
                  />
                </div>
                <div className="form-group mt-3">
                  <button
                    onClick={handleSubmitDetails}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

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
        disabled={!state?.candidate?._id || !state?.interview?._id ? true : false}
        onClick={() => setStep(step + 1)}
        className="btn btn-success"
      >
        Continue
      </button>
    </div>
  );
};

export default CorrectDetailsStep;
