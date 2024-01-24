import { MESSAGE } from '@/config/message';
import { AlertMessageService } from '@/services/alertmessage.service';
import { HomeService } from '@/services/home.service';
import { LoaderService } from '@/services/loader.service';
import { Button, Rating } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux';

const homeService = new HomeService();
const alertMessage = new AlertMessageService();
const loaderService = new LoaderService();

const RateProductsDialog = (props: any) => { // Need to add Validations
  const itemId: string = props.id;
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const isAuthenticated = useSelector((state: any) => state.authenticationReducer.isAuthenticated);
  const user = useSelector((state: any) => state.userReducer);

  const submitProductReview = async () => {
    if (rating && review.length) {
      try {
        loaderService.showLoader();
        let payload = {
          review: review,
          rating: rating,
          date: new Date().getTime(),
          userId: user._id,
          name: user.name || 'Unknown User',
          isVerifiedPurchase: isAuthenticated,
          likes: [],
          disLikes: [],
        }
        const res = await homeService.submitProductReview(payload?.userId, itemId, payload)
        if (res?.status == 200 && res?.success) {
          loaderService.hideLoader();
          props.submitProductReview({ isOpen: false, responce: res?.data });
          alertMessage.addSuccess(MESSAGE.SUCCESS.REVIEW_SUBMITTED).show();
        } else {
          props.submitProductReview({ isOpen: false });
          loaderService.hideLoader();
          alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
        }
      } finally {
        props.submitProductReview({ isOpen: false });
        loaderService.hideLoader();
      }
    }
  }

  const closeDialog = () => {
    props.submitProductReview({ isOpen: false });
  }

  return (
    <section className=''>
      <div className='text-[18px] font-[600] text-[#212121]'>Rate this product</div>
      <Rating name="large" size="large" value={rating} onChange={(event: any, newValue: any) => setRating(newValue)} className='mt-2' />
      <div className='mt-2 text-[18px] font-[600] text-[#212121]'>Review this product</div>
      <div className='border border-solid border-[#ccc] rounded-[4px] flex flex-col'>
        <textarea onChange={(event) => { setReview(event.target.value) }} rows={5} className='resize-none w-full rounded-[4px] p-[10px]'></textarea>
        <div className='ml-auto text-[10px] font-[600] pr-[10px] pb-[10px]'>{500 - review.length}/500 character</div>
      </div>
      <div className='text-[#d9232d] ml-[5px] text-[10px] font-[600] pr-[10px] pb-[10px] h-[25px]'>
        {
          !rating ? <span>Rating is Required</span> : !review.length ? <span>Review is Required</span> : ''
        }
      </div>
      <div className='ml-auto mt-2 flex items-center'>
        <Button onClick={closeDialog} type='button' className='h-[35px] pl-[10px] pr-[10px] text-[#2874f0] bg-[#F2F2F2] hover:bg-[#F2F2F2] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] ml-auto'>Cancel</Button>
        <Button onClick={submitProductReview} type='button' className='h-[35px] pl-[10px] pr-[10px] text-white bg-[#d9232d] hover:bg-[#d9232d] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] ml-4'>Submit</Button>
      </div>
    </section>
  )
}

export default RateProductsDialog