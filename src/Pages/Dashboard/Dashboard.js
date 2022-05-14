import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile">
        <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content ">

          {/* <!-- Page content here --> */}
          <h1 className='text-3xl text-center'>Welcome to Your Dashboard </h1>
          <Outlet></Outlet>
{/*           
          <label for="dashboard-sidebar" class="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
        
        </div> 
        <div class="drawer-side">
          <label for="dashboard-sidebar" class="drawer-overlay"></label> 
          <ul class="menu p-4 overflow-y-auto w-46 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li><Link to='/dashboard'>My Appoinments</Link></li>
            <li><Link to='/dashboard/review'>My Reviews</Link></li>
          </ul>
        
        </div>
      </div>
    );
};

export default Dashboard;