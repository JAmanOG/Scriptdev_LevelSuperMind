
import React, { createContext, useContext, useState, useEffect } from "react";

const ApiContext = createContext();

export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKeyState] = useState('');

  // Load the API key from localStorage when the component mounts
  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      setApiKeyState(storedApiKey);
    }
  }, []);

  // Update the state and localStorage whenever the API key changes
  const setApiKey = (key) => {
    setApiKeyState(key);
    localStorage.setItem("apiKey", key);
  };

  return (
    <ApiContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
