import React, { useState } from "react";
import { Send, Image, Film, Images } from 'lucide-react';
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
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header Section */}
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-gray-700">
              Choose Your Post Type
            </h2>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <Image className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Static Image</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <Images className="h-5 w-5 text-purple-500" />
                <span className="text-sm">Carousel</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <Film className="h-5 w-5 text-pink-500" />
                <span className="text-sm">Reels</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Enter Your Prompt
            </h1>
            <p className="text-gray-600">
              Example: "Compare the engagement rates of static images and carousel posts"
            </p>
          </div>
        </div>

        {/* Input Card */}
        <Card className="overflow-hidden border-0 shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your prompt here..."
                className="min-h-[120px] resize-none rounded-xl border-gray-200 bg-gray-50 p-4 text-lg shadow-inner focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!input.trim()}
                  className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
                >
                  <span>Send</span>
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PromptChat;
