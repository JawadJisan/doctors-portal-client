import React from 'react';
import toast from 'react-hot-toast';

const DoctorRow = ({ doctor, index, refetch, setDeletingDoctor }) => {
    const { name, speciality, img, email } = doctor;

    // const handleDelet = email => {
    //     fetch(`https://calm-escarpment-43051.herokuapp.com/doctor/${email}`, {
    //         method: 'DELET',
    //         headers: {
    //             authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             // if(data.deletCount){
    //             toast.success(`Doctor: ${name} id deleted`)
    //             refetch()
    //             // }
    //         })
    // }




    return (
        <tr>
            <th>{index + 1} </th>
            <td><div class="avatar">
                <div class="w-16 rounded-full">
                    <img src={img} alt={name} />
                </div>
            </div></td>
            <td>{name} </td>
            <td>{speciality} </td>
            <td>
                <label onClick={() => setDeletingDoctor(doctor)} for="delet-confirm-modal" class="btn btn-xs">Delet</label>
                {/* <button onClick={() => handleDelet(email)} class="btn btn-xs btn-error">Delet</button> */}
            </td>
        </tr>
    );
};

export default DoctorRow;