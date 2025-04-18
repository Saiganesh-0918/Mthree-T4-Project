import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [ otp, setOtp ] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            props.setRidePopupPanel(false);
        }, 2000);
        console.log('close popup');
        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts or if the effect re-runs
    }, []);

    const submitHander = async (e) => {
        e.preventDefault()

        if (props.ride.status == "ongoing" || props.ride.status == "accepted") {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            alert("Ride has been accepted by someone else")
            setTimeout(() => {
                navigate('/captain-home');
            }, 7000); 
        }

        try {const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride.ride_id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('captainToken')}`
            }
        })
        if (response.data.status == "ongoing" || response.data.status == "accepted") {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            alert("Ride has been accepted by someone else")
            setTimeout(() => {
                navigate('/captain-home');
            }, 7000); 
        }

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }} catch (error){
            if (error.response && error.response.status === 400) {
                alert("Invalid OTP. Please try again.");
            } else {
                alert("An error occurred. Please try again later.");
            }
        }


    }
    return (
        <div className='mt-11'>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-semi-bold font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-semi-bold font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-semi-bold font-medium'>₹{props.ride?.fare} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full '>
                    <form onSubmit={submitHander}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-0' placeholder='Enter OTP' />

                        <div className='flex place-content-between gap-5 '>
                        <button className='w-2/5 mt-5 text-lg flex justify-center bg-green-600 hover:bg-green-800 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)
                            localStorage.setItem('captainStatus', 'open')

                        }} className='w-2/5 mt-5 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg hover:bg-red-800'>Cancel</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp