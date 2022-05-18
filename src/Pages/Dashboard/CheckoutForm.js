import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ appointment }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [caedError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setSProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    const {_id, price, patient, patientName } = appointment;

    useEffect(() => {
        fetch('https://calm-escarpment-43051.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });

    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        // if(error){
        //     setCardError(error.message)
        // }
        // else{
        //     setCardError('')
        // }
        setCardError(error?.message || '')
        setSuccess('');
        setSProcessing(true);


        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret
            ,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: patient,
                    },
                },
            },
        );
            if(intentError){
                setCardError(intentError?.message);
                setSProcessing(false)

            }
            else{
                setCardError('');
                setTransactionId(paymentIntent)
                console.log(paymentIntent.id);
                setSuccess('COngreates!@! Your Payment is compleated')

                const payment ={
                    appointment: _id,
                    transactionId: paymentIntent.id,
                }
                // update payment to backend // store payment on database
                fetch(`https://calm-escarpment-43051.herokuapp.com/booking/${_id}`,{
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify( payment )
                }).then(res=>res.json()).then(data=>{
                    setSProcessing(false);
                    console.log(data)
                })
            }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                caedError && <p className='text-red-900'>{caedError} </p>
            }
           {
                success && <div className='text-green-500'>
                    <p>{success}  </p>
                </div>
            }
           {
                success && <div className='text-green-500'>
                    <p>Your transaction Id: <span className="text-orange-500 font-bold">{transactionId}</span> </p>
                </div>
            }
        </div>
    );
};

export default CheckoutForm;