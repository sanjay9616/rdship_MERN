import React from 'react'

const Category = () => {
  return (
    <div className='max-w-[20%] min-w-[20%] cursor-pointer hover:shadow-[0_0_10px_#000000] hover:rounded-[5px]'>
      <div className='border border-solid border-[#ccc] m-2 p-2 rounded-[5px]'>
        <div className='flex items-center justify-center w-full h-[180px] p-[10px]'>
          <img src="/1.webp" alt="" className='max-w-[100%] max-h-[100%]' />
        </div>
        <div className='w-full flex items-center justify-center h-[40px] mt-[8px]'>
          <div className='text-[18px] font-[600] text-[#212121] overflow-hidden text-ellipsis whitespace-initial line-clamp-2'>Medicines</div>
        </div>
      </div>
    </div>
  )
}

export default Category