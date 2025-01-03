import React, { useState } from "react";
import { Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useApi } from "@/hook/APIContext";
import { useNavigate } from "react-router-dom";

const PromptChat = ({ onSend }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { apiKey } = useApi();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      navigate('/HomePage')
      setInput("");
    }
  };

  if (!apiKey) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <Card className="w-full max-w-2xl p-4 rounded-lg shadow-xl bg-white">
          <CardContent className="p-4">
            <h1 className="text-2xl font-semibold text-center">
              Please enter your API key to continue
            </h1>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => navigate("/")}
            >
              <span>Go back</span>
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
      <div>
        <div>

        <h1 className="text-2xl font-semibold text-center">
          Please enter your prompt to continue
        </h1>
        <span className="text-center text-gray-500 mb-2">
          eg. can you provide me the comparsion of post type as image and
          carousel{" "}
        </span>
        </div>
        
        <br />
      <Card className="w-full max-w-2xl p-4 rounded-lg shadow-xl bg-white">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your prompt here..."
              className="min-h-[60px] flex-1 bg-gray-50 border p-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default PromptChat;
