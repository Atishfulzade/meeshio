import React, { useState } from "react";
import Cart from "./Cart";
import Address from "./Address";
import Payment from "./Payment";
import Summary from "./Summary";

const Stepper = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Cart prevStep={prevStep} nextStep={nextStep} />;
      case 1:
        return <Address prevStep={prevStep} nextStep={nextStep} />;
      case 2:
        return <Payment prevStep={prevStep} nextStep={nextStep} />;
      case 3:
        return <Summary prevStep={prevStep} />;
      default:
        return <Cart />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-between items-center mb-4 w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`w-7 h-7 flex items-center justify-center rounded-full ${
                currentStep === index
                  ? "bg-fuchsia-600 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {index + 1}
            </div>
            <div>{step}</div>

            {index < steps.length && (
              <div className="h-1 bg-fuchsia-700 flex-grow w-full mx-2"></div>
            )}
          </div>
        ))}
      </div>

      {/* Render the content for the current step */}
      <div className="w-full">{renderStepContent(currentStep)}</div>
    </div>
  );
};

export default Stepper;
