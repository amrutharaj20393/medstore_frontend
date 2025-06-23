import React from 'react'

function Preloader() {
  return (
    <>
     <div className='w-full h-screen flex justify-center items-center'>
                <div className='md:grid grid-cols-3'>
                    <div></div>
                    <div className='flex justify-center items-center flex-col p-5 md:p-0'>
                        <img src="https://media.tenor.com/8Epw6Qtcl1EAAAAM/take-your-medicine-meds.gif" alt="page not found" />
                       
                    </div>
                    <div></div>
                </div>
            </div>
    </>
  )
}

export default Preloader