

export const handleNext = (currentStep , setCurrentStep , onHold , e) => {
    if (currentStep < 5 && onHold === false) {
      setCurrentStep((prev) => prev + 1);
    } else {
      return e.preventDefault()
    }
  };


  export const handlePrev = (setCurrentStep) => {
    setCurrentStep((prev) => prev - 1);
  };