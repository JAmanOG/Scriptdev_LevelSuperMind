import React from 'react'
import './Carsouel.css'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Carsouel = () => {
    const navigate = useNavigate();
    const handleRedirect = () => {
        window.location.href = "https://www.youtube.com/watch?v=NnlVEbHwZvo";
      };
      
 
              

  return (
<div id="root">
    <section id="hero" className="bg-neutral-900 pt-16 min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-1/2 text-center lg:text-left animate__animated animate__fadeInLeft">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Social Media Analytics 
                        <span className="text-blue-500">Reimagined</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl mb-8">
                        Transform your social media strategy with AI-powered insights. Compare post performance, track engagement metrics, and make data-driven decisions in real-time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to={'/api'} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105">
                            Get Started Free
                        </Link>
                        <button onClick={handleRedirect} className="border border-gray-500 hover:border-blue-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-300">
                            View Demo
                        </button>
                    </div>
                    <div className="mt-8 flex items-center justify-center lg:justify-start gap-8">
                        <div className="text-center">
                            <h3 className="text-blue-500 text-2xl font-bold">98%</h3>
                            <p className="text-gray-400">Accuracy Rate</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-blue-500 text-2xl font-bold">24/7</h3>
                            <p className="text-gray-400">Real-time Analysis</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-blue-500 text-2xl font-bold">500+</h3>
                            <p className="text-gray-400">Active Users</p>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 mt-12 lg:mt-0 animate__animated animate__fadeInRight">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30"></div>
                        <img src="https://calm-grass-040f99400.4.azurestaticapps.net/Script%20Dev-Circle.png" alt="Analytics Dashboard" className="relative rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"/>
                    </div>
                </div>
            </div>
        </div>
    <div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>
    </section>
</div>
  )
}

export default Carsouel
