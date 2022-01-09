import React, { useState } from "react";
import ConfirmAudioStep from "../components/ConfirmAudioStep";
import FamiliarizePage from "../components/FamiliarizePage";
import InterviewPage from "../components/InterviewPage";
import PracticeInterviewStep from "../components/PracticeInterviewStep";
import PreInterviewStep from "../components/PreInterviewStep";
import SuccessStep from "../components/SuccessStep";
import WelcomeStep from "../components/WelcomeStep";

const WelcomePage = () => {
  const [step, setStep] = useState(5);

  const steps = [
    <WelcomeStep step={step} setStep={setStep} />,
    <ConfirmAudioStep step={step} setStep={setStep} />,
    <FamiliarizePage step={step} setStep={setStep} />,
    <PracticeInterviewStep step={step} setStep={setStep} />,
    <PreInterviewStep step={step} setStep={setStep} />,
    <InterviewPage step={step} setStep={setStep} />,
    <SuccessStep />,
  ];

  return (
    <div className="my-5">
      <h3>Candidate Portal</h3>
      {steps[step]}
    </div>
  );
};

export default WelcomePage;
