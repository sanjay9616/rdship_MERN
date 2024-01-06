import { Button, Rating } from '@mui/material'
import { useState } from 'react'

const RateProductsDialog = () => {
  const [rating, setRating] = useState(null)

  const setRatingValue = (event: any, newValue: any) => {
    setRating(newValue);
  }

  return (
    <section className=''>
      <div className='text-[18px] font-[600] text-[#212121]'>Rate this product</div>
      <Rating name="large" size="large" value={rating} onChange={(event, newValue) => setRatingValue(event, newValue)} className='mt-2' />
      <div className='mt-2 text-[18px] font-[600] text-[#212121]'>Review this product</div>
      <div className='border border-solid border-[#ccc] rounded-[4px] flex flex-col'>
        <textarea rows={5} className='resize-none w-full rounded-[4px] p-[10px]'></textarea>
        <div className='ml-auto text-[10px] font-[600] pr-[10px] pb-[10px]'>500/500 character</div>
      </div>
      <div className='ml-auto mt-2 flex items-center'>
        <Button type='button' className='h-[35px] pl-[10px] pr-[10px] text-[#2874f0] bg-[#F2F2F2] hover:bg-[#F2F2F2] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] ml-auto'>Cancel</Button>
        <Button type='button' className='h-[35px] pl-[10px] pr-[10px] text-white bg-[#d9232d] hover:bg-[#d9232d] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] ml-4'>Submit</Button>
      </div>
    </section>
  )
}

export default RateProductsDialog