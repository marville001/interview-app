import React, { useState } from "react";
import ConfirmAudioStep from "../components/ConfirmAudioStep";
import FamiliarizePage from "../components/FamiliarizePage";
import PracticeInterviewStep from "../components/PracticeInterviewStep";
import WelcomeStep from "../components/WelcomeStep";

const WelcomePage = () => {
  const [step, setStep] = useState(0);

  const steps = [
  <WelcomeStep step={step} setStep={setStep} />, 
  <ConfirmAudioStep step={step} setStep={setStep} />,
  <FamiliarizePage step={step} setStep={setStep} />,
  <PracticeInterviewStep step={step} setStep={setStep} />
];

  return (
    <div className="my-5">
      <h3>Candidate Portal</h3>
      {steps[step]}
    </div>
  );
};

export default WelcomePage;
