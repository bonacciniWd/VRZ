import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import Wpp from "./components/Wpp.jsx";
import Sliding from "./components/Sliding.jsx";
import { Analytics } from '@vercel/analytics/react';
import Davero from "./components/Davero.jsx";

const App = () => {
  return (
    <BrowserRouter>
     <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          
        </div>
      <div >
        <StarsCanvas />
        <Tech /> 
        <Davero />
        <About />
        <Sliding />
        <Experience />
        <Works />
       <Contact />
       <Hero />
      </div>
      <Wpp />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
