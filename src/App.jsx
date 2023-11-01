import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import Wpp from "./components/Wpp.jsx";
import Sliding from "./components/Sliding.jsx";

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
      <Wpp />
    </BrowserRouter>
  );
}

export default App;
