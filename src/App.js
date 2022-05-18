import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Appointment from './Pages/Appointment/Appointment';
import Signup from './Pages/Login/Signup';
import RequireAuth from './Pages/Login/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointments from './Pages/Dashboard/MyAppointments';
import MyReview from './Pages/Dashboard/MyReview';
import Users from './Pages/Dashboard/Users';
import toast, { Toaster } from 'react-hot-toast';
import RequireAdmin from './Pages/Login/RequireAdmin';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import ManageDoctor from './Pages/Dashboard/ManageDoctor';
import Payment from './Pages/Dashboard/Payment';



function App() {
  return (
    <div className='max-w-7xl mx-auto px-12'>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='about' element={<About></About>}></Route>
      <Route path='appointment' element={<RequireAuth><Appointment></Appointment></RequireAuth>}></Route>

      <Route path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}>
      <Route index element={<MyAppointments/>}></Route>
      <Route path='review' element={<MyReview/>}></Route>
      <Route path='payment/:id' element={<Payment/>}></Route>
      <Route path='users' element={<RequireAdmin><Users/></RequireAdmin>}></Route>
      <Route path='add-doctor' element={<RequireAdmin><AddDoctor/></RequireAdmin>}></Route>
      <Route path='manage-doctor' element={<RequireAdmin><ManageDoctor/></RequireAdmin>}></Route>


      </Route>
      <Route path='login' element={<Login></Login>}></Route>
      <Route path='signup' element={<Signup></Signup>}></Route>
    </Routes>
    {/* <ToastContainer /> */}
    <Toaster></Toaster>

    </div>
  );
}

export default App;
