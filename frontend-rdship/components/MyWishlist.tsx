import React from 'react'
import { IoIosStar } from 'react-icons/io'

const MyWishlist = () => {
  return (
    <section>
      <div className='bg-white p-4 text-[#111112] text-[16px] font-[600] shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>My WishList (2)</div>
      <div className='cursor-pointer bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] mt-2 p-4 flex'>
        <div className='w-[130px] h-[130px] flex items-center justify-center m-auto'>
          <img src="/1.webp" alt="" className='max-w-[100%] max-h-[100%]' />
        </div>
        <div className='ml-4 mr-4 w-[calc(100%-150px-1rem)]'>
          <div className='flex items-center justify-between'>
            <div className='font-[600] text-[16px] flex-1 truncate'>
              <span className=''>Sunfeast Dark Fantasy Choco Fills Cream Filled </span>
              <span>(pack of: 2) </span>
              <span>(quantity: 600 g)</span>
            </div>
            <button type='button' className='ml-4 h-[30px] text-[#498de5] border border-solid border-[#498de5] bg-[#F2F2F2] text-[12px] rounded-[4px] pl-4 pr-4'>Remove</button>
          </div>
          <div className='mt-2 flex'>
            <div className='flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
              <span>3.7</span>
              <IoIosStar className='mb-[1px]' />
            </div>
            <div className='ml-2 text-[#878787] font-[500]'>2 Ratings</div>
            <div className='ml-2 text-[#878787] font-[500]'>&</div>
            <div className='ml-2 text-[#878787] font-[500]'>2 Reviews</div>
          </div>
          <div className='mt-2 text-[#388e3c] font-[600]'>Extra ₹72 off</div>
          <div className='mt-0 flex items-center'>
            <div className='text-[28px] font-[600] text-[#212121]'>₹98</div>
            <div className='ml-[8px] text-[16px] text-[#878787] line-through inline-block'>₹170</div>
            <div className='ml-[8px] text-[16px] text-[#26a541] font-[500] tracking-normal'>42% off</div>
          </div>
        </div>
      </div>
      <div className='cursor-pointer bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] mt-2 p-4 flex'>
        <div className='w-[130px] h-[130px] flex items-center justify-center m-auto'>
          <img src="/1.webp" alt="" className='max-w-[100%] max-h-[100%]' />
        </div>
        <div className='ml-4 mr-4 w-[calc(100%-150px-1rem)]'>
          <div className='flex items-center justify-between'>
            <div className='font-[600] text-[16px] flex-1 truncate'>
              <span className=''>Sunfeast Dark Fantasy Choco Fills Cream Filled </span>
              <span>(pack of: 2) </span>
              <span>(quantity: 600 g)</span>
            </div>
            <button type='button' className='ml-4 h-[30px] text-[#498de5] border border-solid border-[#498de5] bg-[#F2F2F2] text-[12px] rounded-[4px] pl-4 pr-4'>Remove</button>
          </div>
          <div className='mt-2 flex'>
            <div className='flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
              <span>3.7</span>
              <IoIosStar className='mb-[1px]' />
            </div>
            <div className='ml-2 text-[#878787] font-[500]'>2 Ratings</div>
            <div className='ml-2 text-[#878787] font-[500]'>&</div>
            <div className='ml-2 text-[#878787] font-[500]'>2 Reviews</div>
          </div>
          <div className='mt-2 text-[#388e3c] font-[600]'>Extra ₹72 off</div>
          <div className='mt-0 flex items-center'>
            <div className='text-[28px] font-[600] text-[#212121]'>₹98</div>
            <div className='ml-[8px] text-[16px] text-[#878787] line-through inline-block'>₹170</div>
            <div className='ml-[8px] text-[16px] text-[#26a541] font-[500] tracking-normal'>42% off</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyWishlist