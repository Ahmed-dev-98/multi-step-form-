import React, { useContext, useEffect } from "react";
import mobile from "../images/mobileImg.svg";
import { StepContext } from "../Components/LayOut";

const mobileContent = [
  {
    step: 1,
    content: "YOUR INFO",
  },
  {
    step: 2,
    content: "SELECTED PLAN",
  },
  {
    step: 3,
    content: "ADD-ONS",
  },
  {
    step: 4,
    content: "SUMMARY",
  },
];

const ImgComponent = () => {
  const { currentStep, setCurrentStep } = useContext(StepContext);
  const handleClickStep = (index) => {
    if (currentStep > index && currentStep !== 5) {
      return setCurrentStep((prev) => (prev = index));
    }
  };

  useEffect(() => {}, [currentStep]);

  return (
    <div className="left-side-container h-[70%] ">
      <div className="relative px-2 py-4">
        <img src={mobile} alt="" className="h" />
        <div className=" top-[6%] absolute w-full ">
          <ul className="  items-center justify-start w-full flex flex-col gap-6 ">
            {mobileContent.map((ele) => (
              <li
                key={ele.step}
                className="ms-7 flex justify-start items-center w-full "
              >
                <div
                  className={` ${
                    currentStep === ele.step
                      ? "bg-[#bde1fe]"
                      : "bg-transparent text-[#edeafb]"
                  } me-6 w-8 h-8 border border-white rounded-full flex justify-center items-center  ${currentStep > ele.step && currentStep !== 5 ? "cursor-pointer" : "cursor-not-allowed" }  `}
                  onClick={() => handleClickStep(ele.step)}
                >
                  {ele.step}
                </div>

                <div className="mobile-content">
                  <p className="text-base text-[#b1b1b8]">STEP {ele.step}</p>
                  <h3 className="text-base text-white font-semibold">
                    {ele.content}
                  </h3>{" "}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImgComponent;
