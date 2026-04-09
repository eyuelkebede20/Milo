import { useDemoState } from "../../hooks/useDemoState";
import Step1Background from "./Demo/Step1Background";
import Step2Data from "./Demo/Step2Data";
import Step3Layout from "./Demo/Step3Layout";
import DemoPreview from "./Demo/DemoPreview";
import FinalPreview from "./Demo/FinalPreview";

export default function DemoSection() {
  const demoState = useDemoState();

  return (
    <section id="demo" className="py-20 px-4 bg-base-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Live Demo: ID Forge</h2>
          <p className="text-lg opacity-70 font-medium">Experience the Fayda-to-Badge pipeline in real time.</p>
        </div>

        {demoState.isPreviewMode ? (
          <FinalPreview {...demoState} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-base-200 p-8 shadow-sm rounded-[2rem] border border-base-content/10">
              <ul className="steps w-full mb-8 font-bold text-sm">
                <li className={`step ${demoState.step >= 1 ? "step-primary" : ""}`}>Background</li>
                <li className={`step ${demoState.step >= 2 ? "step-primary" : ""}`}>Data</li>
                <li className={`step ${demoState.step >= 3 ? "step-primary" : ""}`}>Layout</li>
              </ul>

              {demoState.step === 1 && <Step1Background {...demoState} />}
              {demoState.step === 2 && <Step2Data {...demoState} />}
              {demoState.step === 3 && <Step3Layout {...demoState} />}
            </div>

            <DemoPreview demoData={demoState.demoData} printRef={demoState.printRef} />
          </div>
        )}
      </div>

      {/* Replace the current <style> tag at the bottom of DemoSection.jsx with this: */}
    </section>
  );
}
