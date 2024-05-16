
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComponentShow from './components/ShowPatients';
import ComponentCreate from './components/CreatePatient';
import PatientDetails from './components/PatientDetails';
import ComponentEdit from './components/EditPatient';
import NavbarComponent from './components/Navbar';
import FooterComponent from './components/Footer';

function App() {

   return (
      <div className='app-container'>
         <Router>
                  <NavbarComponent />
         </Router>
         <div className="main-content">
            <Router>
               <Routes>
                  <Route path='/' element={<ComponentShow />} />
                  <Route path='/create' element={<ComponentCreate />} />
                  <Route path='/edit/:dni' element={<ComponentEdit />} />
                  <Route path='/view/:dni' element={<PatientDetails />} />
                
               </Routes>
            </Router>
        
         </div>
         <Router>
                  <FooterComponent />
         </Router>
      </div>
   );
}

export default App;
