import { createContext, useState } from "react";

export const InputsContext = createContext();

export const InputsProvider = ({ children }) => {
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

  const [login, setLogin] = useState({ email: "", password: "" });

  const changeRegisterHandler = (e) => {
    console.log(inputs);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const changeLoginHandler = (e) => {
    console.log(login);
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <InputsContext.Provider
      value={{
        inputs,
        changeRegisterHandler,
        changeLoginHandler,
        login,
      }}
    >
      {children}
    </InputsContext.Provider>
  );
};
