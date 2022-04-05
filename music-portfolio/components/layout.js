import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-prp">
      <Navbar />
      <main className="grow ">{children}</main>
      <Footer />
    </div>
  );
}
