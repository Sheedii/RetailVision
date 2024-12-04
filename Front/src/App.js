/* eslint-disable no-unused-vars */
import './App.css';
import logo from './assets/petit.png';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Home, OurServices, AboutUs, Heatmap, ForecastingPage, AffinityTestingTop10,
  HeatMapComparator, HeatmapFlow, TimeLinePage,
  Comparator, LoginV2, SecondPriceIndexPage, CorrelationPage, ComparatorPage
} from './pages';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import PriceIndexPage from './pages/PriceIndexPage/PriceIndexPage';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Heatmap2 from './customerBehavior/heatmap/HeatMap';
import{HeatmapInfo, HeatmapCom, PathCom, HtmCompartor } from './customerBehavior'
function App() {
  useEffect(() => {
    document.title = 'WiseVision';
    const changeFavicon = (src) => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = src;
    };

    changeFavicon(logo);
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<LoginV2 />} />

        <Route element={<PrivateRoute />}>
          <Route path="/HeatMap" element={<Heatmap />} />
          <Route path="/cmprt/:start/:end" element={<Comparator />} />
          <Route path="/TimeLine" element={<TimeLinePage />} />
          <Route path="/Dashboard" element={<DashboardPage />} />


          <Route path="/HeatMapFlow/:start/:end" element={<HeatmapFlow />} />
          <Route path="/HeatMapComparator" element={<HeatMapComparator />} />



          <Route path="/Forecast" element={<ForecastingPage />} />
          <Route path="/Heatmap2" element={<Heatmap2 />} />
          <Route path="/HeatmapCom" element={<HeatmapCom />} />
          <Route path="/HeatmapInfo" element={<HeatmapInfo />} />
          <Route path="/PathCom" element={<PathCom />} />
          <Route path="/HtmCompartor" element={<HtmCompartor />} />


          <Route path="/priceIndex" element={<PriceIndexPage />} />
          <Route path="/SecondPriceIndexPage" element={<SecondPriceIndexPage />} />
          <Route path="/Top10" element={<AffinityTestingTop10 />} />        
          <Route path="/correlation2" element={<CorrelationPage />} />
          <Route path="/Comprator2" element={<ComparatorPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
