import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import InterviewSteps from "../components/InterviewSteps";
import Context from "../context";

const InvitationInterview = () => {
  const { token } = useParams();
  const {  fetchCandidateDetails } =
    useContext(Context);

  useEffect(() => {
    const load = async () => {
      await fetchCandidateDetails(token);
    };

    load();
  }, []);

  return <InterviewSteps />;
};

export default InvitationInterview;
