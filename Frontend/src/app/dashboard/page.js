"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Navigation from "@/Components/Navigation.jsx";
import DashboardChart from "@/Components/DashboardChart.jsx";

function DashboardPage() {
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gsap, setGsap] = useState(null);

  // Refs
  const summaryRef = useRef(null);
  const chartsRef = useRef(null);
  const historyRef = useRef(null);

  // Load GSAP dynamically
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap: gsapModule, ScrollToPlugin } = await import("gsap");
        gsapModule.registerPlugin(ScrollToPlugin);
        setGsap(gsapModule);
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };
    loadGSAP();

    return () => {
      if (gsap) gsap.killTweensOf(window);
    };
  }, []);

  // Load localStorage predictions
  useEffect(() => {
    try {
      const savedPredictions = localStorage.getItem("forestFirePredictions");
      if (savedPredictions) {
        setPredictions(JSON.parse(savedPredictions));
      }
    } catch (error) {
      console.error("Error loading predictions:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Chart data
  const chartData = useMemo(() => {
    if (predictions.length === 0)
      return { temperatureTrend: [], predictionTrend: [], riskDistribution: [] };

    const last5 = predictions.slice(0, 5).reverse();

    const temperatureTrend = last5.map((pred, i) => ({
      x: i + 1,
      y: pred.temperature,
      label: pred.date,
    }));

    const predictionTrend = last5.map((pred, i) => ({
      x: i + 1,
      y: pred.prediction,
      label: pred.date,
    }));

    const riskCounts = predictions.reduce((acc, pred) => {
      acc[pred.risk] = (acc[pred.risk] || 0) + 1;
      return acc;
    }, {});

    const riskDistribution = Object.entries(riskCounts).map(([risk, count]) => ({
      x: risk,
      y: count,
      label: risk,
    }));

    return { temperatureTrend, predictionTrend, riskDistribution };
  }, [predictions]);

  // Summary
  const summaryStats = useMemo(() => {
    if (predictions.length === 0) {
      return { total: 0, average: 0, highest: 0, lowest: 0 };
    }
    const values = predictions.map((p) => p.prediction);
    return {
      total: predictions.length,
      average: (values.reduce((s, v) => s + v, 0) / values.length).toFixed(1),
      highest: Math.max(...values).toFixed(1),
      lowest: Math.min(...values).toFixed(1),
    };
  }, [predictions]);

  // Risk styles
  const getRiskColor = useCallback((risk) => {
    switch (risk) {
      case "LOW":
        return "text-green-400";
      case "MEDIUM":
        return "text-yellow-400";
      case "HIGH":
        return "text-orange-400";
      case "EXTREME":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  }, []);

  const getRiskBgColor = useCallback((risk) => {
    switch (risk) {
      case "LOW":
        return "bg-green-500/20";
      case "MEDIUM":
        return "bg-yellow-500/20";
      case "HIGH":
        return "bg-orange-500/20";
      case "EXTREME":
        return "bg-red-500/20";
      default:
        return "bg-gray-500/20";
    }
  }, []);

  // Smooth scroll
  const scrollToSection = useCallback(
    (sectionRef, offset = 80) => {
      if (sectionRef.current && gsap && gsap.to && gsap.ScrollToPlugin) {
        try {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: sectionRef.current, offsetY: offset },
            ease: "power2.out",
          });
        } catch {
          sectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [gsap]
  );

  const scrollToSummary = useCallback(
    () => scrollToSection(summaryRef, 80),
    [scrollToSection]
  );
  const scrollToCharts = useCallback(
    () => scrollToSection(chartsRef, 80),
    [scrollToSection]
  );
  const scrollToHistory = useCallback(
    () => scrollToSection(historyRef, 80),
    [scrollToSection]
  );

  // Loading
  if (isLoading || !gsap) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-[#c9d1d9]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58a6ff] mx-auto"></div>
            <p className="mt-4 text-[#8b949e]">
              {isLoading
                ? "Loading your predictions..."
                : "Loading smooth scrolling..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (predictions.length === 0) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen bg-[#0d1117] py-8 px-4 sm:px-6 lg:px-8 text-[#c9d1d9]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg shadow p-12">
              <div className="text-6xl mb-6">🔥</div>
              <h1 className="text-3xl font-bold mb-4">No Predictions Yet</h1>
              <p className="text-lg text-[#8b949e] mb-8">
                You haven't made any forest fire predictions yet. Make your
                first prediction to see your history here!
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Make Your First Prediction
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-[#0d1117] py-8 px-4 sm:px-6 lg:px-8 text-[#c9d1d9]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Your Forest Fire Predictions
            </h1>
            <p className="text-lg text-[#8b949e] mb-6">
              Track your prediction history and analyze trends
            </p>

            {/* Quick Nav */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={scrollToSummary}
                className="bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                📊 Summary
              </button>
              <button
                onClick={scrollToCharts}
                className="bg-[#21262d] hover:bg-[#30363d] text-green-400 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                📈 Charts
              </button>
              <button
                onClick={scrollToHistory}
                className="bg-[#21262d] hover:bg-[#30363d] text-purple-400 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                📋 History
              </button>
            </div>
          </div>

          {/* Summary */}
          <div
            ref={summaryRef}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 text-center hover:bg-[#21262d] transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Total Predictions</h3>
              <div className="text-3xl font-bold text-[#58a6ff]">
                {summaryStats.total}
              </div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 text-center hover:bg-[#21262d] transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Average Risk</h3>
              <div className="text-3xl font-bold text-orange-400">
                {summaryStats.average}
              </div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 text-center hover:bg-[#21262d] transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Highest Risk</h3>
              <div className="text-3xl font-bold text-red-400">
                {summaryStats.highest}
              </div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 text-center hover:bg-[#21262d] transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Lowest Risk</h3>
              <div className="text-3xl font-bold text-green-400">
                {summaryStats.lowest}
              </div>
            </div>
          </div>

          {/* Charts */}
          <div
            ref={chartsRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            <DashboardChart
              data={chartData.temperatureTrend}
              type="line"
              title="Temperature Trend (Last 5 Predictions)"
              height={250}
            />
            <DashboardChart
              data={chartData.predictionTrend}
              type="line"
              title="Fire Risk Trend (Last 5 Predictions)"
              height={250}
            />
          </div>

          <div className="mb-8">
            <DashboardChart
              data={chartData.riskDistribution}
              type="bar"
              title="Risk Level Distribution"
              height={250}
            />
          </div>

          {/* Table */}
          <div
            ref={historyRef}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Your Prediction History
            </h2>
            <div className="p-2 overflow-x-auto">
              <table className="min-w-full divide-y divide-[#30363d]">
                <thead className="bg-[#0d1117]">
                  <tr>
                    {[
                      "Date",
                      "Temperature",
                      "Humidity",
                      "Wind",
                      "Rainfall",
                      "Risk Score",
                      "Risk Level",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-medium text-[#8b949e] uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30363d]">
                  {predictions.map((prediction) => (
                    <tr
                      key={prediction.id}
                      className="hover:bg-[#21262d] transition-all duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c9d1d9]">
                        {prediction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c9d1d9]">
                        {parseFloat(prediction.temperature).toFixed(1)}°C
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c9d1d9]">
                        {parseFloat(prediction.humidity).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c9d1d9]">
                        {parseFloat(prediction.windSpeed).toFixed(1)} km/h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c9d1d9]">
                        {parseFloat(prediction.rainfall).toFixed(1)} mm
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c9d1d9]">
                        {parseFloat(prediction.prediction).toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskBgColor(
                            prediction.risk
                          )} ${getRiskColor(prediction.risk)}`}
                        >
                          {prediction.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Make New Prediction
            </button>
            <button
              onClick={() => (window.location.href = "/about")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
