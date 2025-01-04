const Homepage = ({ prompt }) => {
  const [dataState, setDataState] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const apiKey = localStorage.getItem("apiKey");

  // Use useMemo for saved data
  const dataValue = React.useMemo(() => {
    const savedData = localStorage.getItem("dataState");
    return savedData ? JSON.parse(savedData) : null;
  }, []);

  React.useEffect(() => {
    if (!prompt) return;
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch('https://hackathonlevelsupermind.azurewebsites.net/proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.Token || ''}`,
          },
          body: JSON.stringify({
            input_value: JSON.stringify(prompt),
            output_type: "chat",
            input_type: "chat",
            tweaks: { /* Your tweaks */ },
          }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Failed to fetch, status: ${response.status}`);

        const result = await response.json();
        if (isMounted) {
          setDataState(result);
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