import React, { useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowUp } from 'lucide-react';
import { useApi } from '@/hook/APIContext';
import { useNavigate } from 'react-router-dom';
import { ChaiGlass } from './chaiCup';
import Outputjson from '@/Outputjson';

const StatsCard = ({ title, value, percentageIncrease, color }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`flex items-center gap-1 text-sm ${color}`}>
          <ArrowUp className="w-4 h-4" />
          <span>{percentageIncrease}%</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const colorClasses = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-800" },
  blue: { bg: "bg-blue-50", text: "text-blue-800" },
  purple: { bg: "bg-purple-50", text: "text-purple-800" },
  amber: { bg: "bg-amber-50", text: "text-amber-800" },
  rose: { bg: "bg-rose-50", text: "text-rose-800" },
};

const parseInsightsAndConclusion = (input) => {
  const insightsPattern = /### Engagement Differences:\n([\s\S]*?)\n\n### Conclusion:/;
  const conclusionPattern = /### Conclusion:\n([\s\S]*)/;

  const insightsMatch = input.match(insightsPattern);
  const conclusionMatch = input.match(conclusionPattern);

  const insights = insightsMatch
    ? insightsMatch[1]
        .trim()
        .split("\n")
        .map(line =>
          line
            .replace(/^-\s*/, "") // Remove leading `- `
            .replace(/\*\*/g, "") // Remove `**`
            .trim()
        )
    : [];

  const conclusion = conclusionMatch
    ? conclusionMatch[1].replace(/\*\*/g, "").trim() // Remove `**`
    : "";
  return { insights, conclusion };
};

const BackupparseInsightsAndConclusion = (input) => {
  const insightsPattern = /### Insights:\n([\s\S]*?)\n\n### Conclusion:/;
  const conclusionPattern = /### Conclusion:\n([\s\S]*)/;

  const insightsMatch = input.match(insightsPattern);
  const conclusionMatch = input.match(conclusionPattern);

  const insights = insightsMatch
    ? insightsMatch[1]
        .trim()
        .replace(/^-\s*/gm, "") // Remove leading dashes and spaces
        .replace(/\*\*/g, "") // Remove all `**` for bold formatting
    : "";
  
  const conclusion = conclusionMatch
    ? conclusionMatch[1].replace(/\*\*/g, "").trim() // Remove `**` from conclusion as well
    : "";

  return { insights, conclusion };
};

const Backupfinal = (input) => {
  const insightsPattern = /### Insights:([\s\S]*?)(### Conclusion:|$)/;

  const conclusionPattern = /### Conclusion:([\s\S]*)/;

  const insightsMatch = input.match(insightsPattern);
  const conclusionMatch = input.match(conclusionPattern);

  const insights = insightsMatch
    ? insightsMatch[1]
        .trim()
        .split(",")
        .map(line =>
          line
            .replace(/^\s*:/, "")
            .replace(/\*\*/g, "")
            .trim()
        )
        .filter(line => line.length > 0)
    : [];

  const conclusion = conclusionMatch
    ? conclusionMatch[1].replace(/\*\*/g, "").trim() 
    : "";

  return { insights, conclusion };
};


const parseEngagementData = (input) => {
  const patterns = {
    static: /### Static Image Posts:[\s\S]*?-\s\*\*Average Likes:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Comments:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Shares:\*\*\s(\d+)/,
    carousel: /### Carousel Posts:[\s\S]*?-\s\*\*Average Likes:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Comments:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Shares:\*\*\s(\d+)/,
    reel: /### Reels:[\s\S]*?-\s\*\*Average Likes:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Comments:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Shares:\*\*\s(\d+)/
  };

  const data = Object.entries(patterns).reduce((acc, [key, pattern]) => {
    const match = input.match(pattern);
    if (match) {
      acc[key] = {
        likes: parseInt(match[1]),
        comments: parseInt(match[2]),
        shares: parseInt(match[3])
      };
    }
    return acc;
  }, {});

  const comparisonData = ['likes', 'comments', 'shares'].map((metric) => ({
    name: metric.charAt(0).toUpperCase() + metric.slice(1),
    ...Object.keys(data).reduce((acc, key) => {
      acc[key] = data[key][metric] || 0;
      return acc;
    }, {})
  }));

  const engagementData = comparisonData.map(({ name, ...values }) => ({
    name,
    value: Object.values(values).reduce((sum, v) => sum + v, 0)
  }));

  return { comparisonData, engagementData };
};

const AnalyticsDashboard = () => {
  const { apiKey } = useApi();
  const navigate = useNavigate();

  const dataState = useMemo(() => {
    const savedData = localStorage.getItem("dataState");
    return savedData ? JSON.parse(savedData) : null;
  }, []);

  const messageText = dataState['outputs'][0]['outputs'][0]['results']['message']['text'];
  console.log("Message Text:", messageText);
  const result = parseInsightsAndConclusion(messageText);


  const { comparisonData, engagementData } = parseEngagementData(messageText);
  console.log("Result:", result);

  const bresult = BackupparseInsightsAndConclusion(messageText);
console.log(bresult);

  const bfinal = Backupfinal(messageText);
  console.log(bfinal);
  if (result.insights.length === 0|| result.insights.length < 3) { 
    result.insights = bresult.insights.split("\n");
    result.conclusion = bresult.conclusion;
  }
  
  
  if (result.insights.length < 3) { 
    result.insights = bfinal.insights.split("\n");
    result.conclusion = bfinal.conclusion;
  }

  // console.log("Engagement Data:", engagementData);
  const colors = ['emerald', 'blue', 'purple', 'amber', 'rose'];
  const COLORS = ['#F7D3B2', '#2C2C2C', '#6A8A82'];
  
  if (!apiKey) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <Card className="w-full max-w-2xl p-4 rounded-lg shadow-xl bg-white">
          <CardContent className="p-4">
            <h1 className="text-2xl font-semibold text-center">Please enter your API key to continue</h1>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => navigate('/')}
            >
              <span>Go back</span>
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-4 bg-gray-50 min-h-screen">
      <div className="max-w-8xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-500 mt-1">Performance comparison between post types</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {engagementData.map((item) => (
            <StatsCard
              key={item.name}
              title={`Total ${item.name}`}
              value={item.value.toString()}
              percentageIncrease="100"
              color="text-emerald-500"
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">Engagement Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {Object.keys(comparisonData[0]).filter(key => key !== 'name').map((key, index) => (
                      <Bar key={key} dataKey={key} name={`${key.charAt(0).toUpperCase() + key.slice(1)} Posts`} fill={COLORS[index]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* ChaiGlass Component */}
          <Card>
            <CardContent className="p-6">
              <ChaiGlass />
            </CardContent>
          </Card>

          {/* Donut Chart */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">Engagement Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementData}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  {engagementData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-sm text-gray-600">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Key Insights
              </h3>
              <div className="space-y-4">
                {result.insights.map((insight, index) => {
                  const color = colors[index % colors.length];
                  return (
                    <div 
                      key={index} 
                      className={`p-4 ${colorClasses[color].bg} rounded-lg`}
                    >
                      <p className={`${colorClasses[color].text}`}>{insight}</p>
                    </div>
                  );
                })}
                <div className="p-4 bg-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-700">Conclusion</h4>
                  <p className="text-gray-600 mt-1">{result.conclusion}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;