import React from 'react'
import Navbar from './navbar'
import Carsouel from './Carsouel'
import Features from './features'
import Actiontool from './Actiontool'
import Powerfulcuttingtech from './powerfulcuttingtech'
import AiAnalytics from './AiAnalytics'
import YCAnalyticsTool from './YCAnalyticsTool'
import GetinTouch from './getinTouch'
import Footer from './footer'
import './layout.css'
const layout = () => {
  return (
    <div>
    <Navbar/>
    <Carsouel/>
    <Features/>
    <Actiontool/>
    <Powerfulcuttingtech/>
    <AiAnalytics/>
    <YCAnalyticsTool/>
    <GetinTouch/>
    <Footer/>
    </div>
  )
}

export default layout
