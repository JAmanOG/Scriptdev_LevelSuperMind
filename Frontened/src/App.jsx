import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Outputjson from "../Outputjson";
import { parse } from "postcss";
import ApikeyPrompt from "./component/ApikeyPrompt";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./component/HomePage";
import {ChaiGlass} from "./component/chaiCup.jsx";
import PromptChat from "./component/Subcomponent/Prompt";
import { ApiKeyProvider } from "../hook/APIContext";

function App() {
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleSendPrompt = (prompt) => {
    setCurrentPrompt(prompt); // Update the current prompt
  };

  return (
    <>
      <ApiKeyProvider>
      <Router>
        <Routes>
        <Route exact path="/" element={<ApikeyPrompt />} />
        <Route path="/prompt" element={<PromptChat onSend={handleSendPrompt} />} />
        <Route path="/HomePage/*" element={<HomePage prompt={currentPrompt} />} /> {/* Add trailing /* */}
        <Route path="/ChaiCup" element={<ChaiGlass />} />
        </Routes>
      </Router>
      </ApiKeyProvider>,

    </>
  );
}

export default App;
