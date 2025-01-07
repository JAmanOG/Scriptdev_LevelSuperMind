import React from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import Layout from "./Subcomponent/layout";
import Overview from "./Subcomponent/overview";
import { NotFound } from "./Subcomponent/NotFound.jsx";
import AnalyticsDashboard from "./anaylatics";
import Settings from "./Subcomponent/Setting";
import Reports from "./Subcomponent/reports";

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="relative space-y-6">
        {/* Flowing Waves */}
        <div className="flex items-center justify-center">
          <div className="relative h-16 w-64 overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="z-10 text-lg font-medium text-indigo-600">Processing Data</span>
            </div>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute h-16 w-64 animate-[flow_3s_ease-in-out_infinite] bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 opacity-30"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  transform: 'translateX(-50%)',
                  left: '50%'
                }}
              />
            ))}
          </div>
        </div>

        {/* Flowing Circles */}
        <div className="flex items-center justify-center space-x-4">
          <div className="relative h-12 w-12">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-[ripple_2s_ease-out_infinite]"
                style={{
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
          <span className="text-lg font-medium text-gray-600">Analyzing</span>
        </div>

        {/* Flowing Particles */}
        <div className="relative h-16 w-64 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="z-10 text-lg font-medium text-white">Computing</span>
          </div>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white opacity-50 animate-[particle_2s_linear_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes flow {
            0% { transform: translateX(-50%) translateY(0) scaleX(1.5); }
            50% { transform: translateX(-50%) translateY(2px) scaleX(1.7); }
            100% { transform: translateX(-50%) translateY(0) scaleX(1.5); }
          }
          @keyframes ripple {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
          }
          @keyframes particle {
            0% { transform: translateY(100%) translateX(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100%) translateX(20px); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
};

const Homepage = ({ prompt }) => {
  const [dataState, setDataState] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const apiKey = localStorage.getItem("apiKey");
  const navigate = useNavigate();

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
          throw new Error(`Request failed: ${response.status && response.detail|| response.status}`);
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
        <h2>Check your GPT API key and try again.</h2>
        <button
          onClick={()=>navigate('/api')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        > 
          Go to API Page
        </button>
        
        <button
          onClick={()=>navigate('/prompt')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          To Prompt Page
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
