import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Navbar, Tech, Works, StarsCanvas } from "./components";
import Popup from "./components/Popup.jsx";
import Footer from "./components/Footer.jsx";
import Jobs from "./components/Jobs.jsx"
import SectionSeparator from "./components/SectionSeparator.jsx";
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  return (
    <BrowserRouter>
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
      </div>
      <div>
        <StarsCanvas />
        <Tech />
        <About />
      </div>
        <Jobs />
        <Experience />
        <SectionSeparator />
        <Works />
        <Contact />
        <Footer />
      <Popup />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
