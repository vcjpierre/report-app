"use client";

import { useState } from "react";
import { ReportForm } from "./ReportForm";
import { ReportSubmitted } from "./ReportFormCompleted";

type ReportData = {
  [key: string]: any;
};

export function ReportWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const handleStepComplete = async (data: ReportData) => {
    setReportData((prev) => ({ ...prev, ...data }));

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const steps = [
    <ReportForm onComplete={handleStepComplete} />,
    reportData ? (
      <ReportSubmitted data={reportData} onComplete={handleStepComplete} />
    ) : (
      <p>Loading...</p>
    ),
  ];

  return (
    <div className="rounded-2xl bg-zinc-900 p-8">
      {steps[currentStep - 1] ?? <p>Loading...</p>}
    </div>
  );
}
