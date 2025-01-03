// import React, { useRef, useState } from 'react';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
// import {toPng} from 'recharts-to-png';
// import { Document, Page, Text, Image, View, PDFDownloadLink } from '@react-pdf/renderer';

// // Sample data for the charts
// const pieData = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

// const barData = [
//   { name: 'Jan', uv: 4000, pv: 2400 },
//   { name: 'Feb', uv: 3000, pv: 1398 },
//   { name: 'Mar', uv: 2000, pv: 9800 },
//   { name: 'Apr', uv: 2780, pv: 3908 },
// ];

// const lineData = [
//   { name: 'Jan', uv: 4000, pv: 2400 },
//   { name: 'Feb', uv: 3000, pv: 1398 },
//   { name: 'Mar', uv: 2000, pv: 9800 },
//   { name: 'Apr', uv: 2780, pv: 3908 },
// ];

// // Chart Components
// const PieChartComponent = () => (
//   <ResponsiveContainer width="100%" height={200}>
//     <PieChart>
//       <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
//         {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0088FE' : '#00C49F'} />)}
//       </Pie>
//     </PieChart>
//   </ResponsiveContainer>
// );

// const BarChartComponent = () => (
//   <ResponsiveContainer width="100%" height={200}>
//     <BarChart data={barData}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="uv" fill="#8884d8" />
//       <Bar dataKey="pv" fill="#82ca9d" />
//     </BarChart>
//   </ResponsiveContainer>
// );

// const LineChartComponent = () => (
//   <ResponsiveContainer width="100%" height={200}>
//     <LineChart data={lineData}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//       <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
//     </LineChart>
//   </ResponsiveContainer>
// );

// const ExportPDF = () => {
//   const pieChartRef = useRef();
//   const barChartRef = useRef();
//   const lineChartRef = useRef();
//   const [chartImages, setChartImages] = useState({ pieChart: null, barChart: null, lineChart: null });

//   // Capture all charts as PNG images
//   const handleCaptureCharts = () => {
//     // Capture PieChart
//     toPng(pieChartRef.current).then((dataUrl) => setChartImages((prev) => ({ ...prev, pieChart: dataUrl })));
//     // Capture BarChart
//     toPng(barChartRef.current).then((dataUrl) => setChartImages((prev) => ({ ...prev, barChart: dataUrl })));
//     // Capture LineChart
//     toPng(lineChartRef.current).then((dataUrl) => setChartImages((prev) => ({ ...prev, lineChart: dataUrl })));
//   };

//   // PDF layout with multiple charts
//   const MyPDF = ({ chartImages }) => (
//     <Document>
//       <Page size="A4" style={{ padding: 20 }}>
//         <View>
//           <Text>Charts included in this PDF:</Text>
//         </View>
//         <View>
//           <Text>Pie Chart:</Text>
//           {chartImages.pieChart && <Image src={chartImages.pieChart} />}
//         </View>
//         <View>
//           <Text>Bar Chart:</Text>
//           {chartImages.barChart && <Image src={chartImages.barChart} />}
//         </View>
//         <View>
//           <Text>Line Chart:</Text>
//           {chartImages.lineChart && <Image src={chartImages.lineChart} />}
//         </View>
//       </Page>
//     </Document>
//   );

//   return (
//     <div>
//       <div ref={pieChartRef}>
//         <PieChartComponent />
//       </div>
//       <div ref={barChartRef}>
//         <BarChartComponent />
//       </div>
//       <div ref={lineChartRef}>
//         <LineChartComponent />
//       </div>
//       <button onClick={handleCaptureCharts}>Capture Charts</button>

//       {/* When all chart images are ready, show the PDF download link */}
//       {chartImages.pieChart && chartImages.barChart && chartImages.lineChart && (
//         <PDFDownloadLink document={<MyPDF chartImages={chartImages} />} fileName="charts.pdf">
//           {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
//         </PDFDownloadLink>
//       )}
//     </div>
//   );
// };

// export default ExportPDF;
