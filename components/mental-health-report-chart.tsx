"use client";

import React, { useMemo, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  TrendingUp,
  Zap,
  Smile,
  Heart,
  Info,
  ArrowDownCircle,
  ArrowUpCircle,
  BarChart,
  HelpCircle,
} from "lucide-react";
import { DownloadReport } from "./download-report";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

type Metric = "stress" | "wellbeing" | "mood";
interface MetricConfig {
  label: string;
  unit: string;
  icon: React.ElementType;
  colors: string[];
}

const METRIC_CONFIGS: Record<Metric, MetricConfig> = {
  stress: {
    label: "Stress Levels",
    unit: "Impact",
    icon: ArrowUpCircle,
    colors: ["#ef4444", "#f97316"],
  }, // Red, Orange
  wellbeing: {
    label: "Wellbeing Activities",
    unit: "Frequency",
    icon: ArrowDownCircle,
    colors: ["#22c55e", "#14b8a6"],
  }, // Green, Teal
  mood: {
    label: "Overall Mood",
    unit: "Score",
    icon: BarChart,
    colors: ["#8b5cf6", "#6366f1"],
  }, // Purple, Indigo
};

const mockData = {
  "Last 7 Days": {
    stress: [6, 7, 5, 8, 6, 7, 5],
    wellbeing: [3, 4, 5, 2, 6, 4, 7],
    mood: [4, 3, 5, 2, 6, 4, 7],
  },
  "Previous Week": {
    stress: [5, 6, 6, 7, 5, 5, 6],
    wellbeing: [4, 3, 4, 3, 5, 4, 5],
    mood: [5, 4, 4, 3, 5, 5, 4],
  },
};

const mockSummary = {
  stress:
    "Your stress levels were highest mid-week, often linked to academic deadlines. Consider exploring time management techniques.",
  wellbeing:
    "You engaged in more wellbeing activities over the weekend, which positively correlated with your mood. Great job prioritizing self-care!",
  mood: "Your overall mood shows a positive trend towards the end of the week. Keep building on the habits that are helping you feel better.",
};

export const MentalHealthReportChart: React.FC<{ onFollowUp: (query: string) => void }> = ({
  onFollowUp,
}) => {
  const chartRef = useRef<ChartJS<"line">>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeMetric, setActiveMetric] = useState<Metric>("mood");

  const summaryText = mockSummary;
  const locations = ["Last 7 Days", "Previous Week"];
  const years = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = mockData;

  const chartData = useMemo(() => {
    const createGradient = (ctx: CanvasRenderingContext2D, color: string) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, `${color}33`);
      gradient.addColorStop(1, `${color}00`);
      return gradient;
    };
    const colors = METRIC_CONFIGS[activeMetric].colors;

    return {
      labels: years.map(String),
      datasets: locations.map((loc, index) => ({
        label: loc,
        data: data[loc as keyof typeof data]?.[activeMetric] || [],
        borderColor: colors[index % colors.length],
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) return "transparent";
          return createGradient(
            context.chart.ctx,
            colors[index % colors.length]
          );
        },
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: colors[index % colors.length],
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: colors[index % colors.length],
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 3,
        fill: true,
      })),
    };
  }, [locations, years, data, activeMetric]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index" as const, intersect: false },
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
      },
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            padding: 20,
            font: {
              size: 12,
              weight: "bold" as const,
            },
            color: "#ffffff",
          },
        },
        title: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(10, 10, 10, 0.8)",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          bodyFont: { size: 12 },
          titleFont: { size: 14, weight: "bold" },
          padding: 12,
          borderColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: 1,
          caretSize: 8,
          cornerRadius: 6,
          displayColors: true,
          callbacks: {
            title: (items: any) => `Day: ${items[0].label}`,
            label: (context: any) => {
              const value = context.raw.toFixed(2);
              return `${context.dataset.label}: ${value} ${METRIC_CONFIGS[activeMetric].unit}`;
            },
          },
        },
        annotation: {
          annotations: {
            title: {
              type: "label" as const,
              content: `${METRIC_CONFIGS[activeMetric].label} Trends`,
              font: { size: 16, weight: "bold" },
              color: "#ffffff",
              x: "5%",
              y: "5%",
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#9ca3af" },
          border: { color: "#374151" },
        },
        y: {
          beginAtZero: false,
          grid: { color: "#1f2937" },
          ticks: { color: "#9ca3af", callback: (value: any) => `${value}` },
          title: {
            display: true,
            text: `Score / Frequency`,
            color: "#d1d5db",
          },
        },
      },
    }),
    [activeMetric]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="w-full overflow-hidden bg-gray-900/50 border border-white/10 backdrop-blur-lg shadow-lg text-white" ref={cardRef}>
        <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <TrendingUp className="h-6 w-6 text-purple-300" />
            </div>
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold text-white">
                Weekly Wellness Report
              </CardTitle>
              <p className="text-sm text-gray-400 mt-1">
                Your personalized mental health summary
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2 pb-4 sm:px-4">
          <div className="p-1 mb-4 flex justify-center gap-2 bg-gray-800/60 rounded-full">
            <LayoutGroup>
              {(Object.keys(METRIC_CONFIGS) as Metric[]).map((metric) => (
                <motion.button
                  key={metric}
                  onClick={() => setActiveMetric(metric)}
                  className={`relative flex-1 text-sm font-semibold py-1.5 rounded-full focus:outline-none text-gray-300`}
                >
                  {activeMetric === metric && (
                    <motion.div
                      layoutId="active-metric-pill"
                      className="absolute inset-0 bg-gray-700/80 shadow-md rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {(() => {
                      const Icon = METRIC_CONFIGS[metric].icon;
                      return (
                        <Icon
                          className={`h-4 w-4 ${
                            activeMetric === metric
                              ? `text-[${METRIC_CONFIGS[metric].colors[0]}]`
                              : "text-gray-400"
                          }`}
                        />
                      );
                    })()}
                    {METRIC_CONFIGS[metric].label}
                  </span>
                </motion.button>
              ))}
            </LayoutGroup>
          </div>

          <div className="h-80 relative">
            <Line
              ref={chartRef}
              data={chartData}
              options={chartOptions as any}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMetric}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800/70 border border-white/10 rounded-lg p-4 text-sm text-gray-300 mt-6"
            >
              <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
                <Info className="h-4 w-4 text-purple-400" /> AI Insight for{" "}
                {METRIC_CONFIGS[activeMetric].label}
              </h4>
              <p>{summaryText[activeMetric]}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-2 pt-4">
            <h4 className="w-full text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-amber-400" /> Suggested
              follow-ups:
            </h4>
            {[
                {
                  label: `Techniques to manage stress`,
                  query: `What are some effective techniques to manage academic stress?`,
                },
                {
                  label: "How to improve my mood?",
                  query: `What are some simple activities to improve my mood?`,
                },
                {
                  label: "Tell me about wellbeing activities",
                  query: `What are wellbeing activities?`,
                },
                {
                  label: "Why is my stress high?",
                  query: `Why was my stress level high on Thursday?`,
                },
              ].slice(0, 4).map((item, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="bg-gray-800/50 hover:bg-gray-700/80 text-gray-300 border-white/20"
                  onClick={() => onFollowUp(item.query)}
                >
                  {item.label}
                </Button>
              ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10 mt-4">
            <DownloadReport
              targetRef={cardRef}
              fileName={`weekly-wellness-report`}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
