import React from 'react';
import toast from 'react-hot-toast';

const UserRow = ({ user, index, refetch }) => {
    const { email, role } = user;
    const makeAdmin = () =>{
          fetch(`https://calm-escarpment-43051.herokuapp.com/user/admin/${email}`,{
              method:'PUT',
              headers:{
                  authorization:`Bearer ${localStorage.getItem('accessToken')}`
              }
          })
          .then(res=>{
              if(res.status === 403){
                  toast.error('Faield to Make an admin')
              }
              return res.json()
          })
          .then(data=>{
              if(data.modifiedCount>0){
                  refetch();
                  toast(`Successfully Made an admin`)
                }
          })
    }
    return (
        <tr class="hover">
            <th>{index + 1} </th>
            <td>{email} </td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} class="btn btn-outline btn-xs">Make Admin</button>} </td>
            <td>{<button class="btn btn-outline btn-xs">Remove User</button>} </td>
        </tr>
    );
};

export default UserRow;