import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto text-center space-y-8 border-t border-base-content/10">
      <h2 className="text-3xl font-bold text-primary">Production Ready</h2>
      <p className="font-medium text-lg opacity-70 max-w-2xl mx-auto">
        The demo above utilizes a local state build. The full system manages thousands of concurrent entries, role-based access control, and complete database persistence.
      </p>
      <Link to="/login" className="btn btn-lg btn-primary rounded-full font-bold text-white px-8 shadow-lg shadow-primary/30">
        Access System Dashboard
      </Link>
    </section>
  );
}
