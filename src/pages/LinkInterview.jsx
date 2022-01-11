import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import InterviewSteps from "../components/InterviewSteps";
import Context from "../context";

const LinkInterview = () => {
  const { token } = useParams();
  const { fetchInterviewDetails } = useContext(Context);

  useEffect(() => {
    const load = async () => {
      await fetchInterviewDetails(token);
    };

    load();
  }, []);
  return <InterviewSteps form={true} />;
};

export default LinkInterview;
