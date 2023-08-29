import React, { useContext, useEffect } from "react";
import plan1 from "../images/icon-arcade.svg";
import plan2 from "../images/icon-advanced.svg";
import plan3 from "../images/icon-pro.svg";
import { useState } from "react";
import { ControllSteps } from "./ControllSteps";
import { FormContext, StepContext } from "./LayOut";
import { handleNext } from "../shared/stepsControllerFn";

const plans = [
  {
    name: "Arcade",
    img: plan1,
    monthlyPrice: "9",
    yearlyPrice: "90",
  },
  {
    name: "Advanced",
    img: plan2,
    monthlyPrice: "12",
    yearlyPrice: "120",
  },
  {
    name: "pro",
    img: plan3,
    monthlyPrice: "15",
    yearlyPrice: "150",
  },
];

const PickPlan = () => {
  const [plan, setPlan] = useState({});
  const { formData, setFormData } = useContext(FormContext);
  const [isMonthly, setIsMonthly] = useState(formData.isMonthly);
  const [onHold, setOnHold] = useState(true);
  const [isPlalnClicked, setIsPlanClicked] = useState("");
  const { currentStep, setCurrentStep } = useContext(StepContext);

  const userInfo = { ...formData };

  const clickedPlan = (item) => {
    setIsPlanClicked((prev) => (prev = item.name));
    setPlan((prev) => (prev = item));
    setOnHold(false);
  };

  const getPLan = (plan) => {
    userInfo["plan"] = plan.name;

    if (isMonthly) {
      userInfo["planPrice"] = plan.monthlyPrice;
    } else {
      userInfo["planPrice"] = plan.yearlyPrice;
    }
  };

  const onSubmit = (e) => {
    getPLan(plan);
    setFormData(userInfo);
    e.preventDefault();
    handleNext(currentStep, setCurrentStep, onHold, e);
  };

  const togglePrice = () => {
    setIsMonthly(!isMonthly);
    userInfo["isMonthly"] = !isMonthly;
    setFormData(userInfo);
  };
  useEffect(() => {}, [isMonthly]);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-[#0b2b4d] text-3xl font-semibold ">
            Select your plan
          </h2>
          <p className="text-[#b1b1b8]">
            you have the option of monthly or yearly billing.
          </p>
        </div>

        <div className="plans-container flex gap-8 justify-start items-center">
          {plans.map((item) => (
            <div
              key={Math.random()}
              id={`${item.name}`}
              className={`flex flex-col justify-between gap-8 p-3 border ${
                isPlalnClicked === item.name
                  ? "bg-sky-100  border-blue-700"
                  : ""
              }  w-[8rem] rounded-xl`}
              onClick={() => clickedPlan(item)}
            >
              <div>
                <img src={item.img} className="w-[2rem]" alt="" />
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-[#1d355b] font-semibold">{item.name}</p>
                  <span className="text-[#b4b6ba]">
                    {isMonthly
                      ? `$${item.monthlyPrice}/mo`
                      : `$${item.yearlyPrice}/yr`}
                  </span>
                </div>

                <span
                  className={`${
                    isMonthly ? "opacity-0" : "opacity-1"
                  } transition-all duration-700 text-[#4c70a1] font-semibold whitespace-nowrap`}
                >
                  2 months free
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex  justify-center items-center gap-4">
          <div className="text-end ">
            <p
              className={`${
                isMonthly ? "" : "text-[#a9a9b3]"
              } transition-all duration-300 `}
            >
              Monthly
            </p>
          </div>
          <div
            className={`switch w-20 h-8   rounded-full relative ${
              isMonthly ? "bg-[#022758] " : "bg-white"
            } cursor-pointer border border-blue-800 duration-500 transition-all `}
            onClick={togglePrice}
          >
            <div
              className={`absolute top-1/2 mx-1 -translate-y-1/2 w-6 h-6 rounded-full  ${
                isMonthly ? " left-0 bg-white" : "left-12   bg-[#022758]"
              } duration-500 transition-all `}
            ></div>
          </div>

          <p
            className={`${
              isMonthly ? "text-[#a9a9b3]" : ""
            } transition-all duration-300 `}
          >
            yearly
          </p>
        </div>
      </div>
      <ControllSteps onHold={onHold} onSubmit={onSubmit} />
    </>
  );
};

export default PickPlan;
