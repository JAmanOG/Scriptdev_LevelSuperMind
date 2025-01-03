import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Subcomponent/layout";
import Overview from "./Subcomponent/overview";
import { NotFound } from "./Subcomponent/NotFound.jsx";
import AnalyticsDashboard from "./anaylatics";
import Settings from "./Subcomponent/Setting";
// import Reports from "./Subcomponent/reports";

const Homepage = ({ prompt }) => {
  const Token = "AstraCS:PTHYKJbrTJHxWPoISNNOrzoR:c2331dc003818b31bc690eaf74641b0e1c43b5c201a1b4a36d066c239d48975f";
  const [dataState, setDataState] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const apiKey = localStorage.getItem("apiKey");

  React.useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      if (!prompt) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:4000/proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`,
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
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const result = await response.json();
        if (isMounted) {
          setDataState(result);
          setError(null);
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

    dataState && console.log(dataState);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [prompt, apiKey]);

  // if (!prompt) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <h1 className="text-2xl">Loading...</h1>
  //     </div>
  //   );
  // }

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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview prompt={prompt} dataState={dataState} isLoading={isLoading} />} />
        <Route path="analytics" element={<AnalyticsDashboard prompt={prompt} dataState={dataState} />} />
        {/* <Route path="reports" element={<Reports/>} /> */}
        <Route path="settings" element={<Settings prompt={prompt} dataState={dataState} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Homepage;
