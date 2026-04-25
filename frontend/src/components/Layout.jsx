import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
