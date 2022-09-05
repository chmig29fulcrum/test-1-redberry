import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Landing from './components/Landing';
import Tanamshromlis_Info from './components/Tanamshromlis_Info';
import Laptop_Details from './components/Laptop_Details';
import Laptop_List from './components/Laptop_List';
import Laptop_Info from './components/Laptop_Info';

import { LaptopProvider } from './components/LaptopContext';

function App() {
  return (
    <>
      <LaptopProvider>
        <Router>
          <div className=''>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route
                path='/tanamshromlis_info'
                element={<Tanamshromlis_Info />}
              />
              <Route path='/laptop_details' element={<Laptop_Details />} />
              <Route path='/laptop_list' element={<Laptop_List />} />
              <Route path='/laptop_info/:id' element={<Laptop_Info />} />
            </Routes>
          </div>
        </Router>
      </LaptopProvider>
    </>
  );
}

export default App;
