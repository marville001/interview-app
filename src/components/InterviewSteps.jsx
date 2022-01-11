import React, { useState } from "react";
import ConfirmAudioStep from "./interview/ConfirmAudioStep";
import CorrectDetailsStep from "./interview/CorrectDetailsStep";
import FamiliarizeStep from "./interview/FamiliarizeStep";
import InterviewStep from "./interview/InterviewStep";
import PracticeInterviewStep from "./interview/PracticeInterviewStep";
import PreInterviewStep from "./interview/PreInterviewStep";
import SuccessStep from "./interview/SuccessStep";
import WelcomeStep from "./interview/WelcomeStep";

const InterviewSteps = ({ form }) => {
  const [step, setStep] = useState(0);

  const first = form ? (
    <CorrectDetailsStep />
  ) : (
    <WelcomeStep step={step} setStep={setStep} />
  );

  const steps = [
    first,
    <ConfirmAudioStep step={step} setStep={setStep} />,
    <FamiliarizeStep step={step} setStep={setStep} />,
    <PracticeInterviewStep step={step} setStep={setStep} />,
    <PreInterviewStep step={step} setStep={setStep} />,
    <InterviewStep step={step} setStep={setStep} />,
    <SuccessStep />,
  ];

  return (
    <div className="my-5">
      <h3>Candidate Portal</h3>
      {steps[step]}
    </div>
  );
};

export default InterviewSteps;
