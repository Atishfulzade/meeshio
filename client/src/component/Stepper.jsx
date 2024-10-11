import React, { useState } from "react";
import Cart from "./Cart";
import Address from "./Address";
import Payment from "./Payment";
import Summary from "./Summary";
import { useSelector } from "react-redux";

const Stepper = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const discountPercentage = 0.2;
  const discountedPrice = totalPrice * (1 - discountPercentage);

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
        return (
          <Cart
            nextStep={nextStep}
            totalPrice={totalPrice}
            discountPercentage={discountPercentage}
            discountedPrice={discountedPrice}
          />
        );
      case 1:
        return (
          <Address
            prevStep={prevStep}
            nextStep={nextStep}
            totalPrice={totalPrice}
            discountPercentage={discountPercentage}
            discountedPrice={discountedPrice}
          />
        );
      case 2:
        return (
          <Payment
            prevStep={prevStep}
            nextStep={nextStep}
            totalPrice={totalPrice}
            discountPercentage={discountPercentage}
            discountedPrice={discountedPrice}
          />
        );
      case 3:
        return (
          <Summary
            prevStep={prevStep}
            totalPrice={totalPrice}
            discountPercentage={discountPercentage}
            discountedPrice={discountedPrice}
          />
        );
      default:
        return <Cart />;
    }
  };

  return (
    <>
      {cart.length === 0 ? (
        <div className="text-3xl text-center my-auto font-mier-demi h-32 text-fuchsia-700 mt-52">
          Your Cart is Empty
        </div>
      ) : (
        <div className="w-full flex flex-col items-center mt-20 md:mt-0">
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
      )}
    </>
  );
};

export default Stepper;
