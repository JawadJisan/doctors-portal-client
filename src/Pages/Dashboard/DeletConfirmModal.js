import React from 'react';
import toast from 'react-hot-toast';

const DeletConfirmModal = ({deletingDoctor, refetch, setDeletingDoctor}) => {
    const {name, email} = deletingDoctor;

    const handleDelete = () => {
        fetch(`https://calm-escarpment-43051.herokuapp.com/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success(`Doctor: ${name} is deleted.`)
                    setDeletingDoctor(null);
                    refetch();
                }
            })
    }
    return (
    <div>
            {/* // <!-- The button to open modal --> */}
        
        
        {/* // <!-- Put this part before </body> tag --> */}
        <input type="checkbox" id="delet-confirm-modal" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="font-bold text-lg text-red-500">Are You sure you want to delet ${name} </h3>
            <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <div class="modal-action">
            <button onClick={() => handleDelete()} class="btn btn-xs btn-error">Delete</button>
              <label for="delet-confirm-modal" class="btn">Cancel</label>
            </div>
          </div>
        </div>
    </div>
    );
};

export default DeletConfirmModal;