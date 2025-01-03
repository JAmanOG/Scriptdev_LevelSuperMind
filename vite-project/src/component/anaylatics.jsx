import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowUp } from 'lucide-react';

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

const AnalyticsDashboard = () => {
  const data = {
    static: {
      likes: 60,
      comments: 15,
      shares: 10
    },
    carousel: {
      likes: 120,
      comments: 45,
      shares: 30
    }
  };

  const comparisonData = [
    { name: 'Likes', static: 60, carousel: 120 },
    { name: 'Comments', static: 15, carousel: 45 },
    { name: 'Shares', static: 10, carousel: 30 }
  ];

  const engagementData = [
    { name: 'Likes', value: 180 },
    { name: 'Comments', value: 60 },
    { name: 'Shares', value: 40 }
  ];

  const COLORS = ['#10B981', '#6366F1', '#F59E0B'];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Social Media Analytics</h1>
          <p className="text-gray-500 mt-1">Performance comparison between post types</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Total Likes"
            value="180"
            percentageIncrease="100"
            color="text-emerald-500"
          />
          <StatsCard 
            title="Total Comments"
            value="60"
            percentageIncrease="200"
            color="text-emerald-500"
          />
          <StatsCard 
            title="Total Shares"
            value="40"
            percentageIncrease="200"
            color="text-emerald-500"
          />
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
                    <Bar dataKey="static" name="Static Posts" fill="#94A3B8" />
                    <Bar dataKey="carousel" name="Carousel Posts" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
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
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                      <span className="text-sm text-gray-600">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Card */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Key Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-medium text-emerald-700">Likes Performance</h4>
                <p className="text-emerald-600 mt-1">Carousel posts generate 100% more likes than static images (120 vs. 60)</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-700">Comments Engagement</h4>
                <p className="text-blue-600 mt-1">Carousel posts receive 200% more comments compared to static images (45 vs. 15)</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-medium text-amber-700">Sharing Behavior</h4>
                <p className="text-amber-600 mt-1">Carousel posts are shared 200% more than static images (30 vs. 10)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700">Strategic Recommendation</h4>
                <p className="text-gray-600 mt-1">Consider prioritizing carousel posts in your social media strategy for increased user interaction across all engagement metrics.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;