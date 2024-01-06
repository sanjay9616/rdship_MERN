
import Category from '@/components/Category'
import Item from '@/components/Item'
import React from 'react'

const Home = () => {
  return (
    <section>
      <div className='bg-white'>
        <div className='flex items-center justify-center p-4 border-t border-b border-solid border-[#F2F2F2]'>
          <div className='text-[#2874f0] font-[600] text-[22px] leading-[30px] tracking-[.5px]'>
            OUR CATEGORIES
          </div>
        </div>
        <div className='flex p-[1rem] scrollbar'>
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center justify-center p-4 border-t border-b border-solid border-[#F2F2F2]'>
          <div className='text-[#2874f0] font-[600] text-[22px] leading-[30px] tracking-[.5px]'>
            RECENTLY VIEWED
          </div>
        </div>
        <div className='flex p-[1rem] scrollbar'>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center justify-center p-4 border-t border-b border-solid border-[#F2F2F2]'>
          <div className='text-[#2874f0] font-[600] text-[22px] leading-[30px] tracking-[.5px]'>
            TOP SELLING PRODUCTS
          </div>
        </div>
        <div className='flex p-[1rem] scrollbar'>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
    </section>
  )
}

export default Home
