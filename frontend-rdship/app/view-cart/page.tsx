import React from 'react'
import { IoIosStar, IoMdAdd, IoMdRemove } from 'react-icons/io'

const page = () => {
  return (
    <section>
      <div className='m-2 flex justify-between flex-wrap'>
        <div className='w-[70%] border-box min-w-[510px]'>
          <div className='bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] pt-2 pb-2 pl-4 pr-4 flex items-center justify-between'>
            <div>
              <span className=''>Deliver to: </span>
              <span className='text-[#111112] font-[600]'>Noida - 41367</span>
            </div>
            <button type='button' className='pl-4 pr-4 h-[35px] text-[14px] text-[#498de5] border border-solid border-[#498de5] rounded-[4px] bg-[##F2F2F2]'>
              Change
            </button>
          </div>
          <div className='cursor-pointer shadow-[0_3px_6px_rgb(0_0_0_/_16%)] bg-white mt-2 p-4 flex'>
            <div className='w-[150px] h-[150px] flex items-center justify-center m-auto'>
              <img src="/1.webp" alt="" className='max-w-full max-h-full' />
            </div>
            <div className='ml-4 mr-4 w-[calc(100%-150px-1rem)]'>
              <div className='flex items-center justify-between'>
                <div className='font-[600] text-[16px] truncate'>Sunfeast Dark Fantasy Choco Fills Cream Filled</div>
                <div className='text-[16px] text-[#388e3c] w-[170px]'>Delivery in 2 days, Wed</div>
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
              <div className='flex items-center'>
                <div className='text-[28px] font-[600] text-[#212121]'>₹98</div>
                <div className='ml-[8px] text-[16px] text-[#878787] line-through inline-block'>₹170</div>
                <div className='ml-[8px] text-[16px] text-[#26a541] font-[500] tracking-normal'>42% off</div>
              </div>
              <div className='flex items-center'>
                <button type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[30px] flex items-center justify-center'>
                  <IoMdAdd />
                </button>
                <input type="text" className='rounded-[4px] border border-solid border-[#8bc5ff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[55px] h-[30px] flex items-center justify-center ml-2 mr-2 text-center' />
                <button type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[30px] flex items-center justify-center'>
                  <IoMdRemove />
                </button>
                <button type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] text-[12px] pl-4 pr-4 ml-4 h-[30px] flex items-center justify-center'>
                  REMOVE
                </button>
              </div>
            </div>
          </div>
          <div className='cursor-pointer shadow-[0_3px_6px_rgb(0_0_0_/_16%)] bg-white mt-2 p-4 flex'>
            <div className='w-[150px] h-[150px] flex items-center justify-center m-auto'>
              <img src="/1.webp" alt="" className='max-w-full max-h-full' />
            </div>
            <div className='ml-4 mr-4 w-[calc(100%-150px-1rem)]'>
              <div className='flex items-center justify-between'>
                <div className='font-[600] text-[16px] truncate'>Sunfeast Dark Fantasy Choco Fills Cream Filled</div>
                <div className='text-[16px] text-[#388e3c] w-[170px]'>Delivery in 2 days, Wed</div>
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
              <div className='flex items-center'>
                <div className='text-[28px] font-[600] text-[#212121]'>₹98</div>
                <div className='ml-[8px] text-[16px] text-[#878787] line-through inline-block'>₹170</div>
                <div className='ml-[8px] text-[16px] text-[#26a541] font-[500] tracking-normal'>42% off</div>
              </div>
              <div className='flex items-center'>
                <button type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[30px] flex items-center justify-center'>
                  <IoMdAdd />
                </button>
                <input type="text" className='rounded-[4px] border border-solid border-[#8bc5ff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[55px] h-[30px] flex items-center justify-center ml-2 mr-2 text-center' />
                <button type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[30px] flex items-center justify-center'>
                  <IoMdRemove />
                </button>
                <button type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] text-[12px] pl-4 pr-4 ml-4 h-[30px] flex items-center justify-center'>
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[calc(30%-0.5rem)] bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] ml-2 border-box min-w-[200px]'>
          <div className='sticky top-[75px]'>
            <div className='p-4 border-b border-solid border-[#ccc] text-[#878787] text-[16px]'>PRICE DETAILS</div>
            <div className='pl-4 pr-4'>
              <div className='flex items-center justify-between mt-3 mb-3 text-[16px] h-[30px]'>
                <span className=''>Price (1 item)</span>
                <span className='text-[#878787] line-through'>₹170</span>
              </div>
              <div className='flex items-center justify-between mt-3 mb-3 text-[16px] h-[30px]'>
                <span className=''>Discount</span>
                <span className='text-[#388e3c]'>- ₹72</span>
              </div>
              <div className='flex items-center justify-between mt-3 mb-3 text-[16px] h-[30px]'>
                <span className=''>Delivery-charges</span>
                <span className='text-[#388e3c]'>FREE</span>
              </div>
              <div className='flex items-center justify-between mt-4 mb-4 text-[18px] font-[600] h-[40px] border-t border-b border-dashed border-[#ccc]'>
                <span>Total Amount</span>
                <span>₹98</span>
              </div>
              <div className='mt-4 mb-4 text-[16px] leading-[30px] text-[#388e3c]'>You will save ₹72 on this order</div>
              <div className='flex items-center justify-center m-5'>
                <button type='button' className='mb-4 bg-[#fb641b] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] text-white text-[14px] pl-8 pr-8 pt-2 pb-2 rounded-[4px] font-[600]'>
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page