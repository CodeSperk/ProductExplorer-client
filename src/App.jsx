import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">
      <Navbar />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">
        <Outlet />
      </div>

      <footer className="bg-[var(--clr-primary)] py-10 md:py-12 lg:py-16  text-white mt-16 md:mt-20 lg:mt-28">
        <Footer />
      </footer>
    </>
  );
}

export default App;
