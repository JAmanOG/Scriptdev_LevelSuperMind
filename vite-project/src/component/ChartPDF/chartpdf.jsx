import React, { useMemo } from 'react';
import { Document, Page, View, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

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
    transition: 'background-color 0.2s',
  },
});

// Function to parse insights and conclusion from the input string
const parseInsightsAndConclusion = (input) => {
    const insightsPattern = /### Insights:\n([\s\S]*?)\n\n### Conclusion:/;
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
  
// Function to parse engagement data
const parseEngagementData = (input) => {
  const patterns = {
    static: /### Static Image Posts:[\s\S]*?-\s\*\*Average Likes:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Comments:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Shares:\*\*\s(\d+)/,
    carousel: /### Carousel Posts:[\s\S]*?-\s\*\*Average Likes:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Comments:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Shares:\*\*\s(\d+)/,
    reel: /### Reels:[\s\S]*?-\s\*\*Average Likes:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Comments:\*\*\s(\d+)[\s\S]*?-\s\*\*Average Shares:\*\*\s(\d+)/,
  };

  const data = Object.entries(patterns).reduce((acc, [key, pattern]) => {
    const match = input.match(pattern);
    if (match) {
      acc[key] = {
        likes: parseInt(match[1]),
        comments: parseInt(match[2]),
        shares: parseInt(match[3]),
      };
    }
    return acc;
  }, {});

  const comparisonData = ['likes', 'comments', 'shares'].map((metric) => ({
    name: metric.charAt(0).toUpperCase() + metric.slice(1),
    ...Object.keys(data).reduce((acc, key) => {
      acc[key] = data[key][metric] || 0;
      return acc;
    }, {}),
  }));

  const engagementData = comparisonData.map(({ name, ...values }) => ({
    name,
    value: Object.values(values).reduce((sum, v) => sum + v, 0),
  }));

  return { comparisonData, engagementData };
};

// AnalyticsPDF component to generate the PDF
const AnalyticsPDF = ({ result, engagementData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Social Media Analytics</Text>
        <Text style={styles.subtitle}>Performance comparison between post types</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {engagementData.map((data, index) => (
          <View key={index} style={styles.statBox}>
            <Text style={styles.statTitle}>{data.name}</Text>
            <Text style={styles.statValue}>{data.value}</Text>
            <Text style={styles.statIncrease}>↑ {Math.round((data.value / 100) * 100)}%</Text>
          </View>
        ))}
      </View>

      {/* Key Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Insights</Text>

        {/* Dynamically displaying insights */}
        {result.insights.map((insight, index) => (
          <View key={index} style={[styles.insightBox, { backgroundColor: index % 2 === 0 ? '#dcfce7' : '#dbeafe' }]}>
            <Text style={styles.insightTitle}>{insight.split(':')[0]}</Text>
            <Text style={styles.insightText}>{insight}</Text>
          </View>
        ))}

        {/* Strategic Recommendation */}
        <View style={[styles.insightBox, { backgroundColor: '#f3f4f6' }]}>
          <Text style={styles.insightTitle}>Strategic Recommendation</Text>
          <Text style={styles.insightText}>{result.conclusion}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// DownloadButton component
const DownloadButton = () => {
  const dataState = useMemo(() => {
    const savedData = localStorage.getItem("dataState");
    return savedData ? JSON.parse(savedData) : null;
  }, []);

  if (!dataState) return null;

  const messageText = dataState['outputs'][0]['outputs'][0]['results']['message']['text'];
  const result = parseInsightsAndConclusion(messageText);
  const { comparisonData, engagementData } = parseEngagementData(messageText);

  return (
    <PDFDownloadLink 
      document={<AnalyticsPDF result={result} engagementData={engagementData} />} 
      fileName="social-media-analytics.pdf"
    >
      {({ loading }) => (
        <button 
          style={styles.downloadButton}
          disabled={loading}
        >
          {loading ? 'Generating PDF...' : 'Download Report'}
        </button>
      )}
    </PDFDownloadLink>
  );
};

export { AnalyticsPDF, DownloadButton };
