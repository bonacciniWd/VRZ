import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div >
        <StarsCanvas />
        <Tech /> 
       <Hero />
      </div>
    </BrowserRouter>
  );
}

export default App;
