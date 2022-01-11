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
  });

  const addCandidate = async (details) => {
    try {
      setState({ loading: true });
      const { data } = await axios.post(
        "https://my-interview-api.herokuapp.com/api/candidate",
        details
      );
      setState({ candidate: data.candidate, loading: false });
    } catch (error) {
      setState({ loading: false });
      console.log({ error });
    }
  };

  const fetchInterviewDetails = async (token) => {
    try {
      setState({ loading: true });
      const { data } = await axios.get(
        `https://my-interview-api.herokuapp.com/api/interview/get/${token}`
      );
      setState({ interview: data.interview, loading: false });
    } catch (error) {
      setState({ loading: false });
      console.log({ error });
    }
  };

  const fetchCandidateDetails = async (token) => {
    try {
      setState({ loading: true });
      const { data } = await axios.get(
        `https://my-interview-api.herokuapp.com/api/candidate/invite/${token}`
      );
      setState({
        candidate: data.candidate,
        interview: data.candidate.interviewId,
        loading: false,
      });
    } catch (error) {
      setState({ loading: false });
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const ContextConsumer = Context.Consumer;
export default Context;
