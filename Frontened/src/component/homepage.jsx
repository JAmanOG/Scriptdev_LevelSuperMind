import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Subcomponent/layout";
import Overview from "./Subcomponent/overview";
import { NotFound } from "./Subcomponent/NotFound.jsx";
import AnalyticsDashboard from "./anaylatics";
import Settings from "./Subcomponent/Setting";
import Reports from "./Subcomponent/reports";

const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="loader"></div>
    <p className="text-gray-600 ml-4">Loading...</p>
  </div>
);
const Homepage = ({ prompt }) => {
  const [dataState, setDataState] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const apiKey = localStorage.getItem("apiKey");

  const dataValue = React.useMemo(() => {
    const savedData = localStorage.getItem("dataState");
    return savedData ? JSON.parse(savedData) : null;
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
  
    const fetchData = async () => {
      if (!prompt) return;
  
      setIsLoading(true);
      setError(null);
      const Token = 'AstraCS:PTHYKJbrTJHxWPoISNNOrzoR:c2331dc003818b31bc690eaf74641b0e1c43b5c201a1b4a36d066c239d48975f';
  
      try {
        const response = await fetch('https://hackathonlevelsupermind.azurewebsites.net/proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token||''}`,
          },
          body: JSON.stringify({
            input_value: JSON.stringify(prompt),
            output_type: "chat",
            input_type: "chat",
            tweaks: {
              "Prompt-wQnSt": {},
              "TextInput-iR7YN": apiKey || '',
              "ChatInput-k6qu8": {},
              "Agent-ptTw4": {},
              "AstraDBToolComponent-zQkdJ": {},
              "ChatOutput-zLHas": {},
              "ParseData-s5QTR": {},
              "TextOutput-0j1yW": {},
            },
          }),
          signal: controller.signal,
        });
  
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
  
        const result = await response.json();
        if (isMounted) {
          setDataState(result);
          setError(null);
  
          // Update localStorage with the fetched data
          localStorage.setItem("dataState", JSON.stringify(result));
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        if (isMounted) {
          setError(err.message);
          console.error('Fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [prompt, apiKey]);
  

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <h1 className="text-2xl text-red-500">Error: {error}</h1>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {dataState || dataValue ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview prompt={prompt} dataState={dataState} isLoading={isLoading} />} />
            <Route path="analytics" element={<AnalyticsDashboard prompt={prompt} dataState={dataState} isLoading={isLoading} />} />
            <Route path="reports" element={<Reports prompt={prompt} dataState={dataState} isLoading={isLoading} />} />
            <Route path="settings" element={<Settings prompt={prompt} dataState={dataState} isLoading={isLoading} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Homepage;
