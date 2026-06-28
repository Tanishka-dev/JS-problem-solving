import { useState } from "react";
const Stepper = ({ steps, activeStep }) => {
  return (
    <div className="steps-wrapper">
      {steps?.map((step, index) => (
        <div className="stepper-wrapper">
          <div
            style={{ color: activeStep === index ? "purple" : "" }}
            className="circle-line-wrapper"
          >
            <div className="stepper-circle"></div>
            {index !== steps.length - 1 && <div className="line" />}
          </div>
          <div
            style={{ color: activeStep === index ? "purple" : "" }}
            key={index}
          >
            {step}
          </div>
        </div>
      ))}
    </div>
  );
};
const Step1 = () => {
  return <div>Step 1</div>;
};

const Step2 = () => {
  return <div>Step 2</div>;
};
const Step3 = () => {
  return <div>Step 3</div>;
};
export default function App() {
  const steps = [<Step1 />, <Step2 />, <Step3 />];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleprev = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <div className="main">
      <Stepper activeStep={activeStep} steps={steps} />
      <div className="buttons-wrapper">
        <button onClick={() => handleprev()} disabled={activeStep === 0}>
          Prev
        </button>
        <button disabled={activeStep === 2} onClick={() => handleNext()}>
          Next
        </button>
      </div>
    </div>
  );
}
