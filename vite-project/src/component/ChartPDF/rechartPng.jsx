// import React, { useRef, useState } from 'react';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { toPng } from 'html-to-image'; // Corrected library for PNG export
// import { Document, Page, Text, Image, View, PDFDownloadLink } from '@react-pdf/renderer';

// const ExportPDF = () => {
//   const dataState = React.useMemo(() => {
//     const savedData = localStorage.getItem("dataState");
//     return savedData ? JSON.parse(savedData) : null;
//   }, []);

//   const message_text = dataState?.outputs?.[0]?.outputs?.[0]?.results?.message?.text || '';
//   console.log(message_text);

//   function parseEngagementData(message_text) {
//     const result = {};

//     const staticMatch = message_text.match(
//       /### Static Image Posts:\n- \*\*Average Likes:\*\* (\d+)\n- \*\*Average Comments:\*\* (\d+)\n- \*\*Average Shares:\*\* (\d+)/
//     );
//     if (staticMatch) {
//       result.staticImage = {
//         "Average Likes": parseInt(staticMatch[1], 10),
//         "Average Comments": parseInt(staticMatch[2], 10),
//         "Average Shares": parseInt(staticMatch[3], 10),
//       };
//     }

//     const carouselMatch = message_text.match(
//       /### Carousel Posts:\n- \*\*Average Likes:\*\* (\d+)\n- \*\*Average Comments:\*\* (\d+)\n- \*\*Average Shares:\*\* (\d+)/
//     );
//     if (carouselMatch) {
//       result.carousel = {
//         "Average Likes": parseInt(carouselMatch[1], 10),
//         "Average Comments": parseInt(carouselMatch[2], 10),
//         "Average Shares": parseInt(carouselMatch[3], 10),
//       };
//     }

//     const reelMatch = message_text.match(
//       /### Reels:\n- \*\*Average Likes:\*\* (\d+)\n- \*\*Average Comments:\*\* (\d+)\n- \*\*Average Shares:\*\* (\d+)/
//     );
//     if (reelMatch) {
//       result.reels = {
//         "Average Likes": parseInt(reelMatch[1], 10),
//         "Average Comments": parseInt(reelMatch[2], 10),
//         "Average Shares": parseInt(reelMatch[3], 10),
//       };
//     }

//     return result;
//   }

//   const engagementData = parseEngagementData(message_text);
//   const availableTypes = Object.keys(engagementData);

//   const comparisonData = ["Likes", "Comments", "Shares"].map((metric) => {
//     const dataPoint = { name: metric };
//     availableTypes.forEach((type) => {
//       dataPoint[type] = engagementData[type]?.[`Average ${metric}`] || 0;
//     });
//     return dataPoint;
//   });

//   const totalEngagement = ["Likes", "Comments", "Shares"].map((metric) => {
//     return {
//       name: metric,
//       value: availableTypes.reduce((total, type) => {
//         return total + (engagementData[type]?.[`Average ${metric}`] || 0);
//       }, 0),
//     };
//   });

//   console.log("Comparison Data: ", JSON.stringify(comparisonData));
//   console.log("Total Engagement Data: ", JSON.stringify(totalEngagement));

//   const comparisonChartRef = useRef();
//   const donutChartRef = useRef();
//   const [chartImages, setChartImages] = useState({
//     comparisonChart: null,
//     donutChart: null,
//   });

//   const handleCaptureCharts = async () => {
//     const comparisonChartImage = await toPng(comparisonChartRef.current);
//     const donutChartImage = await toPng(donutChartRef.current);

//     setChartImages({
//       comparisonChart: comparisonChartImage,
//       donutChart: donutChartImage,
//     });
//   };

//   const MyPDF = ({ chartImages }) => (
//     <Document>
//       <Page size="A4" style={{ padding: 20 }}>
//         <View>
//           <Text>Charts included in this PDF:</Text>
//         </View>
//         <View>
//           <Text>Comparison Chart (Static Image vs Reels):</Text>
//           {chartImages.comparisonChart && <Image src={chartImages.comparisonChart} />}
//         </View>
//         <View>
//           <Text>Donut Chart (Total Engagement):</Text>
//           {chartImages.donutChart && <Image src={chartImages.donutChart} />}
//         </View>
//       </Page>
//     </Document>
//   );

//   return (
//     <div>
//       <div ref={comparisonChartRef}>
//         <ResponsiveContainer width="100%" height={200}>
//           <BarChart data={comparisonData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             {availableTypes.map((type, index) => (
//               <Bar key={type} dataKey={type} fill={['#8884d8', '#82ca9d', '#FF8042'][index % 3]} name={type} />
//             ))}
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//       <div ref={donutChartRef}>
//         <ResponsiveContainer width="100%" height={200}>
//           <PieChart>
//             <Pie
//               data={totalEngagement}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               innerRadius={60}
//               outerRadius={80}
//               fill="#82ca9d"
//               label
//             >
//               {totalEngagement.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={['#FF8042', '#0088FE', '#00C49F'][index % 3]} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       <button onClick={handleCaptureCharts}>Capture Charts</button>

//       {chartImages.comparisonChart && chartImages.donutChart && (
//         <PDFDownloadLink document={<MyPDF chartImages={chartImages} />} fileName="charts.pdf">
//           {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
//         </PDFDownloadLink>
//       )}
//     </div>
//   );
// };

// export default ExportPDF;
import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

const COLORS = ["#10B981", "#6366F1", "#F59E0B"];

const parseEngagementData = (input) => {
  const postPatterns = {
    static: /### Static Image Posts:[\s\S]*?-\s\*\*Average Likes:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Comments:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Shares:\*\*\s(\d+)/,
    carousel: /### Carousel Posts:[\s\S]*?-\s\*\*Average Likes:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Comments:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Shares:\*\*\s(\d+)/,
    reels: /### Reels Posts:[\s\S]*?-\s\*\*Average Likes:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Comments:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Shares:\*\*\s(\d+)/,
  };

  const data = Object.keys(postPatterns).reduce((acc, type) => {
    const match = input.match(postPatterns[type]);
    if (match) {
      acc[type] = {
        likes: parseInt(match[1]),
        comments: parseInt(match[2]),
        shares: parseInt(match[3]),
      };
    }
    return acc;
  }, {});

  const comparisonData = Object.entries(data).map(([type, values]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    likes: values.likes,
    comments: values.comments,
    shares: values.shares,
  }));

  const engagementData = Object.entries(data).map(([type, values]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: values.likes + values.comments + values.shares,
  }));

  return { comparisonData, engagementData };
};

const generateKeyInsights = (comparisonData) => {
  const insights = [];
  const sortedByLikes = [...comparisonData].sort((a, b) => b.likes - a.likes);
  const sortedByComments = [...comparisonData].sort((a, b) => b.comments - a.comments);
  const sortedByShares = [...comparisonData].sort((a, b) => b.shares - a.shares);

  if (sortedByLikes.length > 0) {
    insights.push(
      `The post type with the highest average likes is **${sortedByLikes[0].name}**, with ${sortedByLikes[0].likes} likes.`
    );
  }

  if (sortedByComments.length > 0) {
    insights.push(
      `The post type with the highest average comments is **${sortedByComments[0].name}**, with ${sortedByComments[0].comments} comments.`
    );
  }

  if (sortedByShares.length > 0) {
    insights.push(
      `The post type with the highest average shares is **${sortedByShares[0].name}**, with ${sortedByShares[0].shares} shares.`
    );
  }

  return insights;
};

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

const AnalyticsDashboard = ({ input }) => {
  let comparisonData = [];
  let engagementData = [];
  let keyInsights = [];

  try {
    const parsedData = parseEngagementData(input);
    comparisonData = parsedData.comparisonData;
    engagementData = parsedData.engagementData;
    keyInsights = generateKeyInsights(comparisonData);
  } catch (error) {
    console.error("Error parsing engagement data:", error.message);
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Post Performance Analytics</h1>
          <p className="text-gray-500 mt-1">Compare performance across post types</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {engagementData.map((item) => (
            <StatsCard
              key={item.name}
              title={`Total Engagement: ${item.name}`}
              value={item.value}
              percentageIncrease="100"
              color="text-emerald-500"
            />
          ))}
        </div>

        {/* Key Insights Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold">Key Insights</h2>
          <ul className="mt-4 list-disc list-inside text-gray-700">
            {keyInsights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">Engagement Metrics Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="likes" name="Likes" fill="#10B981" />
                    <Bar dataKey="comments" name="Comments" fill="#6366F1" />
                    <Bar dataKey="shares" name="Shares" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
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
                      nameKey="name"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
