import React from 'react'
import { Link } from 'react-router-dom'

const AiAnalytics = () => {

  return (
<div id="root">
    <section id="aiCapabilities" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI-Powered Analytics</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Leverage the power of GPT-4 and LangFlow for intelligent social media insights</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8 animate__animated animate__fadeInLeft">
                    <div className="bg-neutral-800 rounded-xl p-6 hover:bg-neutral-700 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Natural Language Processing</h3>
                        </div>
                        <p className="text-gray-400">Ask questions in plain English and get detailed analytics insights about your social media performance</p>
                    </div>

                    <div className="bg-neutral-800 rounded-xl p-6 hover:bg-neutral-700 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Predictive Analytics</h3>
                        </div>
                        <p className="text-gray-400">Get AI-powered predictions about content performance and audience engagement trends</p>
                    </div>

                    <div className="bg-neutral-800 rounded-xl p-6 hover:bg-neutral-700 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Automated Insights</h3>
                        </div>
                        <p className="text-gray-400">Receive automated recommendations and insights for improving your social media strategy</p>
                    </div>
                </div>

                <div className="bg-neutral-800 rounded-xl p-8 animate__animated animate__fadeInRight">
                    <div className="bg-neutral-900 rounded-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-white font-semibold">AI Assistant Demo</h4>
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">You</span>
                                </div>
                                <div className="bg-neutral-800 rounded-lg p-3 flex-grow">
                                    <p className="text-gray-300">Compare video and image post performance last month</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">AI</span>
                                </div>
                                <div className="bg-neutral-800 rounded-lg p-3 flex-grow">
                                    <p className="text-gray-300">Analysis shows that video posts outperformed images by 43% in engagement. Videos averaged 892 interactions while images averaged 607 interactions per post.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                    <Link to ={'/api'} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                            Try AI Assistant Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
  )
}

export default AiAnalytics
