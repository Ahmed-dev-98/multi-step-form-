import React, { useContext, useEffect, useState } from "react";
import { ControllSteps } from "./ControllSteps";
import { FormContext, StepContext } from "./LayOut";
import { handleNext } from "../shared/stepsControllerFn";

const Finishing = () => {
  const { formData } = useContext(FormContext);
  const [total, setTotal] = useState(0);
  const onHold = false;
  const { currentStep, setCurrentStep } = useContext(StepContext);

  const changePlan = () => {
    setCurrentStep((prev) => (prev = 2));
  };

  const subTotal = () => {
    const sumAdds = [...formData.adds].reduce((a, b) => {
      if (formData.isMonthly) {
        return a + +b.pricingMonthly;
      } else {
        return a + +b.pricingYearly;
      }
    }, 0);
    const sumTotal = sumAdds + +formData.planPrice;
    setTotal(sumTotal);
    console.log(formData);
    console.log(sumTotal);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleNext(currentStep, setCurrentStep, onHold, e);
  };

  useEffect(() => {
    subTotal();
  }, []);

  return (
    <>
      <div className="felx flex-col gap-3 w-[90%] ">
        <div className="content mb-12">
          <h3 className="text-[#0b2b4d] text-3xl font-semibold ">
            Finishing Up
          </h3>
          <p className="text-[#a8a8b0] text-sm">
            Double-check everything is looks ok before confirming
          </p>
        </div>
        <div className="bg-[#c8e5de] p-2">
          <div className="plan flex justify-between items-center p-2  mb-3">
            <div className="text-xs font-semibold">
              <p className="text-[#00295b] font-bold text-sm">
                {formData.plan} {formData.isMonthly ? "(monthly)" : "(yearly)"}
              </p>
              <p
                className="text-[#a8a8b0] underline cursor-pointer hover:text-blue-800"
                onClick={changePlan}
              >
                Change
              </p>
            </div>
            <div className="">
              <p className="text-[#00295b] font-bold text-sm">
                ${formData.planPrice} {formData.isMonthly ? "/mo" : "/yr"}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="border-b border-gray-300 w-[90%] "></div>
          </div>
          {/* will add loop here  */}

          {formData.adds.map((add) => (
            <div
              key={add.name}
              className="adds flex justify-between items-center p-2  "
            >
              <div className="text-xs font-semibold">
                <p className="text-[#a8a8b0]  text-sm">{add.name}</p>
              </div>
              <div className="">
                <p className="text-[#1d2530] text-sm">
                  +$
                  {formData.isMonthly ? add.pricingMonthly : add.pricingYearly}
                  {formData.isMonthly ? "/mo" : "/yr"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-2">
          <div className="adds flex justify-between items-center p-2  ">
            <div className="text-xs font-semibold">
              <p className="text-[#a8a8b0]  text-sm">
                total {formData.isMonthly ? "(per month)" : "(per year)"}
              </p>
            </div>
            <div className="">
              <p className="text-[#5143cd] text-base font-bold">
                ${total}
                {formData.isMonthly ? "/mo" : "/yr"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={subTotal}>total</button> */}
      <ControllSteps onHold={onHold} onSubmit={onSubmit} />
    </>
  );
};

export default Finishing;
