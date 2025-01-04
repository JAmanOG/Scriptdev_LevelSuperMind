import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ComparisonCard from "./Comparisoncard";
import { useApi } from "@/hook/APIContext";
import { useNavigate } from "react-router-dom";
import Outputjson from "@/Outputjson";

const Overview = ({ prompt }) => {
  const { apiKey } = useApi();
  const navigate = useNavigate();
  const dataState = React.useMemo(() => {
    const savedData = localStorage.getItem("dataState");
    return savedData ? JSON.parse(savedData) : null;
  }, []);

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

  const message_text = dataState?.outputs?.[0]?.outputs?.[0]?.results?.message?.text || '';
  console.log(message_text);

  function parseEngagementData(message_text) {
    const result = {};

    // Extract data for Static Image Posts
    const staticMatch = message_text.match(
      /### Static Image Posts:\n- \*\*Average Likes:\*\* (\d+)\n- \*\*Average Comments:\*\* (\d+)\n- \*\*Average Shares:\*\* (\d+)/
    );
    if (staticMatch) {
      result.staticImage = {
        "Average Likes": parseInt(staticMatch[1], 10),
        "Average Comments": parseInt(staticMatch[2], 10),
        "Average Shares": parseInt(staticMatch[3], 10),
      };
    }

    // Extract data for Carousel Posts
    const carouselMatch = message_text.match(
      /### Carousel Posts:\n- \*\*Average Likes:\*\* (\d+)\n- \*\*Average Comments:\*\* (\d+)\n- \*\*Average Shares:\*\* (\d+)/
    );
    if (carouselMatch) {
      result.carousel = {
        "Average Likes": parseInt(carouselMatch[1], 10),
        "Average Comments": parseInt(carouselMatch[2], 10),
        "Average Shares": parseInt(carouselMatch[3], 10),
      };
    }

    // Extract data for Reels
    const reelMatch = message_text.match(
      /### Reels:\n- \*\*Average Likes:\*\* (\d+)\n- \*\*Average Comments:\*\* (\d+)\n- \*\*Average Shares:\*\* (\d+)/
    );
    if (reelMatch) {
      result.reels = {
        "Average Likes": parseInt(reelMatch[1], 10),
        "Average Comments": parseInt(reelMatch[2], 10),
        "Average Shares": parseInt(reelMatch[3], 10),
      };
    }

    return result;
  }

  const engagementData = parseEngagementData(message_text);

  const availableTypes = Object.keys(engagementData);

  const chartData = ["Likes", "Comments", "Shares"].map((metric) => {
    const dataPoint = { name: metric };
    availableTypes.forEach((type) => {
      dataPoint[type] = engagementData[type]?.[`Average ${metric}`] || 0;
    });
    return dataPoint;
  });
  

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {availableTypes.map((type) => (
              <ComparisonCard
                key={type}
                title={`${type.charAt(0).toUpperCase() + type.slice(1)} Posts`}
                metrics={engagementData[type]}
              />
            ))}
          </div>

          {/* Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Engagement Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {availableTypes.map((type, index) => (
                    <Bar
                      key={type}
                      dataKey={type}
                      name={`${type.charAt(0).toUpperCase() + type.slice(1)}`}
                      fill={["#F7D3B2", "#2C2C2C" , "#6A8A82"][index] || "#000"}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
