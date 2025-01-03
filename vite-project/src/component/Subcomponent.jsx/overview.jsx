import React from 'react';
import { Card} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Users,  PieChart, Settings,  Grid } from 'lucide-react';

const Overview = () => {
    const data = {
      staticImage: {
        "Average Likes": 60,
        "Average Comments": 15,
        "Average Shares": 10
      },
      carousel: {
        "Average Likes": 120,
        "Average Comments": 45,
        "Average Shares": 30
      }
    };
  
    return (
      <div className="flex h-screen bg-gray-50">
  
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            {/* <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">Post Performance Analytics</h1>
                <p className="text-gray-500">Compare engagement metrics across different post types</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                  <RefreshCcw size={20} />
                  <span>Refresh</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white">
                  <span>Last 30 Days</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div> */}
  
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <ComparisonCard title="Static Image Posts" metrics={data.staticImage} />
              <ComparisonCard title="Carousel Posts" metrics={data.carousel} />
            </div>
  
            {/* Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Engagement Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Likes', static: 60, carousel: 120 },
                      { name: 'Comments', static: 15, carousel: 45 },
                      { name: 'Shares', static: 10, carousel: 30 }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="static" name="Static Image" fill="#93c5fd" />
                    <Bar dataKey="carousel" name="Carousel" fill="#3b82f6" />
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