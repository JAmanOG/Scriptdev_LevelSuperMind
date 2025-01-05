import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const AnalyticsDashboard = () => {
    const navigate = useNavigate();
  const data = [
    {
      type: "Video Posts",
      interactions: 892,
      engagementRate: 47,
    },
    {
      type: "Image Posts",
      interactions: 607,
      engagementRate: 32,
    },
  ];

  return (
    <div id="root">
      <section className="py-20 bg-neutral-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See Our Tool in Action
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience how our AI-powered analytics transforms your social
              media strategy
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Chat Interface */}
            <div className="bg-neutral-800 p-6 rounded-xl mt-44">
              {/* Window Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">AI</span>
                  </div>
                  <div className="bg-neutral-700 rounded-lg p-4 flex-1">
                    <p className="text-gray-300">
                      How do video posts perform compared to image posts?
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <div className="bg-neutral-700 rounded-lg p-4 flex-1">
                    <p className="text-gray-300">
                      Analysis shows video posts have 47% higher engagement
                      rates with an average of 892 interactions per post
                      compared to 607 for images.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Dashboard */}
            <div className="bg-neutral-800 p-6 rounded-xl">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20"></div>
                <div className="relative bg-neutral-900 p-6 rounded-lg">
                  {/* Chart Section */}
                  <Card className="bg-neutral-900 border-neutral-800">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Post Type Performance Comparison
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={data}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              className="stroke-neutral-700"
                              horizontal={true}
                              vertical={false}
                            />
                            <XAxis
                              dataKey="type"
                              stroke="#9CA3AF"
                              tick={{ fill: "#9CA3AF" }}
                            />
                            <YAxis
                              yAxisId="left"
                              stroke="#9CA3AF"
                              tick={{ fill: "#9CA3AF" }}
                              label={{
                                value: "Interactions per Post",
                                angle: -90,
                                position: "insideLeft",
                                fill: "#9CA3AF",
                                dy: 70, // Adjust this value to move the label down
                              }}
                            />
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              stroke="#9CA3AF"
                              tick={{ fill: "#9CA3AF" }}
                              label={{
                                value: "Engagement Rate (%)",
                                angle: 90,
                                position: "insideRight",
                                fill: "#9CA3AF",
                                dy: 70,
                              }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgb(23 23 23)",
                                border: "1px solid rgb(64 64 64)",
                                borderRadius: "6px",
                                padding: "12px",
                              }}
                              itemStyle={{ color: "#E5E7EB" }}
                              labelStyle={{
                                color: "#E5E7EB",
                                marginBottom: "4px",
                              }}
                            />
                            <Legend
                              wrapperStyle={{ paddingTop: "8px" }}
                              formatter={(value) => (
                                <span className="text-gray-300">{value}</span>
                              )}
                            />
                            <Bar
                              yAxisId="left"
                              dataKey="interactions"
                              fill="#2563eb"
                              name="Interactions"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar
                              yAxisId="right"
                              dataKey="engagementRate"
                              fill="#16a34a"
                              name="Engagement Rate (%)"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-neutral-800 p-4 rounded-lg text-center">
                      <p className="text-blue-500 text-xl font-bold">+156%</p>
                      <p className="text-gray-400 text-sm">Engagement</p>
                    </div>
                    <div className="bg-neutral-800 p-4 rounded-lg text-center">
                      <p className="text-purple-500 text-xl font-bold">892</p>
                      <p className="text-gray-400 text-sm">Avg. Likes</p>
                    </div>
                    <div className="bg-neutral-800 p-4 rounded-lg text-center">
                      <p className="text-green-500 text-xl font-bold">47%</p>
                      <p className="text-gray-400 text-sm">Growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center">
            <Link to ={'/api'} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105">
              Try Demo Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsDashboard;
