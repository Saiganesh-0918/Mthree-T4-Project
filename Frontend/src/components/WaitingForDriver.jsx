import React from 'react'

const WaitingForDriver = (props) => {
  // console.log("props: line 4", props)
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.waitingForDriver(false)
      }}><i className="text-3xl text-gray-500 hover:text-gray-700  ri-arrow-down-wide-line"></i>
      </h5>

      <div className='flex items-center justify-between'>
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <div className='flex'>
          <h1 className='flex mr-2'>Captains Name   :</h1>
          <h2 className='text-semibold font-medium capitalize flex'>{  props.ride?.captain.firstname}</h2>
          </div>
          <div className='flex'>
          <h1 className='flex mr-2'>Vechicle No. :</h1>
          <h4 className='text-semi-bold font-medium mt-[-1px] -mb-1'>{props.ride?.captain.vehicle_plate}</h4>
          </div>
          <div className='flex'>
            <h1 className='flex mr-2'>Vechicle type :</h1>
            <p className='text-semi-bold font-medium'>Maruti Suzuki Alto</p>
          </div>  
          <div className='flex'>
          <h1 className='  mr-2'>OTP :</h1>
            <p className='text-semi-bold font-medium'>{props.ride?.otp}</p>
            
          </div>
          
          {/* <h1 className='text-semi-bold font-medium'>OTP:&nbsp;  {props.ride?.otp} </h1> */}
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-time-line"></i>
            <div>
                {/* <h3 className='text-lg font-medium'>{props.ride?.distance}kms &nbsp;&nbsp;{props.ride?.duration}hrs</h3> */}
                <h3 className='text-lg font-medium'>
                                {props.ride?.distance}kms&nbsp;&nbsp;
                                {(() => {
                                    const totalMinutes = Math.round((props.ride?.duration || 0) * 60);
                                    const hours = Math.floor(totalMinutes / 60);
                                    const minutes = totalMinutes % 60;
                                    if (hours === 0) return `${minutes}min`;
                                    return `${hours}hr ${minutes}min`;
                                })()}
                                </h3>
                <p className='text-sm -mt-1 text-gray-600'>Distance, &nbsp;Duration</p>
            </div>
        </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver