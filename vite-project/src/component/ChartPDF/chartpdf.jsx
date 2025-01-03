// import React from 'react';
// import { Document, Page, View, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     backgroundColor: '#ffffff',
//   },
//   header: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 20,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   },
//   statBox: {
//     padding: 15,
//     borderRadius: 8,
//     backgroundColor: '#f8f9fa',
//     width: '30%',
//   },
//   statTitle: {
//     fontSize: 12,
//     color: '#666666',
//     marginBottom: 5,
//   },
//   statValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   statIncrease: {
//     fontSize: 12,
//     color: '#10b981',
//     marginTop: 5,
//   },
//   section: {
//     marginBottom: 25,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   insightBox: {
//     padding: 12,
//     marginBottom: 10,
//     borderRadius: 6,
//   },
//   insightTitle: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   insightText: {
//     fontSize: 10,
//   },
//   downloadButton: {
//     backgroundColor: '#3b82f6',
//     color: 'white',
//     padding: '10px 20px',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '8px',
//     border: 'none',
//     fontSize: '14px',
//     fontWeight: 500,
//     transition: 'background-color 0.2s',
//   },
// });

// const AnalyticsPDF = ({ data }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Social Media Analytics</Text>
//         <Text style={styles.subtitle}>Performance comparison between post types</Text>
//       </View>

//       {/* Stats */}
//       <View style={styles.statsContainer}>
//         <View style={styles.statBox}>
//           <Text style={styles.statTitle}>Total Likes</Text>
//           <Text style={styles.statValue}>180</Text>
//           <Text style={styles.statIncrease}>↑ 100%</Text>
//         </View>
//         <View style={styles.statBox}>
//           <Text style={styles.statTitle}>Total Comments</Text>
//           <Text style={styles.statValue}>60</Text>
//           <Text style={styles.statIncrease}>↑ 200%</Text>
//         </View>
//         <View style={styles.statBox}>
//           <Text style={styles.statTitle}>Total Shares</Text>
//           <Text style={styles.statValue}>40</Text>
//           <Text style={styles.statIncrease}>↑ 200%</Text>
//         </View>
//       </View>

//       {/* Key Insights */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Key Insights</Text>
        
//         <View style={[styles.insightBox, { backgroundColor: '#dcfce7' }]}>
//           <Text style={styles.insightTitle}>Likes Performance</Text>
//           <Text style={styles.insightText}>Carousel posts generate 100% more likes than static images (120 vs. 60)</Text>
//         </View>

//         <View style={[styles.insightBox, { backgroundColor: '#dbeafe' }]}>
//           <Text style={styles.insightTitle}>Comments Engagement</Text>
//           <Text style={styles.insightText}>Carousel posts receive 200% more comments compared to static images (45 vs. 15)</Text>
//         </View>

//         <View style={[styles.insightBox, { backgroundColor: '#fef3c7' }]}>
//           <Text style={styles.insightTitle}>Sharing Behavior</Text>
//           <Text style={styles.insightText}>Carousel posts are shared 200% more than static images (30 vs. 10)</Text>
//         </View>

//         <View style={[styles.insightBox, { backgroundColor: '#f3f4f6' }]}>
//           <Text style={styles.insightTitle}>Strategic Recommendation</Text>
//           <Text style={styles.insightText}>Consider prioritizing carousel posts in your social media strategy for increased user interaction across all engagement metrics.</Text>
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// const DownloadButton = () => (
//   <PDFDownloadLink 
//     document={<AnalyticsPDF />} 
//     fileName="social-media-analytics.pdf"
//   >
//     {({ loading }) => (
//       <button 
//         style={styles.downloadButton}
//         disabled={loading}
//       >
//         {loading ? 'Generating PDF...' : 'Download Report'}
//       </button>
//     )}
//   </PDFDownloadLink>
// );

// export { AnalyticsPDF, DownloadButton };