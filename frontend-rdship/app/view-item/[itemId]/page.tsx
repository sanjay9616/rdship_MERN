"use client"
import React, { useEffect, useState } from 'react'
import { IoMdAdd, IoMdRemove, IoIosStar } from "react-icons/io"
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { IoShareSocialSharp, IoCart } from "react-icons/io5";
import { MdLocationOn, MdFavorite } from "react-icons/md";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Item from '@/components/Item';
import RateProductsDialog from '@/components/RateProductsDialog';
import DialogContent from '@mui/material/DialogContent';
import { Button, Dialog, Rating } from '@mui/material';
import AskQuestionsDialog from '@/components/AskQuestionsDialog';
import { AlertMessageService } from '@/services/alertmessage.service';
import { HomeService } from '@/services/home.service';
import { LoaderService } from '@/services/loader.service';
import { MESSAGE } from '@/config/message';
import Currency from '@/components/Currency';
import Decimal from '@/components/Decimal';
import { naturalNumber } from '@/utils/natural-number.util';
import { useSelector } from 'react-redux';

const homeService = new HomeService();
const alertMessage = new AlertMessageService();
const loaderService = new LoaderService();

const page = (props: any) => { // need to recent view item api

    const itemId: string = props.params.itemId;
    const userId: string = useSelector((state: any) => state.userReducer._id);

    const [isOpenRateDialog, setIsOpenRateDialog] = useState<boolean>(false);
    const [isOpenAskQuestionDialog, setIsOpenAskQuestionDialog] = useState<boolean>(false);
    const [itemDetails, setItemDetails] = useState<any>({});
    const [qtyValue, setQtyValue] = useState('');
    const [activeProduct, setActiveProduct] = useState<any>({});

    const handleOpenCloseRateDialog = (isOpen: boolean) => {
        setIsOpenRateDialog(isOpen);
    };

    const handleOpenCloseAskQuestionDialog = (isOpen: boolean) => {
        setIsOpenAskQuestionDialog(isOpen);
    };

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        try {
            loaderService.showLoader();
            const res = await homeService.getItemInfo(itemId)
            if (res?.status == 200 && res?.success) {
                setItemDetails(res?.data);
                setActiveProduct(res?.data.itemDetails.activeProduct);
                loaderService.hideLoader();
            } else {
                alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
                loaderService.hideLoader();
            }
        } finally {
            loaderService.hideLoader();
        }
    }

    const updateQty = (even: any) => {
        setQtyValue(naturalNumber(event))
    }

    const handleSubmitProductReview = (message: any) => {
        if (message.responce) setItemDetails({ similarProducts: itemDetails.similarProducts, itemDetails: message.responce });
        handleOpenCloseRateDialog(message.isOpen);
    }

    const handleSubmitQuestion = (message: any) => {
        if (message.responce) setItemDetails({ similarProducts: itemDetails.similarProducts, itemDetails: message.responce });
        handleOpenCloseAskQuestionDialog(message.isOpen);
    }

    const questionVote = async (questionId: string, vote: string) => {
        try {
            loaderService.showLoader();
            const res = await homeService.questionVote(userId, itemDetails.itemDetails._id, questionId, vote, {})
            if (res?.status == 200 && res?.success) {
                alertMessage.addSuccess(MESSAGE.SUCCESS.QUESTION_VOTE_SUBMITTED).show();
                setItemDetails({ similarProducts: itemDetails.similarProducts, itemDetails: res?.data });
                loaderService.hideLoader();
            } else {
                alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
                loaderService.hideLoader();
            }
        } finally {
            loaderService.hideLoader();
        }
    }

    const ratingVote = async (questionId: string, vote: string) => {
        try {
            loaderService.showLoader();
            const res = await homeService.ratingVote(userId, itemDetails.itemDetails._id, questionId, vote, {})
            if (res?.status == 200 && res?.success) {
                alertMessage.addSuccess(MESSAGE.SUCCESS.REVIEW_VOTE_SUBMITTED).show();
                setItemDetails({ similarProducts: itemDetails.similarProducts, itemDetails: res?.data });
                loaderService.hideLoader();
            } else {
                alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
                loaderService.hideLoader();
            }
        } finally {
            loaderService.hideLoader();
        }
    }

    const changeProductSpecification = async (name: string, value: string) => {
        let active = {...activeProduct}
        active[name] = value;
        try {
            loaderService.showLoader();
            const res = await homeService.changeProductSpecification(itemDetails.itemDetails.itemDescription, active)
            if (res?.status == 200 && res?.success) {
                setItemDetails(res?.data);
                setActiveProduct(res?.data.itemDetails.activeProduct);
                loaderService.hideLoader();
            } else {
                alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
                loaderService.hideLoader();
            }
        } finally {
            loaderService.hideLoader();
        }
    }

    return (
        <section>
            {itemDetails && itemDetails.itemDetails &&
                <div className='flex m-2'>
                    <div className='flex w-[80%] bg-white'>
                        <div className='w-[40%] border-r-[1px] b-r-[#ccc]'>
                            <div className='sticky top-[75px] m-2 rounded-[5px] border border-solid border-[#ccc]'>
                                <div className='flex'>
                                    <div className='flex items-center justify-center p-4 h-[400px] w-full'>
                                        <img src={itemDetails.itemDetails.imgUrls[0]} alt="" className='max-w-full max-h-full rounded-[10px]' />
                                    </div>
                                    <div className='flex flex-col mt-4 mr-[10px]'>
                                        <button type='button' className='mr-2 p-0 rounded-[4px] bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[35px] flex items-center justify-center text-[#ccc]'>
                                            <MdFavorite />
                                        </button>
                                        <button type='button' className='mt-2 mr-2 p-0 rounded-[4px] bg-white shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[35px] flex items-center justify-center'>
                                            <IoShareSocialSharp />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-wrap ml-4 mr-4'>
                                    {itemDetails.itemDetails.imgUrls.map((url: string, i: number) => {
                                        return (
                                            <div key={i} className='flex items-center justify-center h-[60px] w-[60px] m-1 p-1 rounded-[4px] border border-solid border-[#ccc]'>
                                                <img src={url} alt="" className='max-w-full max-h-full' />
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w-[60%] p-4'>
                            <div className='font-[600] leading-[30px] tracking-[0.5px] text-[22px]'>
                                <span>{itemDetails.itemDetails.itemDescription}</span>
                                <br />
                                {
                                    Object.entries(itemDetails.itemDetails.activeProduct).map(([key, val]: any, i: number) =>
                                        <span key={i} className='capitalize text-[#212121] text-[18px] font-[500] leading-[1.4]'>({(key).split('_').join(' ')}: {val}) </span>
                                    )
                                }
                            </div>
                            <div className='mt-4 flex'>
                                <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                    <span><Decimal value={itemDetails.itemDetails?.ratingsAndReviewsDetails?.overAllRating || 0} decimalDigits={1} /></span>
                                    <IoIosStar className='mb-[1px]' />
                                </div>
                                <div className='ml-2 text-[#878787] font-[500]'>{itemDetails.itemDetails?.ratingsAndReviewsDetails?.numberOfRating || 0} Ratings</div>
                                <div className='ml-2 text-[#878787] font-[500]'>&</div>
                                <div className='ml-2 text-[#878787] font-[500]'>{itemDetails.itemDetails?.ratingsAndReviewsDetails?.numberOfReview || 0} Reviews</div>
                            </div>
                            <div className='mt-4 text-[#388e3c] font-[500]'>Extra <Currency value={itemDetails.itemDetails.markedPrice * (Number(qtyValue) || 1) - itemDetails.itemDetails.sellingPrice * (Number(qtyValue) || 1)} /> off</div>
                            <div className='mt-4 flex items-center'>
                                <div className='text-[28px] font-[600] text-[#212121]'><Currency value={itemDetails.itemDetails.sellingPrice * (Number(qtyValue) || 1)} /></div>
                                <div className='ml-[8px] text-[16px] text-[#878787] line-through inline-block'><Currency value={itemDetails.itemDetails.markedPrice * (Number(qtyValue) || 1)} /></div>
                                <div className='ml-[8px] text-[16px] text-[#26a541] font-[500] tracking-normal'><Decimal value={itemDetails.itemDetails.discountPercent} />% off</div>
                            </div>
                            {itemDetails.itemDetails.filterAttributesList.map((filterAttr: any, i: number) => {
                                return (
                                    <div key={i} className='mt-4 fex items-center'>
                                        <div className='mt-4 flex items-center'>
                                            <div className='w-[100px] text-[16px] font-[500] text-[#212121] capitalize'>{filterAttr?.name.split('_').join(' ')}</div>
                                            <div className='flex gap-4'>
                                                {filterAttr.items.map((item: any, j: number) => {
                                                    return (
                                                        <div key={j} onClick={() => {changeProductSpecification(filterAttr?.name, item.value)}} className='flex'>
                                                            <input type="radio" value={item.value} className='hidden' name={filterAttr?.name.split('_').join(' ')}/>
                                                            <div className={(item.selected ? 'border-[#2874f0]' : 'border-[#e0e0e0]') + " flex items-center justify-center border-2 border-solid w-[70px] h-[30px] cursor-pointer"}>{item.value}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                            <div className='mt-4'>
                                <div className='text-[16px] font-[600] text-[#212121]'>Highlights</div>
                                <div className='mt-2 border-b border-dashed border-[#c7c7c7]'>
                                    {itemDetails.itemDetails.highLights.map((point: string) => {
                                        return (
                                            <div key={point} className='p-[5px] border-l border-t border-r border-dashed border-[#c7c7c7] even:bg-[#f2f2f2]'>{point}</div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='mt-6'>
                                <div className='text-[16px] font-[600] text-[#212121]'>Product Specifications</div>
                                <table className='border-b border-dashed border-[#c7c7c7] w-full'>
                                    <tbody>
                                        {
                                            Object.entries(itemDetails.itemDetails.specifications).map(([key, val]: any, i: number) => {
                                                return (
                                                    <tr key={i} className='border-t border-l border-r border-dashed border-[#c7c7c7] w-full even:bg-[#f2f2f2]'>
                                                        <td className='border-r border-dashed border-[#c7c7c7] w-[25%] p-[10px]'>{key}</td>
                                                        <td className='w-[75%] p-[10px]'>{val}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='border border-solid border-[#c7c7c7] mt-4 p-2 rounded-[5px]'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <div className='text-[16px] font-[600] text-[#212121]'>Reviews & Ratings</div>
                                    <Button type='button' onClick={() => handleOpenCloseRateDialog(true)} className='h-[30px] pl-[10px] pr-[10px] bg-[#fae0e1] hover:bg-[#fae0e1] text-[#d9232d] text-[12px] rounded-[5px] font-[600]'>
                                        Rate Product
                                    </Button>
                                    <Dialog
                                        fullWidth={true}
                                        maxWidth={'sm'}
                                        open={isOpenRateDialog}
                                        onClose={() => handleOpenCloseRateDialog(false)}>
                                        <DialogContent>
                                            <RateProductsDialog id={itemDetails.itemDetails._id} submitProductReview={handleSubmitProductReview} />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className='flex'>
                                    <div className='w-[50%] flex flex-col justify-between'>
                                        <div className='flex items-center justify-center h-[100px] w-[100px] m-auto border-[5px] solid border-[#8bc5ff] rounded-[50%]'>
                                            <span className='text-[30px] text-[#299e22] font-[600]'>3.5</span>
                                            <IoIosStar className='text-[#299e22] text-[25px] ' />
                                        </div>
                                        <div className='mt-2'>Average Rating based on {itemDetails?.itemDetails?.ratingsAndReviewsDetails?.numberOfRating || 0} ratings and {itemDetails?.itemDetails?.ratingsAndReviewsDetails?.numberOfReview || 0} reviews</div>
                                    </div>
                                    <div className='w-[50%]'>
                                        <div className='flex items-center mb-2'>
                                            <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                                <span>5</span>
                                                <IoIosStar className='mb-[1px]' />
                                            </div>
                                            <Box sx={{ width: '100%' }} className="ml-2 mr-2">
                                                <LinearProgress variant="determinate" value={(itemDetails?.itemDetails?.ratingsAndReviewsDetails?.totalFive) / (itemDetails?.itemDetails?.ratingsAndReviewsDetails?.numberOfRating) * 100 || 0} />
                                            </Box>
                                            <div className='text-[#6f6f6f]'>{itemDetails?.itemDetails?.ratingsAndReviewsDetails?.totalFive || 0}</div>
                                        </div>
                                        <div className='flex items-center mb-2'>
                                            <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                                <span>4</span>
                                                <IoIosStar className='mb-[1px]' />
                                            </div>
                                            <Box sx={{ width: '100%' }} className="ml-2 mr-2">
                                                <LinearProgress variant="determinate" value={(itemDetails?.itemDetails?.ratingsAndReviewsDetails?.totalFour) / (itemDetails?.itemDetails?.ratingsAndReviewsDetails?.numberOfRating) * 100 || 0} />
                                            </Box>
                                            <div className='text-[#6f6f6f]'>{itemDetails?.itemDetails?.ratingsAndReviewsDetails?.totalFour || 0}</div>
                                        </div>
                                        <div className='flex items-center mb-2'>
                                            <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                                <span>3</span>
                                                <IoIosStar className='mb-[1px]' />
                                            </div>
                                            <Box sx={{ width: '100%' }} className="ml-2 mr-2">
                                                <LinearProgress variant="determinate" value={(itemDetails?.itemDetails?.ratingsAndReviewsDetails?.totalThree) / (itemDetails?.itemDetails?.ratingsAndReviewsDetails?.numberOfRating) * 100 || 0} />
                                            </Box>
                                            <div className='text-[#6f6f6f]'>{itemDetails?.itemDetails?.ratingsAndReviewsDetails?.totalThree || 0}</div>
                                        </div>
                                        <div className='flex items-center mb-2'>
                                            <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                                <span>2</span>
                                                <IoIosStar className='mb-[1px]' />
                                            </div>
                                            <Box sx={{ width: '100%' }} className="ml-2 mr-2">
                                                <LinearProgress variant="determinate" value={(itemDetails?.itemDetails?.ratingsAndReviewsDetails?.totalTwo) / (itemDetails?.itemDetails?.ratingsAndReviewsDetails?.numberOfRating) * 100 || 0} />
                                            </Box>
                                            <div className='text-[#6f6f6f]'>{itemDetails?.itemDetails?.ratingsAndReviewsDetails?.totalTwo || 0}</div>
                                        </div>
                                        <div className='flex items-center mb-2'>
                                            <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                                <span>1</span>
                                                <IoIosStar className='mb-[1px]' />
                                            </div>
                                            <Box sx={{ width: '100%' }} className="ml-2 mr-2">
                                                <LinearProgress variant="determinate" value={(itemDetails?.itemDetails?.ratingsAndReviewsDetails?.totalOne) / (itemDetails?.itemDetails?.ratingsAndReviewsDetails?.numberOfRating) * 100 || 0} />
                                            </Box>
                                            <div className='text-[#6f6f6f]'>{itemDetails?.itemDetails?.ratingsAndReviewsDetails?.totalOne || 0}</div>
                                        </div>
                                    </div>
                                </div>
                                {itemDetails?.itemDetails?.ratingsAndReviews.map((rating: any, i: number) => {
                                    return (
                                        <div key={i} className='mt-4 pt-4 border-t-[2px]  border-dashed border-[#ccc]'>
                                            <div className='flex items-center'>
                                                <div className='flex items-center gap-[5px] border-r border-solid border-[#c4c4c4] pr-2 mr-2'>
                                                    <Rating name="large" size="large" value={rating.rating} readOnly className='mt-2' />
                                                </div>
                                                <div className='text-[14px] text-[#299e22]'>{rating?.isVerifiedPurchase ? 'Verified Purchase' : 'Not Verified Purchase'}</div>
                                            </div>
                                            <div className='mt-2 text-[14px] font-[600]'>{rating?.name}</div>
                                            <div className='text-[12px] text-[#6f6f6f]'>{rating?.date}</div>
                                            <div className='mt-2 flex'>
                                                {rating.review}
                                                <div className='ml-auto mt-auto flex items-center'>
                                                    <button onClick={() => { ratingVote(rating?._id, 'UP') }} type='button' disabled={rating?.likes?.includes(userId)} className={(rating?.likes?.includes(userId) ? "text-[#2874f0] cursor-not-allowed" : "text-[#ccc]") + " border border-solid border-[#ccc] rounded-[4px] w-[45px] h-[30px] flex items-center pl-[5px] pr-[10px] bg-white"}>
                                                        <BiSolidLike />
                                                        <span>{rating?.likes?.length}</span>
                                                    </button>
                                                    <button onClick={() => { ratingVote(rating?._id, 'DOWN') }} type='button' disabled={rating?.disLikes?.includes(userId)} className={(rating?.disLikes?.includes(userId) ? "text-[#2874f0] cursor-not-allowed" : "text-[#ccc]") + " ml-2 border border-solid border-[#ccc] rounded-[4px] w-[45px] h-[30px] flex items-center pl-[5px] pr-[10px] bg-white"}>
                                                        <BiSolidDislike />
                                                        <span>{rating?.disLikes?.length}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })}
                            </div>
                            {itemDetails && itemDetails.itemDetails && itemDetails.itemDetails.questionsAndAnswers && itemDetails.itemDetails.questionsAndAnswers.length > 0 &&
                                <div className='mt-2 p-2 border border-solid border-[#ccc] rounded-[4px]'>
                                    <div className='flex items-center justify-between'>
                                        <div className='text-[16px] font-[600] text-[#212121] pt-2 pb-2'>Frequently Asked Questions</div>
                                        <Button type='button' onClick={() => handleOpenCloseAskQuestionDialog(true)} className='pl-2 pr-2 h-[30px] text-[12px] bg-[#fae0e1] hover:bg-[#fae0e1] text-[#d9232d] rounded-[4px] font-[600]'>
                                            Ask Now
                                        </Button>
                                        <Dialog
                                            fullWidth={true}
                                            maxWidth={'sm'}
                                            open={isOpenAskQuestionDialog}
                                            onClose={() => handleOpenCloseAskQuestionDialog(false)}>
                                            <DialogContent>
                                                <AskQuestionsDialog id={itemDetails.itemDetails._id} submitQuestion={handleSubmitQuestion} />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    {itemDetails?.itemDetails?.questionsAndAnswers.map((question: any, i: number) => {
                                        return (
                                            question?.question && question?.answer &&
                                            <div key={i} className='flex items-center justify-between mt-2 pt-2 border-t border-dashed border-[#c7c7c7]'>
                                                <div className='w-[83%]'>
                                                    <div className='text-[14px] font-[600] truncate'> Q{i + 1}: {question?.question}</div>
                                                    <div className='text-[14px] text-[#6f6f6f] truncate'> Ans: {question?.answer} </div>
                                                </div>
                                                <div className='flex items-center'>
                                                    <button onClick={() => { questionVote(question?._id, 'UP') }} type='button' disabled={question?.likes?.includes(userId)} className={(question?.likes?.includes(userId) ? "text-[#2874f0] cursor-not-allowed" : "text-[#ccc]") + " border border-solid border-[#ccc] rounded-[4px] w-[45px] h-[30px] flex items-center pl-[5px] pr-[10px] bg-white"}>
                                                        <BiSolidLike />
                                                        <span>{question?.likes?.length}</span>
                                                    </button>
                                                    <button onClick={() => { questionVote(question?._id, 'DOWN') }} type='button' disabled={question?.disLikes?.includes(userId)} className={(question?.disLikes?.includes(userId) ? "text-[#2874f0] cursor-not-allowed" : "text-[#ccc]") + " ml-2 border border-solid border-[#ccc] rounded-[4px] w-[45px] h-[30px] flex items-center pl-[5px] pr-[10px] bg-white"}>
                                                        <BiSolidDislike />
                                                        <span>{question?.disLikes?.length}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                    <div className='w-[20%] bg-white ml-2'>
                        <div className='sticky top-[75px] m-2 border border-solid border-[#ccc] rounded-[5px] p-2'>
                            <div className='mt-2 flex items-center'>
                                <div className='text-[28px] font-[600] text-[#212121]'><Currency value={itemDetails.itemDetails.sellingPrice * (Number(qtyValue) || 1)} /></div>
                                <div className='ml-[8px] text-[16px] text-[#878787] line-through inline-block'><Currency value={itemDetails.itemDetails.markedPrice * (Number(qtyValue) || 1)} /></div>
                                <div className='ml-[8px] text-[16px] text-[#26a541] font-[500] tracking-normal'><Decimal value={itemDetails.itemDetails.discountPercent} />% off</div>
                            </div>
                            <div className='mt-2 text-[#388e3c] font-[500]'>Extra <Currency value={itemDetails.itemDetails.markedPrice * (Number(qtyValue) || 1) - itemDetails.itemDetails.sellingPrice * (Number(qtyValue) || 1)} /> off</div>
                            <div className='flex items-center justify-between w-full mt-4 text-[16px] font-[500]'>
                                <div className='font-[600]'>Update Qty</div>
                                <div className='flex items-center'>
                                    <button onClick={() => { setQtyValue(String(Number(qtyValue || 0) + 1)) }} type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[30px] flex items-center justify-center'>
                                        <IoMdAdd />
                                    </button>
                                    <input type="text" onChange={(event: any) => { updateQty(event) }} value={qtyValue} className='rounded-[4px] border border-solid border-[#8bc5ff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[55px] h-[30px] flex items-center justify-center m-2 mr-2 text-center' />
                                    <button onClick={() => { setQtyValue(String(Number(qtyValue) > 1 ? Number(qtyValue) - 1 : 1)) }} type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[30px] flex items-center justify-center'>
                                        <IoMdRemove />
                                    </button>
                                </div>
                            </div>
                            <button type='button' className='flex items-center justify-center w-full h-[50px] text-white rounded-[8px] mt-6 bg-[#278bed]'>
                                <IoCart className='h-[25px] w-[25px] mr-2' />
                                <span>ADD TO CART</span>
                            </button>
                            <button type='button' className='flex items-center justify-center w-full h-[50px] text-white rounded-[8px] mt-4 bg-[#d9232d]'>
                                BUY NOW
                            </button>
                            <div className='mt-6 text-[16px] font-[600]'>Delivery Details</div>
                            <div className='bg-white mt-2 flex items-center border h-[40px] items-center rounded-[5px] border-solid border-[#ccc]'>
                                <MdLocationOn className='h-[25px] w-[25px] min-w-[25px] text-[#d9232d]' />
                                <input type="text" className='w-full h-[38px] pl-2 pr-2' />
                                <button type='button' className='h-[35px] pl-[10px] pr-[10px] mr-[1px] text-[#d9232d] text-[12px] bg-[#f8d3d5] ml-auto rounded-[5px]'>CHECK</button>
                            </div>
                            <div className='mt-2 text-[14px] font-[500]'>Check serviceability at your location</div>
                        </div>
                    </div>
                </div>
            }
            {itemDetails && itemDetails.similarProducts && itemDetails.similarProducts.length > 0 &&
                <div className='bg-white'>
                    <div className='flex items-center justify-center p-4 border-t border-b border-solid border-[#F2F2F2]'>
                        <div className='text-[#2874f0] font-[600] text-[22px] leading-[30px] tracking-[.5px]'>
                            RECENTLY VIEWED
                        </div>
                    </div>
                    <div className='flex p-[1rem] scrollbar'>
                        {itemDetails.similarProducts.map((item: any, i: number) => {
                            return (
                                <Item {...item} key={i} />
                            )
                        })}
                    </div>
                </div>
            }
        </section>
    )
}

export default page