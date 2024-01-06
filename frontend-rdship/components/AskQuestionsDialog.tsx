import { Button } from '@mui/material'
import React from 'react'

const AskQuestionsDialog = () => {
  return (
    <section className=''>
      <div className='text-[18px] font-[600] text-[#212121]'>Ask Your Questions</div>
      <div className='mt-2 border border-solid border-[#ccc] rounded-[4px] flex flex-col'>
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

export default AskQuestionsDialog