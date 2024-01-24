import { MESSAGE } from '@/config/message';
import { AlertMessageService } from '@/services/alertmessage.service';
import { HomeService } from '@/services/home.service';
import { LoaderService } from '@/services/loader.service';
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const homeService = new HomeService();
const alertMessage = new AlertMessageService();
const loaderService = new LoaderService();

const AskQuestionsDialog = (props: any) => {

  const itemId: string = props.id;
  const [question, setQuestion] = useState<string>('')
  const isAuthenticated = useSelector((state: any) => state.authenticationReducer.isAuthenticated);
  const user = useSelector((state: any) => state.userReducer);

  const submitQuestion = async () => { // Need to add Validations
    try {
      loaderService.showLoader();
      let payload = {
        question: question,
        date: new Date().getTime(),
        userId: user._id,
        name: user.name || 'Unknown User',
        isVerifiedPurchase: isAuthenticated,
        likes: [],
        disLikes: [],
      }
      const res = await homeService.submitQuestion(payload?.userId, itemId, payload)
      if (res?.status == 200 && res?.success) {
        loaderService.hideLoader();
        props.submitQuestion({isOpen: false, responce: res?.data});
        alertMessage.addSuccess(MESSAGE.SUCCESS.QUESTION_SUBMITTED).show();
      } else {
        props.submitQuestion({isOpen: false});
        loaderService.hideLoader();
        alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
      }
    } finally {
      props.submitQuestion({isOpen: false});
      loaderService.hideLoader();
    }
  }

  const closeDialog = () => {
    props.submitQuestion({isOpen: false});
  }

  return (
    <section className=''>
      <div className='text-[18px] font-[600] text-[#212121]'>Ask Your Questions</div>
      <div className='mt-2 border border-solid border-[#ccc] rounded-[4px] flex flex-col'>
        <textarea onChange={(event: any) => {setQuestion(event.target.value)}} rows={5} className='resize-none w-full rounded-[4px] p-[10px]'></textarea>
        <div className='ml-auto text-[10px] font-[600] pr-[10px] pb-[10px]'>{500 - question.length}/500 character</div>
      </div>
      <div className='ml-auto mt-2 flex items-center'>
        <Button onClick={closeDialog} type='button' className='h-[35px] pl-[10px] pr-[10px] text-[#2874f0] bg-[#F2F2F2] hover:bg-[#F2F2F2] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] ml-auto'>Cancel</Button>
        <Button onClick={submitQuestion} type='button' className='h-[35px] pl-[10px] pr-[10px] text-white bg-[#d9232d] hover:bg-[#d9232d] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] ml-4'>Submit</Button>
      </div>
    </section>
  )
}

export default AskQuestionsDialog