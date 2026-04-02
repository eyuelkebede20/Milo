import { Link } from "react-router-dom";
import Milo from "../../assets/small_Logo.png";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-4 max-w-5xl mx-auto w-full text-center flex flex-col items-center justify-center">
      <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <img className="w-24 drop-shadow-md" src={Milo} alt="Milo Logo" />
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
        Flawless <span className="text-primary">Event Management</span>
      </h1>

      <p className="text-xl md:text-2xl font-medium opacity-70 mb-10 max-w-3xl mx-auto leading-relaxed">
        The high-speed provisioning tool. We help you create, manage, and secure your events with zero friction.
      </p>

      <div className="flex gap-4">
        <a href="#demo" className="btn btn-primary btn-lg rounded-full font-bold text-white px-8 shadow-lg shadow-primary/30">
          Try Live Demo
        </a>
        <Link to="/login" className="btn btn-ghost btn-lg rounded-full font-bold px-8 border-2 border-base-content/20 hover:border-base-content/40">
          Staff Login
        </Link>
      </div>
    </section>
  );
}
