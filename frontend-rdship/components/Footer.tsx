import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <section className='w-[100%] flex flex-col  p-[10px] border-2 border-solid  mt-auto bg-[white]'>
      <div className='w-[90%] pb-[10px] mx-[auto] grid grid-cols-4 justify-center gap-40px mt-[25px] '>
        {/* About Section */}
        <div className=' flex flex-col ml-[100px]'>
          <h3 className='text-[20px]'><b> About</b></h3>
          <Link className='hover:underline' href="">Contact Us</Link>
          <Link className='hover:underline' href="">About Us</Link>
          <Link className='hover:underline' href="">carrers</Link>
        </div>
        {/* Help Section */}
        <div className=' flex flex-col  '>
          <h3 className='text-[20px]'><b> Help</b></h3>
          <Link className='hover:underline' href="">Payment</Link>
          <Link className='hover:underline' href="">Shipping</Link>
          <Link className='hover:underline' href="">Cancellation</Link>
        </div>
        {/* Consumer policy Section */}
        <div className=' flex flex-col  '>
          <h3 className='text-[20px]'><b> Consumer Policy</b></h3>
          <Link className='hover:underline' href="">Cancallation</Link>
          <Link className='hover:underline' href="">Terms Of use</Link>
          <Link className='hover:underline' href="">Return</Link>
        </div>
        {/* Social Section */}
        <div className=' flex flex-col  '>
          <h3 className='text-[20px]'><b> Follow Us</b></h3>
          <Link className='hover:underline' href="">LinkedIn</Link>
          <Link className='hover:underline' href="">FaceBook</Link>
          <Link className='hover:underline' href="">Instagram</Link>
        </div>
      </div>
      <hr className='py-[10px]'></hr>
      <div className=' flex flex-row gap-[10px] justify-around '>
        <Link href="">Became a seller</Link>
        <Link href="">Advertise</Link>
        <Link href="">Gift Cards</Link>
      </div>
    </section>
  )
}

export default Footer