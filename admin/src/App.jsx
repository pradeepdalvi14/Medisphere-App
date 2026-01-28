import Login from './pages/Login'
import React, { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import { Route, Routes } from 'react-router-dom';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashBoard from './doctor/DoctorDashBoard';
import DoctorAppointment from './doctor/DoctorAppointment';
import DoctorProfile from './doctor/DoctorProfile';

const App = () => {

  const { aToken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return aToken || dtoken ? (
  <div className='bg-[#f8f9D]'>
    <ToastContainer/>
    <Navbar/>
    <div className='flex items-start'>
      <Sidebar/>
      <Routes>
        {/* admin route */}
        <Route path = "/" element= {<></>}/>
        <Route path = "/admin-dashboard" element= {<Dashboard></Dashboard>}/>
        <Route path = "/all-appointments" element= {<AllAppointment></AllAppointment>}/>
        <Route path = "/add-doctor" element= {<AddDoctor></AddDoctor>}/>
        <Route path = "/doctor-list" element= {<DoctorList></DoctorList>}/>

        {/* doctor route */}
        <Route path = "/doctor-dashboard" element= {<DoctorDashBoard></DoctorDashBoard>}/>
        <Route path = "/doctor-appointments" element= {<DoctorAppointment></DoctorAppointment>}/>
        <Route path = "/doctor-profile" element= {<DoctorProfile></DoctorProfile>}/>
      </Routes>
    </div>
  </div>
) : (
  <>
    <Login/>
    <ToastContainer/>
  </>
)
  
}

export default App
