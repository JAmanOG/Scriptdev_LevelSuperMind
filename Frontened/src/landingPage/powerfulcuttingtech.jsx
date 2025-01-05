import React from 'react'

const Powerfulcuttingtech = () => {
  return (
<div id="root">
    <section id="about" className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powered by Cutting-Edge Technology</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Built with modern tech stack ensuring scalability, performance, and reliability</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                <div className="bg-neutral-900 p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeInUp">
                    <div className="h-16 w-16 bg-blue-600/10 rounded-lg flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">LangFlow</h3>
                    <p className="text-gray-400">AI agent powered by GPT-4 and WorkFlow for intelligent analysis</p>
                    <div className="mt-4">
                        <span className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">AI Processing</span>
                    </div>
                </div>

                <div className="bg-neutral-900 p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeInUp" style={{animationDelay: "0.2s"}}>
                    <div className="h-16 w-16 bg-green-600/10 rounded-lg flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">DataStax Astra</h3>
                    <p className="text-gray-400">Scalable and efficient database management system</p>
                    <div className="mt-4">
                        <span className="inline-block bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">Database</span>
                    </div>
                </div>

                <div className="bg-neutral-900 p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeInUp" style={{animationDelay: "0.4s"}}>
                    <div className="h-16 w-16 bg-purple-600/10 rounded-lg flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">React</h3>
                    <p className="text-gray-400">Modern and responsive frontend development</p>
                    <div className="mt-4">
                        <span className="inline-block bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">Frontend</span>
                    </div>
                </div>

                <div className="bg-neutral-900 p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeInUp" style={{animationDelay: "0.6s"}}>
                    <div className="h-16 w-16 bg-yellow-600/10 rounded-lg flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Node.js</h3>
                    <p className="text-gray-400">Powerful and scalable backend infrastructure</p>
                    <div className="mt-4">
                        <span className="inline-block bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm">Backend</span>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center animate__animated animate__fadeIn">
                <p className="text-gray-400 mb-8">Built with industry-standard technologies for optimal performance</p>
                <div className="flex flex-wrap justify-center gap-6">
                    <span className="px-4 py-2 bg-neutral-900 rounded-full text-gray-400">TypeScript</span>
                    <span className="px-4 py-2 bg-neutral-900 rounded-full text-gray-400">MongoDB</span>
                    <span className="px-4 py-2 bg-neutral-900 rounded-full text-gray-400">Docker</span>
                    <span className="px-4 py-2 bg-neutral-900 rounded-full text-gray-400">AWS</span>
                </div>
            </div>
        </div>
    </section>
</div>
  )
}

export default Powerfulcuttingtech
