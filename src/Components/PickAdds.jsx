import React, { useContext, useState } from "react";
import { ControllSteps } from "./ControllSteps";
import { FormContext, StepContext } from "./LayOut";
import { useEffect } from "react";
import { handleNext } from "../shared/stepsControllerFn";

const PickAdds = () => {
  const { formData, setFormData } = useContext(FormContext);
  const { currentStep, setCurrentStep } = useContext(StepContext);

  const [isChecked, setIsChecked] = useState([]);
  const [checkedBoxs, setCheckedBoxs] = useState([]);
  const [onHold, setOnHold] = useState(true);

  const addsPlan = [
    {
      name: "online service",
      describe: "access to multiplayer games",
      pricingMonthly: "1",
      pricingYearly: "10",
    },
    {
      name: "larger storage",
      describe: "extra 1 TB of cloud save",
      pricingMonthly: "2",
      pricingYearly: "20",
    },
    {
      name: "costumizable profile",
      describe: "custome theme of your profile ",
      pricingMonthly: "2",
      pricingYearly: "20",
    },
  ];

  const handleCheck = (plan) => {
    if (checkedBoxs.filter((box) => box.name === plan.name).length === 0) {
      setCheckedBoxs((prev) => (prev = [...prev, plan]));
      if (!isChecked.includes(plan.name)) {
        setIsChecked((prev) => (prev = [...prev, plan.name]));
      }
      return setOnHold(false);
    } else if (checkedBoxs.filter((box) => box.name === plan.name).length > 0) {
      setCheckedBoxs(
        (prev) => (prev = prev.filter((box) => box.name !== plan.name))
      );
      setIsChecked(
        (prev) => (prev = isChecked.filter((item) => item !== plan.name))
      );
      setOnHold(true);
    }
  };
  const handleChekc = (plan) => {
    if (checkedBoxs.filter((box) => box.name === plan.name).length === 0) {
      setCheckedBoxs((prev) => (prev = [...prev, plan]));
      if (!isChecked.includes(plan.name)) {
        setIsChecked((prev) => (prev = [...prev, plan.name]));
      }
      console.log(isChecked);
      return setOnHold(false);
    } else if (checkedBoxs.filter((box) => box.name === plan.name).length > 0) {
      setCheckedBoxs(
        (prev) => (prev = prev.filter((box) => box.name !== plan.name))
      );
      setIsChecked(
        (prev) => (prev = isChecked.filter((item) => item !== plan.name))
      );
      console.log(isChecked);
      setOnHold(true);
    }
  };
  const onSubmit = (e) => {
    const userInfo = { ...formData };
    userInfo["adds"] = checkedBoxs;
    setFormData(userInfo);
    handleNext(currentStep, setCurrentStep , onHold , e);
  };
  useEffect(() => {}, [formData.isMonthly]);

  return (
    <>
      <div className="w-full">
        <div className="content mb-12">
          <h3 className="text-[#0b2b4d] text-3xl font-semibold ">
            pick adds-ons
          </h3>
          <p className="text-[#b1b1b8]">
            adds-ons help enhance your gaming experiance
          </p>
        </div>
        <div className="flex flex-col justify-start items-center gap-4 ">
          {addsPlan
            ? addsPlan.map((plan) => (
                <div
                  onClick={() => handleCheck(plan)}
                  key={plan.describe}
                  className={`flex flex-col gap-4 justify-start  items-start w-full  `}
                >
                  <div
                    className={`flex justify-start items-center gap-4 border border-blue-800 rounded-lg px-6 py-3 min-w-[25rem]
                        ${
                          isChecked.includes(plan.name)
                            ? "bg-blue-300"
                            : "bg-transparent"
                        }  `}
                  >
                    <div>
                      <input
                        type="checkbox"
                        name={`${plan.name}`}
                        checked={isChecked.includes(plan.name) ? true : false}
                      />
                    </div>
                    <div className="flex justify-between items-center w-[80%] ">
                      <div className="text-xs font-semibold">
                        <p className="text-[#00295b] font-bold text-sm">
                          {plan.name}
                        </p>
                        <p className="text-gray-600">{plan.describe}</p>
                      </div>
                      <div className="">
                        <p className="text-[#867fdb] text-sm">
                          +$
                          {formData.isMonthly
                            ? plan.pricingMonthly
                            : plan.pricingYearly}
                          {formData.isMonthly ? "/mo" : "/yr"}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
      <ControllSteps onSubmit={onSubmit} onHold={onHold} />
    </>
  );
};

export default PickAdds;
