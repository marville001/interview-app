import axios from "axios";
import { createContext, useEffect, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    loading: false,
    blobs: [],
    videos: [],
    candidate: {},
    interview: {},
    initials: "",
  });

  const addCandidate = async (details) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const { data } = await axios.post(
        "https://my-interview-api.herokuapp.com/api/candidate",
        details
      );
      setState((prev) => ({
        ...prev,
        candidate: data.candidate,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      console.log({ error });
    }
  };

  const submitInterviewAnswers = async (blobs) => {
    console.log({ blobs });
    try {
      let formData = new FormData();

      for (let blob of blobs) {
        formData.append("files", blob);
      }

      setState((prev) => ({ ...prev, loading: true }));
      const { data } = await axios.post(
        `https://my-interview-api.herokuapp.com/api/candidate/submit_answers/${state.interview._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log({ data });
      setState((prev) => ({
        ...prev,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      console.log({ error });
    }
  };

  const fetchInterviewDetails = async (token) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const { data } = await axios.get(
        `https://my-interview-api.herokuapp.com/api/interview/get/${token}`
      );
      setState((prev) => ({
        ...prev,
        interview: data.interview,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      console.log({ error });
    }
  };

  const fetchCandidateDetails = async (token) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const { data } = await axios.get(
        `https://my-interview-api.herokuapp.com/api/candidate/invite/${token}`
      );
      setState((prev) => ({
        ...prev,
        candidate: data.candidate,
        interview: data.candidate.interviewId,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      console.log({ error });
    }
  };

  useEffect(() => {}, []);
  return (
    <Context.Provider
      value={{
        state,
        setState,
        addCandidate,
        fetchInterviewDetails,
        fetchCandidateDetails,
        submitInterviewAnswers,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const ContextConsumer = Context.Consumer;
export default Context;
