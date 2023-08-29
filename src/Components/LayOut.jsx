import React, { useEffect } from "react";
import ImgComponent from "./ImgComponent";
import { useState, createContext } from "react";
import PersonalInfo from "./PersonalInfo";
import PickPlan from "./PickPlan";
import PickAdds from "./PickAdds";
import Finishing from "./Finishing";
import ThankYou from "./ThankYou";

export const StepContext = createContext();
export const FormContext = createContext();
export const LayOut = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    isMonthly: true,
    planPrice: "",
    adds: [{}],
  });

  useEffect(() => {}, [currentStep]);

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep }}>
      <div className=" flex bg-white justify-center items-center gap-[4rem] px-3 rounded-xl shadow-xl ">
        <ImgComponent />
        <FormContext.Provider value={{ formData, setFormData }}>
          <div className="flex flex-col justify-center items-center">
            <div className="bg-red-0 min-h-[27rem] min-w-[27rem] p-5">
              {currentStep === 1 && <PersonalInfo />}
              {currentStep === 2 && <PickPlan />}
              {currentStep === 3 && <PickAdds />}
              {currentStep === 4 && <Finishing />}
              {currentStep === 5 && <ThankYou />}
            </div>
          </div>
        </FormContext.Provider>
      </div>
    </StepContext.Provider>
  );
};
