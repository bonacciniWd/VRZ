import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

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
        <Works />
       <Contact />
       <Hero />
      </div>
    </BrowserRouter>
  );
}

export default App;
