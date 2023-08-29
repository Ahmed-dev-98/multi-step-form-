import React, { useContext } from "react";
import { StepContext } from "./LayOut";
import { handleNext, handlePrev } from "../shared/stepsControllerFn";

export const ControllSteps = ({ onSubmit, onHold  }) => {
  const { currentStep, setCurrentStep } = useContext(StepContext);

  return (
    <div className="flex justify-between items-center w-full mt-12 ">
      {currentStep >= 2 ? (
        <button
          className="w-fit px-6 py-3 rounded-lg text-[#03295a] font-semibold"
          onClick={() => handlePrev(setCurrentStep)}
        >
          Go Back
        </button>
      ) : (
        ""
      )}
      <button
        type="submit"
        className={`w-fit px-6 py-3 rounded-lg bg-blue-900 ms-auto  text-white  ${
          !onHold ? "cursor-pointer" : "cursor-not-allowed"
        } `}
        onClick={(e) => {
          // handleNext(currentStep, setCurrentStep, onHold, e);
          onSubmit && onSubmit(e);
        }}
      >
        {currentStep === 4 ? "Confirm" : "Next Step"}
      </button>
    </div>
  );
};
