import { useState } from "react";
import FaydaScanner from "../components/Registration/FaydaScanner";
import ManualForm from "../components/Registration/ManualForm";

export default function Register() {
  const [method, setMethod] = useState("fayda");

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-md mx-auto card bg-base-100 shadow-xl border-2 border-primary">
        <div className="card-body">
          <h2 className="card-title text-2xl font-black italic uppercase tracking-tighter">Milo / Guest Entry</h2>

          <div role="tablist" className="tabs tabs-boxed my-4">
            <button className={`tab ${method === "fayda" ? "tab-active" : ""}`} onClick={() => setMethod("fayda")}>
              Fayda ID
            </button>
            <button className={`tab ${method === "manual" ? "tab-active" : ""}`} onClick={() => setMethod("manual")}>
              Manual
            </button>
          </div>

          {method === "fayda" ? <FaydaScanner /> : <ManualForm />}
        </div>
      </div>
    </div>
  );
}
