import { useContext, useState } from "react";
import { FormContext, StepContext } from "./LayOut";
import { ControllSteps } from "./ControllSteps";
import Joi from "joi";
import { handleNext } from "../shared/stepsControllerFn";

function PersonalInfo() {
  const { formData, setFormData } = useContext(FormContext);
  const [onHold, setOnHold] = useState(true);
  const [userInputs, setUserInputs] = useState({});
  const [joiErrors, setJoiErrors] = useState([]);
  const { currentStep, setCurrentStep } = useContext(StepContext);

  const getPersonalInfo = (e) => {
    const userInfo = { ...formData };
    userInfo[`${e.target.name}`] = e.target.value;
    setFormData(userInfo);
    setOnHold(false);
    const { name, email, phone } = userInfo;
    const userData = {
      name,
      email,
      phone,
    };
    setUserInputs((prev) => (prev = userData));
  };

  const validation = () => {
    const userSchema = Joi.object({
      name: Joi.string().min(3).max(30).required().messages({
        "string.min": `"name" length shoul be at least 3 characters`,
        "string.max": `"name" length shoul be at max 30 characters`,
        "any.required": `"email" is a required field`,
        "any.string": `"should not contain numbers`,
      }),
      email: Joi.string()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: { allow: false },
        })
        .messages({
          "string.email": `"email" should be a valid email example : example@example.com`,
          "any.required": `"email" is a required field`,
        }),
      phone: Joi.string()
        .min(8)
        .max(18)
        .required()
        .messages({
          "string.empty": `"phone" cannot be an empty field`,
          "string.min": `"phone" should have a minimum length of {8}`,
          "string.max": `"phone" should have a minimum length of {18}`,
          "string.pattern.base":
            "must be a valid phone example : (555) 555-1234",
          "any.required": `"phone" is a required field`,
        })
        .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
    });
    const errors = userSchema.validate(userInputs, { abortEarly: false });
    if (errors.error) {
      setJoiErrors(errors.error.details);
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validation();
    if (!isValid) {
    } else {
      handleNext(currentStep, setCurrentStep, onHold, e);
    }
  };

  return (
    <>
      <div className="container  flex bg-transparent  justify-start items-start  flex-col text-[#0b2b4d] text-sm ">
        <div className="mb-6">
          <h3 className="font-bold mb-3 text-3xl text-[#0b2b4d]">
            Personal Info
          </h3>
          <p className="text-[#b1b1b8] text-sm">
            Please Provide Your name, email address,and phone number.
          </p>
        </div>

        <form className="flex flex-col w-full ">
          <label className="mb-2" htmlFor="name">
            Name
          </label>
          <input
            onChange={getPersonalInfo}
            className="w-[90%] mb-3 border py-2 border-black rounded-md outline-none px-2"
            name="name"
            id="name"
            type="text"
            required
          />
          {joiErrors
            ? joiErrors.map(
                (err, i) =>
                  err.context?.key === "name" && (
                    <div
                      key={i}
                      className=" my-1 py-2 px-4 text-xs rounded-xl text-center bg-[#fad2e1] w-[90%]  text-[#7c193d]"
                    >
                      <p className="font-sans">{err.message[0]} </p>
                    </div>
                  )
              )
            : ""}
          <label className="mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            onChange={getPersonalInfo}
            id="email"
            name="email"
            className="w-[90%] mb-3 border py-2 border-black rounded-md outline-none px-2"
            type="text"
            required
          />
          {joiErrors
            ? joiErrors.map(
                (err, i) =>
                  err.context?.key === "email" && (
                    <div
                      key={i}
                      className=" my-1 py-2 px-4 text-xs rounded-xl text-center bg-[#fad2e1] w-[90%]  text-[#7c193d]"
                    >
                      <p className="font-sans">{err.message} </p>
                    </div>
                  )
              )
            : ""}
          <label className="mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            required
            onChange={getPersonalInfo}
            id="phone"
            name="phone"
            className={`w-[90%] mb-3  border py-2 border-black rounded-md px-2  outline-none`}
            placeholder="e.g +1 234 567 890"
            type="tel"
          />
          {joiErrors
            ? joiErrors.map(
                (err, i) =>
                  err.context?.key === "phone" && (
                    <div
                      key={i}
                      className=" my-1 py-2 px-4 text-xs rounded-xl text-center bg-[#fad2e1] w-[90%]  text-[#7c193d]"
                    >
                      <p className="font-sans">{err.message} </p>
                    </div>
                  )
              )
            : ""}
          <ControllSteps onHold={onHold} onSubmit={onSubmit} />
        </form>
      </div>
    </>
  );
}

export default PersonalInfo;
