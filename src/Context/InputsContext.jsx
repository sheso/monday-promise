import { createContext, useState } from "react";

export const InputsContext = createContext();

export const InputsProvider = ({ children }) => {
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const changeRegisterHandler = (e) => {
    console.log(inputs);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const changeLoginHandler = (e) => {
    console.log(loginData);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <InputsContext.Provider
      value={{
        inputs,
        changeRegisterHandler,
        changeLoginHandler,
        loginData,
      }}
    >
      {children}
    </InputsContext.Provider>
  );
};
