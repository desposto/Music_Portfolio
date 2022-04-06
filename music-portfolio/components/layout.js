import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-prp items-center">
      <Navbar />
      <main className="grow flex items-center">{children}</main>
      <Footer />
    </div>
  );
}
