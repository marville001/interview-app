import { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    blobs: [],
    videos: [],
  });
  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
};

export const ContextConsumer = Context.Consumer;
export default Context;
