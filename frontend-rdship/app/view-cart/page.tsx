"use client"
import Currency from '@/components/Currency';
import Decimal from '@/components/Decimal';
import { MESSAGE } from '@/config/message';
import { AlertMessageService } from '@/services/alertmessage.service';
import { AuthService } from '@/services/auth.service';
import { HomeService } from '@/services/home.service';
import { LoaderService } from '@/services/loader.service';
import { setIsAuthenticated } from '@/stores/reducers/authenticationSlice';
import { setCartItems, setUserDetails } from '@/stores/reducers/userSlice';
import { naturalNumber } from '@/utils/natural-number.util';
import React, { useEffect, useState } from 'react'
import { IoIosStar, IoMdAdd, IoMdRemove } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';

const homeService = new HomeService();
const alertMessage = new AlertMessageService();
const loaderService = new LoaderService();
const authService = new AuthService();

const page = () => {
  const [numberOfItem, setNumberOfItem] = useState<Array<string>>([]);
  const cartItems = useSelector((state: any) => state.userReducer.cartItems);
  const userId = useSelector((state: any) => state.userReducer._id);
  const dispatch = useDispatch();

  useEffect(() => {
    let qtyArray: Array<string> = cartItems.map((item: any) => String(item.numberOfItem));
    setNumberOfItem(qtyArray)
  }, [cartItems]);

  const updateCartQty = async (itemId: string, i: number, qty: number) => {
    try {
      loaderService.showLoader();
      const res = await homeService.updateCartQty(userId, itemId, { numberOfItem: qty })
      if (res?.status == 200 && res?.success) {
        loaderService.hideLoader();
        alertMessage.addSuccess(MESSAGE.SUCCESS.CART_QTY_UPDATED).show();
      } else if (res?.status == 400 && !res?.success) {
        loaderService.hideLoader();
        alertMessage.addWarning(res.message).show();
      } else {
        alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
        loaderService.hideLoader();
      }
    } finally {
      loaderService.hideLoader();
    }
  }

  const deleteCartItem = async (itemId: string) => {
    try {
      loaderService.showLoader();
      const res = await homeService.deleteCartItem(userId, itemId)
      if (res?.status == 200 && res?.success) {
        loaderService.hideLoader();
        alertMessage.addSuccess(MESSAGE.SUCCESS.ITEM_DELETED).show();
        dispatch(setCartItems(res?.data));
      } else {
        alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
        loaderService.hideLoader();
      }
    } finally {
      loaderService.hideLoader();
    }
  }

  const UpdateNumberOfItem = (itemId: string, i: number, event: any) => {
    let qtyArray: Array<string> = [...numberOfItem];
    qtyArray[i] = naturalNumber(event);
    setNumberOfItem(qtyArray);
    if (Number(qtyArray[i]) > 0) {
      updateCartQty(itemId, i, Number(qtyArray[i]));
    }
  }

  const increaseNumberOfItem = (itemId: string, i: number) => {
    let qtyArray: Array<string> = [...numberOfItem];
    qtyArray[i] = String(Number(qtyArray[i] || 0) + 1);
    setNumberOfItem(qtyArray);
    if (Number(qtyArray[i]) > 0) {
      updateCartQty(itemId, i, Number(qtyArray[i]));
    }
  }

  const decreaseNumberOfItem = (itemId: string, i: number) => {
    let qtyArray: Array<string> = [...numberOfItem];
    qtyArray[i] = String(Number(qtyArray[i]) > 1 ? Number(qtyArray[i]) - 1 : 1);
    setNumberOfItem(qtyArray);
    if (Number(qtyArray[i]) > 0) {
      updateCartQty(itemId, i, Number(qtyArray[i]));
    }
  }

  const calculateMarkedPrice = () => {
    let totalMarkedPrice: number = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalMarkedPrice += Number(cartItems[i].markedPrice) * Number(numberOfItem[i]);
    }
    return Number(totalMarkedPrice);
  }

  const calculateDiscount = () => {
    let totalDiscount: number = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalDiscount += Number(cartItems[i].markedPrice - cartItems[i].sellingPrice) * Number(numberOfItem[i]);
    }
    return Number(totalDiscount);
  }

  const claculateDeliverCharges = () => {
    return 'Free'
  }

  const calculateSellingPrice = () => {
    let totalSellingPrice: number = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalSellingPrice += Number(cartItems[i].sellingPrice) * Number(numberOfItem[i]);
    }
    return Number(totalSellingPrice);
  }

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
          {cartItems &&
            cartItems.map((item: any, i: number) => {
              return (
                <div key={i} className='cursor-pointer shadow-[0_3px_6px_rgb(0_0_0_/_16%)] bg-white mt-2 p-4 flex'>
                  <div className='w-[150px] h-[150px] flex items-center justify-center m-auto'>
                    <img src={item.imgUrls[0]} alt="" className='max-w-full max-h-full' />
                  </div>
                  <div className='ml-4 mr-4 w-[calc(100%-150px-1rem)]'>
                    <div className='flex items-center justify-between'>
                      <div className='font-[600] text-[16px] truncate'>{item?.itemDescription}</div>
                      <div className='text-[16px] text-[#388e3c] w-[170px]'>Delivery in 2 days, Wed</div>
                    </div>
                    <div className='mt-2 flex'>
                      <div className='flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                        <span>3.7</span>
                        <IoIosStar className='mb-[1px]' />
                      </div>
                      <div className='ml-2 text-[#878787] font-[500]'>{item?.ratingsAndReviewsDetails?.numberOfRating || 0} Ratings</div>
                      <div className='ml-2 text-[#878787] font-[500]'>&</div>
                      <div className='ml-2 text-[#878787] font-[500]'>{item?.ratingsAndReviewsDetails?.numberOfReview || 0} Reviews</div>
                    </div>
                    <div className='mt-2 text-[#388e3c] font-[600]'>Extra <Currency value={item.markedPrice * (Number(numberOfItem[i]) || 1) - item.sellingPrice * (Number(numberOfItem[i]) || 1)} /> off</div>
                    <div className='flex items-center'>
                      <div className='text-[28px] font-[600] text-[#212121]'><Currency value={item.sellingPrice * (Number(numberOfItem[i]) || 1)} /></div>
                      <div className='ml-[8px] text-[16px] text-[#878787] line-through inline-block'><Currency value={item.markedPrice * (Number(numberOfItem[i]) || 1)} /></div>
                      <div className='ml-[8px] text-[16px] text-[#26a541] font-[500] tracking-normal'><Decimal value={item.discountPercent} />% off</div>
                    </div>
                    <div className='flex items-center'>
                      <button onClick={() => { increaseNumberOfItem(item._id, i) }} type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[30px] flex items-center justify-center'>
                        <IoMdAdd />
                      </button>
                      <input onChange={((event: any) => { UpdateNumberOfItem(item._id, i, event) })} value={numberOfItem[i] || ''} type="text" className='rounded-[4px] border border-solid border-[#8bc5ff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[55px] h-[30px] flex items-center justify-center ml-2 mr-2 text-center' />
                      <button onClick={() => { decreaseNumberOfItem(item._id, i) }} type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[30px] flex items-center justify-center'>
                        <IoMdRemove />
                      </button>
                      <button onClick={() => { deleteCartItem(item._id) }} type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] text-[12px] pl-4 pr-4 ml-4 h-[30px] flex items-center justify-center'>
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='w-[calc(30%-0.5rem)] bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] ml-2 border-box min-w-[200px]'>
          <div className='sticky top-[75px]'>
            <div className='p-4 border-b border-solid border-[#ccc] text-[#878787] text-[16px]'>PRICE DETAILS</div>
            <div className='pl-4 pr-4'>
              <div className='flex items-center justify-between mt-3 mb-3 text-[16px] h-[30px]'>
                <span className=''>Price ({cartItems.length} item)</span>
                <span className='text-[#878787] line-through'><Currency value={calculateMarkedPrice()} /></span>
              </div>
              <div className='flex items-center justify-between mt-3 mb-3 text-[16px] h-[30px]'>
                <span className=''>Discount</span>
                <span className='text-[#388e3c]'>- <Currency value={calculateDiscount()} /></span>
              </div>
              <div className='flex items-center justify-between mt-3 mb-3 text-[16px] h-[30px]'>
                <span className=''>Delivery-charges</span>
                <span className='text-[#388e3c]'>{claculateDeliverCharges()}</span>
              </div>
              <div className='flex items-center justify-between mt-4 mb-4 text-[18px] font-[600] h-[40px] border-t border-b border-dashed border-[#ccc]'>
                <span>Total Amount</span>
                <span><Currency value={calculateSellingPrice()} /></span>
              </div>
              <div className='mt-4 mb-4 text-[16px] leading-[30px] text-[#388e3c]'>You will save <Currency value={calculateDiscount()} /> on this order</div>
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