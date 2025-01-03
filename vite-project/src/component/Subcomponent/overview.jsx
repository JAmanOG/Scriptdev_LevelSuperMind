import React from 'react';
import { Card, CardContent} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ComparisonCard from './Comparisoncard';
import { useApi } from "@/hook/APIContext";
import { useNavigate } from 'react-router-dom';
import Outputjson from '@/Outputjson';

const Overview = ({ prompt,dataState }) => {
  console.log(dataState);
  const { apiKey } = useApi();
  const navigate = useNavigate();

  if(!apiKey) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <Card className="w-full max-w-2xl p-4 rounded-lg shadow-xl bg-white">
          <CardContent className="p-4">
            <h1 className="text-2xl font-semibold text-center">Please enter your API key to continue</h1>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => navigate('/')}
            >
                <span>Go back</span>
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  
  const message_text = Outputjson['outputs'][0]['outputs'][0]['results']['message']['text']
    

  function parseEngagementData(message_text) {
    const result = {};
  
    // Extract data for Static Image Posts
    const staticMatch = message_text.match(
      /### Static Image Posts:\n- \*\*Average Likes:\*\* (\d+)\n- \*\*Average Comments:\*\* (\d+)\n- \*\*Average Shares:\*\* (\d+)/
    );
    if (staticMatch) {
      result.staticImage = {
        'Average Likes': parseInt(staticMatch[1], 10),
        'Average Comments': parseInt(staticMatch[2], 10),
        'Average Shares': parseInt(staticMatch[3], 10),
      };
    }
  
    // Extract data for Carousel Posts
    const carouselMatch = message_text.match(
      /### Carousel Posts:\n- \*\*Average Likes:\*\* (\d+)\n- \*\*Average Comments:\*\* (\d+)\n- \*\*Average Shares:\*\* (\d+)/
    );
    if (carouselMatch) {
      result.carousel = {
        'Average Likes': parseInt(carouselMatch[1], 10),
        'Average Comments': parseInt(carouselMatch[2], 10),
        'Average Shares': parseInt(carouselMatch[3], 10),
      };
    }
  
    return result;
  }
  
  // Parse the string into the desired object
  const engagementData = parseEngagementData(message_text);
  
  const StringData = JSON.stringify(engagementData, null, 2)
  // Log the result
  console.log(StringData);
  

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
  
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
            <ComparisonCard title="Static Image Posts" metrics={engagementData.staticImage} />
<ComparisonCard title="Carousel Posts" metrics={engagementData.carousel} />

            </div>
  
            {/* Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Engagement Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
  data={[
    { name: 'Likes', static: engagementData.staticImage['Average Likes'], carousel: engagementData.carousel['Average Likes'] },
    { name: 'Comments', static: engagementData.staticImage['Average Comments'], carousel: engagementData.carousel['Average Comments'] },
    { name: 'Shares', static: engagementData.staticImage['Average Shares'], carousel: engagementData.carousel['Average Shares'] },
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