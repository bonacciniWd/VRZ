import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import Popup from "./components/Popup.jsx";

import Sliding from "./components/Sliding.jsx";
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  return (
    <BrowserRouter>
     <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          
        </div>
      <div >
        <StarsCanvas />
        <Tech /> 
        <About />
        <Sliding />
        <Experience />
        <Works />
       <Contact />
       <Hero />
      </div>
      <Popup />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
