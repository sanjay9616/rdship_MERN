"use client"
import React, { useState } from 'react'
import { IoMdAdd, IoMdRemove, IoIosStar } from "react-icons/io"
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { IoShareSocialSharp, IoCart } from "react-icons/io5";
import { MdLocationOn, MdFavorite } from "react-icons/md";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Item from '@/components/Item';
import RateProductsDialog from '@/components/RateProductsDialog';
import DialogContent from '@mui/material/DialogContent';
import { Button, Dialog } from '@mui/material';
import AskQuestionsDialog from '@/components/AskQuestionsDialog';

const page = () => {

    const [isOpenRateDialog, setIsOpenRateDialog] = useState(false);
    const [isOpenAskQuestionDialog, setIsOpenAskQuestionDialog] = useState(false);

    const handleOpenCloseRateDialog = (isOpen: boolean) => {
        setIsOpenRateDialog(isOpen);
    };

    const handleOpenCloseAskQuestionDialog = (isOpen: boolean) => {
        setIsOpenAskQuestionDialog(isOpen);
    };

    return (
        <section>
            <div className='flex m-2'>
                <div className='flex w-[80%] bg-white'>
                    <div className='w-[40%] border-r-[1px] b-r-[#ccc]'>
                        <div className='sticky top-[75px] m-2 rounded-[5px] border border-solid border-[#ccc]'>
                            <div className='flex'>
                                <div className='flex items-center justify-center p-4 h-[400px] w-full'>
                                    <img src="/1.webp" alt="" className='max-w-full max-h-full rounded-[10px]' />
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
                                <div className='flex items-center justify-center h-[60px] w-[60px] m-1 p-1 rounded-[4px] border border-solid border-[#ccc]'>
                                    <img src="/1.webp" alt="" className='max-w-full max-h-full' />
                                </div>
                                <div className='flex items-center justify-center h-[60px] w-[60px] m-1 p-1 rounded-[4px] border border-solid border-[#ccc]'>
                                    <img src="/1.webp" alt="" className='max-w-full max-h-full' />
                                </div>
                                <div className='flex items-center justify-center h-[60px] w-[60px] m-1 p-1 rounded-[4px] border border-solid border-[#ccc]'>
                                    <img src="/1.webp" alt="" className='max-w-full max-h-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[60%] p-4'>
                        <div className='font-[600] leading-[30px] tracking-[0.5px] text-[22px]'>
                            <span>Sunfeast Dark Fantasy Choco Fills Cream Filled</span>
                            <br />
                            <span className='capitalize text-[#212121] text-[18px] font-[500] leading-[1.4]'>(pack of: 1)</span>
                            <span className='capitalize text-[#212121] text-[18px] font-[500] leading-[1.4]'> (quantity: 300 g)</span>
                        </div>
                        <div className='mt-4 flex'>
                            <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                <span>3.7</span>
                                <IoIosStar className='mb-[1px]' />
                            </div>
                            <div className='ml-2 text-[#878787] font-[500]'>2 Ratings</div>
                            <div className='ml-2 text-[#878787] font-[500]'>&</div>
                            <div className='ml-2 text-[#878787] font-[500]'>2 Reviews</div>
                        </div>
                        <div className='mt-4 text-[#388e3c] font-[500]'>Extra ₹72 off</div>
                        <div className='mt-4 flex items-center'>
                            <div className='text-[28px] font-[600] text-[#212121]'>₹98</div>
                            <div className='ml-[8px] text-[16px] text-[#878787] line-through inline-block'>₹170</div>
                            <div className='ml-[8px] text-[16px] text-[#26a541] font-[500] tracking-normal'>42% off</div>
                        </div>
                        <div className='mt-4 fex items-center'>
                            <div className='mt-4 flex items-center'>
                                <div className='w-[100px] text-[16px] font-[500] text-[#212121] capitalize'>quantity</div>
                                <div className='flex gap-4'>
                                    <div className='flex'>
                                        <input type="radio" className='hidden' />
                                        <div className='flex items-center justify-center border-2 border-solid border-[#e0e0e0] w-[70px] h-[30px] cursor-pointer'>300 g</div>
                                    </div>
                                    <div className='flex'>
                                        <input type="radio" className='hidden' />
                                        <div className='flex items-center justify-center border-2 border-solid border-[#e0e0e0] w-[70px] h-[30px] cursor-pointer'>600 g</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4 fex items-center'>
                            <div className='mt-4 flex items-center'>
                                <div className='w-[100px] text-[16px] font-[500] text-[#212121] capitalize'>Pack Of</div>
                                <div className='flex gap-4'>
                                    <div className='flex'>
                                        <input type="radio" className='hidden' />
                                        <div className='flex items-center justify-center border-2 border-solid border-[#e0e0e0] w-[70px] h-[30px] cursor-pointer'>1</div>
                                    </div>
                                    <div className='flex'>
                                        <input type="radio" className='hidden' />
                                        <div className='flex items-center justify-center border-2 border-solid border-[#e0e0e0] w-[70px] h-[30px] cursor-pointer'>2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className='text-[16px] font-[600] text-[#212121]'>Highlights</div>
                            <div className='mt-2 border-b border-dashed border-[#c7c7c7]'>
                                <div className='p-[5px] border-l border-t border-r border-dashed border-[#c7c7c7] even:bg-[#f2f2f2]'>Type: Cream Filled</div>
                                <div className='p-[5px] border-l border-t border-r border-dashed border-[#c7c7c7] even:bg-[#f2f2f2]'>Base Flavor: Chocolate</div>
                                <div className='p-[5px] border-l border-t border-r border-dashed border-[#c7c7c7] even:bg-[#f2f2f2]'>Vegetarian</div>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <div className='text-[16px] font-[600] text-[#212121]'>Highlights</div>
                            <table className='border-b border-dashed border-[#c7c7c7] w-full'>
                                <tbody>
                                    <tr className='border-t border-l border-r border-dashed border-[#c7c7c7] w-full even:bg-[#f2f2f2]'>
                                        <td className='border-r border-dashed border-[#c7c7c7] w-[25%] p-[10px]'>Base Flavors</td>
                                        <td className='w-[75%] p-[10px]'>Chocolate</td>
                                    </tr>
                                    <tr className='border-t border-l border-r border-dashed border-[#c7c7c7] w-full even:bg-[#f2f2f2]'>
                                        <td className='border-r border-dashed border-[#c7c7c7] w-[25%] p-[10px]'>Base Flavors</td>
                                        <td className='w-[75%] p-[10px]'>Chocolate</td>
                                    </tr>
                                    <tr className='border-t border-l border-r border-dashed border-[#c7c7c7] w-full even:bg-[#f2f2f2]'>
                                        <td className='border-r border-dashed border-[#c7c7c7] w-[25%] p-[10px]'>Base Flavors</td>
                                        <td className='w-[75%] p-[10px]'>Chocolate</td>
                                    </tr>
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
                                        <RateProductsDialog />
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className='flex'>
                                <div className='w-[50%] flex flex-col justify-between'>
                                    <div className='flex items-center justify-center h-[100px] w-[100px] m-auto border-[5px] solid border-[#8bc5ff] rounded-[50%]'>
                                        <span className='text-[30px] text-[#299e22] font-[600]'>3.5</span>
                                        <IoIosStar className='text-[#299e22] text-[25px] ' />
                                    </div>
                                    <div className='mt-2'>Average Rating based on 2 ratings and 2 reviews</div>
                                </div>
                                <div className='w-[50%]'>
                                    <div className='flex items-center mb-2'>
                                        <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                            <span>5</span>
                                            <IoIosStar className='mb-[1px]' />
                                        </div>
                                        <Box sx={{ width: '100%' }} className="ml-2 mr-2">
                                            <LinearProgress variant="determinate" value={70} />
                                        </Box>
                                        <div className='text-[#6f6f6f]'>5</div>
                                    </div>
                                    <div className='flex items-center mb-2'>
                                        <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                            <span>4</span>
                                            <IoIosStar className='mb-[1px]' />
                                        </div>
                                        <Box sx={{ width: '100%' }} className="ml-2 mr-2">
                                            <LinearProgress variant="determinate" value={70} />
                                        </Box>
                                        <div className='text-[#6f6f6f]'>5</div>
                                    </div>
                                    <div className='flex items-center mb-2'>
                                        <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                            <span>3</span>
                                            <IoIosStar className='mb-[1px]' />
                                        </div>
                                        <Box sx={{ width: '100%' }} className="ml-2 mr-2">
                                            <LinearProgress variant="determinate" value={70} />
                                        </Box>
                                        <div className='text-[#6f6f6f]'>5</div>
                                    </div>
                                    <div className='flex items-center mb-2'>
                                        <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                            <span>2</span>
                                            <IoIosStar className='mb-[1px]' />
                                        </div>
                                        <Box sx={{ width: '100%' }} className="ml-2 mr-2">
                                            <LinearProgress variant="determinate" value={70} />
                                        </Box>
                                        <div className='text-[#6f6f6f]'>5</div>
                                    </div>
                                    <div className='flex items-center mb-2'>
                                        <div className='ml-[8px] flex items-center justify-between bg-[#388e3c] w-[45px] rounded-[3px] text-white text-[14px] pl-[5px] pr-[5px]'>
                                            <span>1</span>
                                            <IoIosStar className='mb-[1px]' />
                                        </div>
                                        <Box sx={{ width: '100%' }} className="ml-2 mr-2">
                                            <LinearProgress variant="determinate" value={70} />
                                        </Box>
                                        <div className='text-[#6f6f6f]'>5</div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 pt-4 border-t-[2px]  border-dashed border-[#ccc]'>
                                <div className='flex items-center'>
                                    <div className='flex items-center gap-[5px] border-r border-solid border-[#c4c4c4] pr-2 mr-2'>
                                        <IoIosStar className='text-[#fdb92c] h-[25px] w-[25px]' />
                                        <IoIosStar className='text-[#fdb92c] h-[25px] w-[25px]' />
                                        <IoIosStar className='text-[#fdb92c] h-[25px] w-[25px]' />
                                        <IoIosStar className='text-[#fdb92c] h-[25px] w-[25px]' />
                                        <IoIosStar className='text-[#fdb92c] h-[25px] w-[25px]' />
                                        <IoIosStar className='text-[#efeff4] h-[25px] w-[25px]' />
                                    </div>
                                    <div className='text-[14px] text-[#299e22]'>Verified Purchase</div>
                                </div>
                                <div className='mt-2 text-[14px] font-[600]'>Sanjay Kumar</div>
                                <div className='text-[12px] text-[#6f6f6f]'>01-Jan-1970</div>
                                <div className='mt-2 flex'>
                                    Nice
                                    <div className='ml-auto mt-auto flex items-center'>
                                        <button type='button' className='border border-solid border-[#ccc] rounded-[4px] w-[45px] h-[30px] flex items-center pl-[5px] pr-[10px] text-[#ccc] bg-white '>
                                            <BiSolidLike />
                                            <span>1</span>
                                        </button>
                                        <button type='button' className='ml-2 border border-solid border-[#ccc] rounded-[4px] w-[45px] h-[30px] flex items-center pl-[5px] pr-[10px] text-[#ccc] bg-white '>
                                            <BiSolidDislike />
                                            <span>1</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 pt-4 border-t-[2px]  border-dashed border-[#ccc]'>
                                <div className='flex items-center'>
                                    <div className='flex items-center gap-[5px] border-r border-solid border-[#c4c4c4] pr-2 mr-2'>
                                        <IoIosStar className='text-[#fdb92c] h-[25px] w-[25px]' />
                                        <IoIosStar className='text-[#fdb92c] h-[25px] w-[25px]' />
                                        <IoIosStar className='text-[#fdb92c] h-[25px] w-[25px]' />
                                        <IoIosStar className='text-[#fdb92c] h-[25px] w-[25px]' />
                                        <IoIosStar className='text-[#fdb92c] h-[25px] w-[25px]' />
                                        <IoIosStar className='text-[#efeff4] h-[25px] w-[25px]' />
                                    </div>
                                    <div className='text-[14px] text-[#299e22]'>Verified Purchase</div>
                                </div>
                                <div className='mt-2 text-[14px] font-[600]'>Sanjay Kumar</div>
                                <div className='text-[12px] text-[#6f6f6f]'>01-Jan-1970</div>
                                <div className='mt-2 flex'>
                                    Nice
                                    <div className='ml-auto mt-auto flex items-center'>
                                        <button type='button' className='border border-solid border-[#ccc] rounded-[4px] w-[45px] h-[30px] flex items-center pl-[5px] pr-[10px] text-[#ccc] bg-white '>
                                            <BiSolidLike />
                                            <span>1</span>
                                        </button>
                                        <button type='button' className='ml-2 border border-solid border-[#ccc] rounded-[4px] w-[45px] h-[30px] flex items-center pl-[5px] pr-[10px] text-[#ccc] bg-white '>
                                            <BiSolidDislike />
                                            <span>1</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        <AskQuestionsDialog />
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className='flex items-center justify-between mt-2 pt-2 border-t border-dashed border-[#c7c7c7]'>
                                <div className='w-[83%]'>
                                    <div className='text-[14px] font-[600] truncate'> Q1: What is The flavour?</div>
                                    <div className='text-[14px] text-[#6f6f6f] truncate'> Ans: Chocolate </div>
                                </div>
                                <div className='flex items-center'>
                                    <button type='button' className='border border-solid border-[#ccc] rounded-[4px] w-[45px] h-[30px] flex items-center pl-[5px] pr-[10px] text-[#ccc] bg-white '>
                                        <BiSolidLike />
                                        <span>1</span>
                                    </button>
                                    <button type='button' className='ml-2 border border-solid border-[#ccc] rounded-[4px] w-[45px] h-[30px] flex items-center pl-[5px] pr-[10px] text-[#ccc] bg-white '>
                                        <BiSolidDislike />
                                        <span>1</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[20%] bg-white ml-2'>
                    <div className='sticky top-[75px] m-2 border border-solid border-[#ccc] rounded-[5px] p-2'>
                        <div className='mt-2 flex items-center'>
                            <div className='text-[28px] font-[600] text-[#212121]'>₹98</div>
                            <div className='ml-[8px] text-[16px] text-[#878787] line-through inline-block'>₹170</div>
                            <div className='ml-[8px] text-[16px] text-[#26a541] font-[500] tracking-normal'>42% off</div>
                        </div>
                        <div className='mt-2 text-[#388e3c] font-[500]'>Extra ₹72 off</div>
                        <div className='flex items-center justify-between w-full mt-4 text-[16px] font-[500]'>
                            <div className='font-[600]'>Update Qty</div>
                            <div className='flex items-center'>
                                <button type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[30px] flex items-center justify-center'>
                                    <IoMdAdd />
                                </button>
                                <input type="text" className='rounded-[4px] border border-solid border-[#8bc5ff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[55px] h-[30px] flex items-center justify-center m-2 mr-2 text-center' />
                                <button type='button' className='rounded-[4px] border border-solid border-[#8bc5ff] bg-[#dbedff] shadow-[0_3px_6px_rgb(0_0_0_/_16%)] w-[35px] h-[30px] flex items-center justify-center'>
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
        </section>
    )
}

export default page