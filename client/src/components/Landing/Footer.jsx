export default function Footer() {
  return (
    <footer className="footer items-center p-8 bg-base-200 text-base-content mt-auto border-t border-base-content/10">
      <aside className="items-center grid-flow-col">
        <p className="font-bold text-primary text-xl">Milo</p>
        <p className="opacity-60 ml-2">© 2026</p>
      </aside>
      <nav className="grid-flow-col gap-6 md:place-self-center md:justify-self-end font-medium opacity-70">
        <a className="hover:text-primary transition-colors cursor-pointer">Docs</a>
        <a className="hover:text-primary transition-colors cursor-pointer">Hardware Specs</a>
        <a className="hover:text-primary transition-colors cursor-pointer">API Protocol</a>
      </nav>
    </footer>
  );
}
