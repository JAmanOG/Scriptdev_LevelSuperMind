import React, { useRef, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toPng } from 'html-to-image'; // Corrected library for PNG export
import { Document, Page, Text, Image, View, PDFDownloadLink } from '@react-pdf/renderer';

const ExportPDF = () => {
  const dataState = React.useMemo(() => {
    const savedData = localStorage.getItem("dataState");
    return savedData ? JSON.parse(savedData) : null;
  }, []);

  const message_text = dataState?.outputs?.[0]?.outputs?.[0]?.results?.message?.text || '';
  // console.log(message_text);

  function parseEngagementData(message_text) {
    const result = {};

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

  const comparisonData = ["Likes", "Comments", "Shares"].map((metric) => {
    const dataPoint = { name: metric };
    availableTypes.forEach((type) => {
      dataPoint[type] = engagementData[type]?.[`Average ${metric}`] || 0;
    });
    return dataPoint;
  });

  const totalEngagement = ["Likes", "Comments", "Shares"].map((metric) => {
    return {
      name: metric,
      value: availableTypes.reduce((total, type) => {
        return total + (engagementData[type]?.[`Average ${metric}`] || 0);
      }, 0),
    };
  });

  // console.log("Comparison Data: ", JSON.stringify(comparisonData));
  // console.log("Total Engagement Data: ", JSON.stringify(totalEngagement));

  const comparisonChartRef = useRef();
  const donutChartRef = useRef();
  const [chartImages, setChartImages] = useState({
    comparisonChart: null,
    donutChart: null,
  });

  const handleCaptureCharts = async () => {
    const comparisonChartImage = await toPng(comparisonChartRef.current);
    const donutChartImage = await toPng(donutChartRef.current);

    setChartImages({
      comparisonChart: comparisonChartImage,
      donutChart: donutChartImage,
    });
  };

  const MyPDF = ({ chartImages }) => (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        <View>
          <Text>Charts included in this PDF:</Text>
        </View>
        <View>
          <Text>Comparison Chart (Static Image vs Reels):</Text>
          {chartImages.comparisonChart && <Image src={chartImages.comparisonChart} />}
        </View>
        <View>
          <Text>Donut Chart (Total Engagement):</Text>
          {chartImages.donutChart && <Image src={chartImages.donutChart} />}
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <div ref={comparisonChartRef}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {availableTypes.map((type, index) => (
              <Bar key={type} dataKey={type} fill={['#8884d8', '#82ca9d', '#FF8042'][index % 3]} name={type} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div ref={donutChartRef}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={totalEngagement}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {totalEngagement.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#FF8042', '#0088FE', '#00C49F'][index % 3]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <button onClick={handleCaptureCharts}>Capture Charts</button>

      {chartImages.comparisonChart && chartImages.donutChart && (
        <PDFDownloadLink document={<MyPDF chartImages={chartImages} />} fileName="charts.pdf">
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default ExportPDF;
