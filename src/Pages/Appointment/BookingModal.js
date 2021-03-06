import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import toast from 'react-hot-toast';


const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
    const { _id, name, slots, price } = treatment;
    const [user] = useAuthState(auth);
    console.log('aa', user.displayName)

    /* m-74 */
    const formatedDate = format(date, 'PP');




    const handleBooking = event =>{
        event.preventDefault();
        const slot = event.target.slot.value;
        console.log(slot, name, _id);

        /* m-74 */
        const booking ={ 
            treatmentId: _id,
            treatment: name,
            date: formatedDate,
            slot,price,
            patient: user.email,
            patientName: user.displayName,
            phone: event.target.phone.value,  
        }

        fetch('https://calm-escarpment-43051.herokuapp.com/booking',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(
               booking
              ),
        })
        .then(res => res.json())
        .then(data =>{
            if(data.success){
                toast(`Appointment is set, ${formatedDate} at ${slot}`)
                console.log(data)
            }
            else{
                toast(`You Already Have an Appointment on, ${data.booking?.date} at ${data.booking?.slot}`)
                console.log(data)

            }
            refetch();
            setTreatment(null)
            // to close the Modal
        } )

    }


    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 className="font-bold text-lg text-secondary">Booking for: {name} </h3>
                    
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-4 justify-items-center mt-3'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />

                        <select name='slot' className="select select-bordered w-full max-w-xs">
                           {
                               slots.map((slot, index) => <option key={index} value={slot}>{slot} </option> )
                           }
                            
                        </select>

                        <input type="text" name='name' disabled value={user?.displayName || ''} placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
                        <input type="email" name='email' disabled value={user?.email || ''} placeholder="Email Address" className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="Your Mobile No" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" value='Submit' className="btn btn-secondary w-full max-w-xs" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;