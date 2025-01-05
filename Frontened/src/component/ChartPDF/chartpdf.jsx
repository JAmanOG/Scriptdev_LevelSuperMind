  import React, { useRef, useState, useEffect, useMemo } from 'react';
  import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
  import { Document, Page, View, Text, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
  import { toPng } from 'html-to-image';
  
  // Define styles for the document
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      backgroundColor: '#ffffff',
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 14,
      color: '#666666',
      marginBottom: 20,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
    },
    statBox: {
      padding: 15,
      borderRadius: 8,
      backgroundColor: '#f8f9fa',
      width: '30%',
    },
    statTitle: {
      fontSize: 12,
      color: '#666666',
      marginBottom: 5,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    statIncrease: {
      fontSize: 12,
      color: '#10b981',
      marginTop: 5,
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    insightBox: {
      padding: 12,
      marginBottom: 10,
      borderRadius: 6,
    },
    insightTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    insightText: {
      fontSize: 10,
    },
    chartsContainer: {
      marginTop: 20,
      marginBottom: 20,
    },
    chartTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    downloadButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: 500,
    },
  });
  
  const CombinedAnalytics = () => {
    const comparisonChartRef = useRef();
    const donutChartRef = useRef();
    const [chartImages, setChartImages] = useState({
      comparisonChart: null,
      donutChart: null,
    });
    const [chartsCaptured, setChartsCaptured] = useState(false);

    const dataState = useMemo(() => {
      const savedData = localStorage.getItem("dataState");
      return savedData ? JSON.parse(savedData) : null;
    }, []);
  
    if (!dataState) return null;
  
    const message_text = dataState?.outputs?.[0]?.outputs?.[0]?.results?.message?.text || '';
    console.log(message_text)
  
    const parseEngagementData = (message_text) => {
      const result = {};
      const patterns = {
        staticImage: /### Static Image Posts:\n- \*\*Average Likes:\*\* (\d+)\n- \*\*Average Comments:\*\* (\d+)\n- \*\*Average Shares:\*\* (\d+)/,
        carousel: /### Carousel Posts:\n- \*\*Average Likes:\*\* (\d+)\n- \*\*Average Comments:\*\* (\d+)\n- \*\*Average Shares:\*\* (\d+)/,
        reels: /### Reels:\n- \*\*Average Likes:\*\* (\d+)\n- \*\*Average Comments:\*\* (\d+)\n- \*\*Average Shares:\*\* (\d+)/,
      };
  
      Object.entries(patterns).forEach(([key, pattern]) => {
        const match = message_text.match(pattern);
        if (match) {
          result[key] = {
            "Average Likes": parseInt(match[1], 10),
            "Average Comments": parseInt(match[2], 10),
            "Average Shares": parseInt(match[3], 10),
          };
        }
      });
  
      return result;
    };
  
    const parseInsightsAndConclusion = (input) => {
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
    
    const engagementData = parseEngagementData(message_text);
    const { insights, conclusion } = parseInsightsAndConclusion(message_text);
  
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
  
    const handleCaptureCharts = async () => {
      if (comparisonChartRef.current && donutChartRef.current) {
        try {
          const comparisonChartImage = await toPng(comparisonChartRef.current);
          const donutChartImage = await toPng(donutChartRef.current);
  
          setChartImages({
            comparisonChart: comparisonChartImage,
            donutChart: donutChartImage,
          });
          setChartsCaptured(true);

          
        } catch (error) {
          console.error('Error capturing charts:', error);
        }
      }
    };

    console.log(insights)
  
    const AnalyticsPDF = ({ chartImages, insights, conclusion, totalEngagement }) => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Social Media Analytics Report</Text>
            <Text style={styles.subtitle}>Performance Analysis Across Post Types</Text>
          </View>
  
          <View style={styles.statsContainer}>
            {totalEngagement.map((data, index) => (
              <View key={index} style={styles.statBox}>
                <Text style={styles.statTitle}>{data.name}</Text>
                <Text style={styles.statValue}>{data.value.toLocaleString()}</Text>
                <Text style={styles.statIncrease}>↑ {Math.round((data.value / totalEngagement.reduce((acc, curr) => acc + curr.value, 0)) * 100)}%</Text>
              </View>
            ))}
          </View>
  
          <View style={styles.chartsContainer}>
            <Text style={styles.sectionTitle}>Engagement Analytics</Text>
            {chartImages.comparisonChart && (
              <View>
                <Text style={styles.chartTitle}>Engagement Comparison by Post Type</Text>
                <Image src={chartImages.comparisonChart} />
              </View>
            )}
            {chartImages.donutChart && (
              <View>
                <Text style={styles.chartTitle}>Total Engagement Distribution</Text>
                <Image src={chartImages.donutChart} />
              </View>
            )}
          </View>
  
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Insights</Text>
            {insights.map((insight, index) => (
              <View key={index} style={[styles.insightBox, { backgroundColor: index % 2 === 0 ? '#dcfce7' : '#dbeafe' }]}>
                <Text style={styles.insightText}>{insight}</Text>
              </View>
            ))}
          </View>
  
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Strategic Recommendation</Text>
            <View style={[styles.insightBox, { backgroundColor: '#f3f4f6' }]}>
              <Text style={styles.insightText}>{conclusion}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  
    return (
      <div>
    <div className="mt-4 space-x-4">
      <button
        onClick={handleCaptureCharts}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Capture Charts
      </button>

      {chartsCaptured && (
        <PDFDownloadLink
          document={<AnalyticsPDF chartImages={chartImages} insights={insights} conclusion={conclusion} totalEngagement={totalEngagement} />}
          fileName="analytics-report.pdf"
        >
          {({ loading }) =>
            loading ? (
              <span>Generating PDF...</span>
            ) : (
              <button className="bg-green-500 text-white px-6 py-2 rounded">
                Download PDF
              </button>
            )
          }
        </PDFDownloadLink>
      )}
    </div>

  
        {/* Chart Rendering */}
        <div ref={comparisonChartRef}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {availableTypes.map((type) => (
                <Bar key={type} dataKey={type} fill={type === 'staticImage' ? '#F7D3B2' : type === 'reels' ? '#2c2c2c' : '#F7D3B2'} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
  
        <div ref={donutChartRef}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={totalEngagement}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {totalEngagement.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#F7D3B2', '#2C2C2C', '#6A8A82'][index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  export default CombinedAnalytics;
  