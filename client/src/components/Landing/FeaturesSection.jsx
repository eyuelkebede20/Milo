import { IdCard, ShieldCheck, Scan } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-base-200 border-y border-base-content/10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="card bg-base-100 shadow-xl rounded-[2rem] border border-base-content/10 hover:-translate-y-2 transition-all duration-300">
            <div className="card-body p-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <IdCard size={28} strokeWidth={2.5} />
              </div>
              <h2 className="card-title text-2xl font-bold mb-2">Instant ID Generation</h2>
              <p className="text-lg opacity-70 leading-relaxed">Create an Event ID card with ease. Fast, automated, and ready for immediate printing.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl rounded-[2rem] border border-base-content/10 hover:-translate-y-2 transition-all duration-300">
            <div className="card-body p-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck size={28} strokeWidth={2.5} />
              </div>
              <h2 className="card-title text-2xl font-bold mb-2">Atomic Check-in</h2>
              <p className="text-lg opacity-70 leading-relaxed">Cryptographic QR validation prevents ticket duplication and keeps your perimeter secure.</p>
            </div>
          </div>

          <div className="card bg-primary text-primary-content shadow-xl shadow-primary/20 rounded-[2rem] hover:-translate-y-2 transition-all duration-300 border border-primary">
            <div className="card-body p-8">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-4">
                <Scan size={28} strokeWidth={2.5} />
              </div>
              <h2 className="card-title text-2xl font-bold mb-2">Hardware Agnostic</h2>
              <p className="text-lg text-primary-content/90 leading-relaxed">Runs on any camera-enabled device. No proprietary scanners needed to process guests.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
