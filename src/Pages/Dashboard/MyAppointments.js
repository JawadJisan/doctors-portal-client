import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyAppointments = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(`https://calm-escarpment-43051.herokuapp.com/booking?patient=${user?.email}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(res => {
          console.log('res', res);
          if (res.status === 401 || res.status === 403) {
            navigate('/');
            signOut(auth);
            localStorage.removeItem('accessToken');
          }

          return res.json()
        })
        .then(data => {
          console.log(data)
          setAppointments(data);
        })
    }
  }, [user])

  return (
    <div>
      My appointment : {appointments?.length}
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>

            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>

            {
              appointments?.map((a, index) => <tr key={index}>
                <th>{index + 1} </th>
                <td>{a.patientName} </td>
                <td>{a.date} </td>
                <td>{a.slot}</td>
                <td>{a.treatment}</td>
                <td>
                  {(a?.price && !a.paid) && <Link to={`/dashboard/payment/${a._id}`}><button className='btn btn-xs btn-success'>PAY</button> </Link> }
                  {(a?.price && a.paid) && <div>
                    <p><span className='text-success'>PAID</span></p>
                    <p> Transaction Id: <span className='text-success'>{a.transactionId} </span></p>
                  </div>  }
                  
                  </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;