import React from "react";
import thankYou from "../images/icon-thank-you.svg";

const ThankYou = () => {
  return (
    <div className="flex justify-center items-center  h-[30rem]">
      <div className="flex flex-col justify-center items-center  gap-4">
        <div className="h-14 w-14  rounded-full flex justify-center items-center">
          <img src={thankYou} alt="" />
        </div>
        <div className="max-w-[20rem] flex justify-center items-center flex-col gap-4">
          <h3 className="text-[#01214d] font-semibold text-3xl">
            {" "}
            thank you !
          </h3>
          <p className="text-[#908f97] text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt
            explicabo ipsa magni suscipit, voluptate esse animi ipsam in dolor
            blanditiis!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
