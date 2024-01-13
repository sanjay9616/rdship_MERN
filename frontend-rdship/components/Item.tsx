import React from 'react'
import { IoIosStar } from "react-icons/io";

const Item = (props: any) => {
  return (
    <div className='max-w-[20%] min-w-[20%] cursor-pointer hover:shadow-[0_0_10px_#000000] hover:rounded-[5px]'>
      <div className='border border-solid border-[#ccc] m-2 p-2 rounded-[5px]'>
        <div className='flex items-center justify-center w-full h-[180px] p-[10px]'>
          <img src={props?.imgUrls && props?.imgUrls[0]} alt="" className='max-w-[100%] max-h-[100%]' />
        </div>
        <div className='w-full flex items-center justify-center h-[40px] mt-[8px]'>
          <div className='overflow-hidden text-ellipsis whitespace-initial line-clamp-2'>
            {props?.itemDescription}
          </div>
        </div>
        <div className='flex items-center mt-[4px]'>
          <div className='flex items-center'>
            <div className='text-[18px] font-[600] text-[#212121]'>₹98</div>
            <div className='ml-[8px] text-[14px] text-[#878787] line-through inline-block'>₹170</div>
            <div className='ml-[8px] text-[14px] text-[#26a541] font-[500] tracking-normal'>42% off</div>
          </div>
          <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
            <span>3.7</span>
            <IoIosStar className='mb-[1px]'/>
          </div>
        </div>
        <div className='mt-[8px] flex items-center justify-between'>
          <button type='button' disabled className='w-[49%] bg-white border border-solid border-[#f0f0f0] h-[35px] rounded-[5px] text-[12px] text-[#878787] font-[500] pl-[5px] pr-[5px] cursor-not-allowed'>
            1 * 300 g
          </button>
          <button type='button' className='w-[49%] bg-white border border-solid border-[#f0f0f0] h-[35px] rounded-[5px] text-[12px] text-[#db4a2c] font-[500]'>
            ADD Item
          </button>
        </div>
      </div>
    </div>
  )
}

export default Item