"use client";
import React, { useEffect, useState } from "react";

const PredictionResultModal = ({ isOpen, onClose, prediction, formData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationStep(0);

      const timer1 = setTimeout(() => setAnimationStep(1), 100);
      const timer2 = setTimeout(() => setAnimationStep(2), 300);
      const timer3 = setTimeout(() => setAnimationStep(3), 600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setIsVisible(false);
      setAnimationStep(0);
    }
  }, [isOpen]);

  const getRiskLevel = (predictionValue) => {
    if (predictionValue == 1)
      return {
        level: "LOW CHANCE",
        color: "text-green-400",
        bgColor: "bg-green-900/30",
        icon: "🟢",
        description: "Minimal fire risk",
      };

    return {
      level: "HIGH CHANCE",
      color: "text-red-500",
      bgColor: "bg-red-900/30",
      icon: "🔴",
      description: "Extreme fire risk",
    };
  };

  const getRiskAdvice = (riskLevel) => {
    switch (riskLevel) {
      case "LOW":
        return "Continue monitoring conditions. Fire risk is minimal.";
      case "EXTREME":
        return "CRITICAL! Immediate action required.";
      default:
        return "Monitor conditions and stay alert.";
    }
  };

  const riskInfo = getRiskLevel(prediction);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          animationStep >= 1 ? "opacity-70" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 ${
          animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } max-h-[90vh] overflow-y-auto scrollbar-hide`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl border-b border-[#30363d]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#238636] via-[#58a6ff] to-[#f78166] opacity-90" />
          <div className="relative p-6 text-center text-white">
            <div
              className={`text-6xl mb-4 transform transition-all duration-700 ${
                animationStep >= 3 ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            >
              {riskInfo.icon}
            </div>
            <h2 className="text-2xl font-bold mb-2">Fire Risk Assessment</h2>
            <p className="text-gray-200">Based on environmental conditions</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-gray-200">
          {/* Risk Level */}
          <div
            className={`text-center mb-6 transition-all duration-700 delay-200 ${
              animationStep >= 3
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div
              className={`inline-flex items-center px-6 py-3 rounded-full ${riskInfo.bgColor} ${riskInfo.color} mb-3`}
            >
              <span className="text-2xl mr-2">{riskInfo.icon}</span>
              <span className="text-xl font-bold">{riskInfo.level}</span>
            </div>
            <p className="text-gray-400 text-sm">{riskInfo.description}</p>
          </div>

          {/* Environmental Factors */}
          <div
            className={`mb-6 transition-all duration-700 delay-400 ${
              animationStep >= 3
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-3">
              Environmental Conditions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🌡️</div>
                <div className="text-sm text-gray-400">Temperature</div>
                <div className="font-semibold text-white">
                  {formData.Temperature}°C
                </div>
              </div>
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">💧</div>
                <div className="text-sm text-gray-400">Humidity</div>
                <div className="font-semibold text-white">{formData.RH}%</div>
              </div>
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">💨</div>
                <div className="text-sm text-gray-400">Wind Speed</div>
                <div className="font-semibold text-white">
                  {formData.Ws} km/h
                </div>
              </div>
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🌧️</div>
                <div className="text-sm text-gray-400">Rainfall</div>
                <div className="font-semibold text-white">
                  {formData.Rain} mm
                </div>
              </div>
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-sm text-gray-400">Fire Weather Index</div>
                <div className="font-semibold text-white">
                  {formData.FWI}
                </div>
              </div>
            </div>
          </div>

          {/* Safety Advice */}
          <div
            className={`bg-[#161b22] border-l-4 border-yellow-400 p-4 mb-6 transition-all duration-700 delay-500 ${
              animationStep >= 3
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-start">
              <div className="text-yellow-400 text-xl mr-3">⚠️</div>
              <div>
                <h4 className="font-semibold text-yellow-400 mb-1">
                  Safety Advice
                </h4>
                <p className="text-gray-300 text-sm">
                  {getRiskAdvice(riskInfo.level)}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div
            className={`flex gap-3 transition-all duration-700 delay-600 ${
              animationStep >= 3
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <button
              onClick={onClose}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Close
            </button>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="flex-1 bg-[#238636] hover:bg-[#2ea043] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultModal;
