import React from "react";

const Features = () => {
  return (
    <div id="root">
      <section id="features" className="bg-neutral-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features for Smart Analysis
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Leverage advanced AI and data analytics to understand your social
              media performance like never before
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-neutral-900 p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeInUp">
              <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Post Type Analysis
              </h3>
              <p className="text-gray-400 mb-4">
                Compare performance across different post types with detailed
                metrics and engagement analysis
              </p>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Image vs Video Performance
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Carousel Engagement Metrics
                </li>
              </ul>
            </div>

            <div
              className="bg-neutral-900 p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              {" "}
              <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Engagement Dashboard
              </h3>
              <p className="text-gray-400 mb-4">
                Visualize your social media performance with interactive charts
                and real-time data
              </p>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Interactive Charts
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Real-time Statistics
                </li>
              </ul>
            </div>

            <div
              className="bg-neutral-900 p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeInUp"
              style={{animationDelay: "0.4s"}}
            >
              <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                AI-Powered Insights
              </h3>
              <p className="text-gray-400 mb-4">
                Get intelligent recommendations and insights powered by GPT-4
                and LangFlow
              </p>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Natural Language Queries
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Smart Recommendations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
