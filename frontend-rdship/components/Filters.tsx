"use client"
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { IoFilterSharp } from "react-icons/io5";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Autocomplete, Button, TextField } from '@mui/material';
import { IoMdCloseCircleOutline } from "react-icons/io";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


const Filters = () => {

    const [isActiveFilter, setIsActiveFilter] = React.useState<boolean>(false);
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const openCloseFilters = () => {
        setIsActiveFilter(!isActiveFilter)
    }

    return (
        <div>
            <div className='flex items-center bg-white mt-2 mr-2 ml-2 p-2 rounded-[5px] shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>
                <div className='text-[#878787]'>
                    <span>Home {'>'} </span>
                    <span>Grocery</span>
                </div>
                <div className='flex items-center ml-4'>
                    <button type="button" onClick={() => openCloseFilters()} className='flex items-center h-[30px] pl-2 pr-2 text-[16px]'>
                        <IoFilterSharp />
                        <span className='ml-2'>Filters</span>
                    </button>
                </div>
                <button type='button' className='ml-auto pl-2 pr-2 text-[14px] text-[#2874f0]'>CLEAR ALL</button>
            </div>
            {isActiveFilter &&
                <div className='flex items-center gap-2 bg-white mt-2 mr-2 ml-2 p-2 rounded-[5px] shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>
                    <FormControl className='w-full'>
                        <InputLabel id="demo-multiple-checkbox-label">Sub Categories</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Sub Categories" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            <li className='flex items-center pt-[6px] w-fill pl-[7px] pr-[16px]'>
                                <Checkbox />
                                <input type="text" onKeyDown={(e) => e.stopPropagation()} placeholder='Search Sub Categories' className='w-full' />
                                <button type='button' className='h-[25px] w-[25px]'><IoMdCloseCircleOutline className='w-full h-full' /></button>
                            </li>
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.includes(name)} className='p-0' />
                                    <ListItemText primary={name} className='ml-4' />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className='w-full'>
                        <InputLabel id="brand-multiple-checkbox-label">Brand</InputLabel>
                        <Select
                            labelId="brand-multiple-checkbox-label"
                            id="brand-multiple-checkbox"
                            multiple
                            value={['brand1']}
                            input={<OutlinedInput label="Brand" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            <li className='flex items-center pt-[6px] w-fill pl-[7px] pr-[16px]'>
                                <Checkbox />
                                <input type="text" onKeyDown={(e) => e.stopPropagation()} placeholder='Search Sub Categories' className='w-full' />
                                <button type='button' className='h-[25px] w-[25px]'><IoMdCloseCircleOutline className='w-full h-full' /></button>
                            </li>
                            <MenuItem key='brand1' value='brand1'>
                                <Checkbox className='p-0' />
                                <ListItemText primary={'brand1'} className='ml-4' />
                            </MenuItem>
                            <MenuItem key='brand2' value='brand2'>
                                <Checkbox className='p-0' />
                                <ListItemText primary={'brand2'} className='ml-4' />
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className='w-full'>
                        <InputLabel id="price-multiple-checkbox-label">Price</InputLabel>
                        <Select
                            labelId="price-multiple-checkbox-label"
                            id="price-multiple-checkbox"
                            multiple
                            value={['price1']}
                            input={<OutlinedInput label="brand" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            <li className='flex items-center pt-[6px] w-fill pl-[7px] pr-[16px]'>
                                <Checkbox />
                                <input type="text" onKeyDown={(e) => e.stopPropagation()} placeholder='Search Sub Categories' className='w-full' />
                                <button type='button' className='h-[25px] w-[25px]'><IoMdCloseCircleOutline className='w-full h-full' /></button>
                            </li>
                            <MenuItem key='price1' value='price1'>
                                <Checkbox className='p-0' />
                                <ListItemText primary={'price1'} className='ml-4' />
                            </MenuItem>
                            <MenuItem key='price2' value='price2'>
                                <Checkbox className='p-0' />
                                <ListItemText primary={'price2'} className='ml-4' />
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className='w-full'>
                        <InputLabel id="rating-multiple-checkbox-label">Rating</InputLabel>
                        <Select
                            labelId="rating-multiple-checkbox-label"
                            id="rating-multiple-checkbox"
                            multiple
                            value={['rating1']}
                            input={<OutlinedInput label="rating" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            <li className='flex items-center pt-[6px] w-fill pl-[7px] pr-[16px]'>
                                <Checkbox />
                                <input type="text" onKeyDown={(e) => e.stopPropagation()} placeholder='Search Sub Categories' className='w-full' />
                                <button type='button' className='h-[25px] w-[25px]'><IoMdCloseCircleOutline className='w-full h-full' /></button>
                            </li>
                            <MenuItem key='rating1' value='rating1'>
                                <Checkbox className='p-0' />
                                <ListItemText primary={'rating1'} className='ml-4' />
                            </MenuItem>
                            <MenuItem key='rating2' value='rating2'>
                                <Checkbox className='p-0' />
                                <ListItemText primary={'rating2'} className='ml-4' />
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className='w-full'>
                        <InputLabel id="discount-multiple-checkbox-label">Discount</InputLabel>
                        <Select
                            labelId="discount-multiple-checkbox-label"
                            id="discount-multiple-checkbox"
                            multiple
                            value={['discount1']}
                            input={<OutlinedInput label="discount" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            <li className='flex items-center pt-[6px] w-fill pl-[7px] pr-[16px]'>
                                <Checkbox />
                                <input type="text" onKeyDown={(e) => e.stopPropagation()} placeholder='Search Sub Categories' className='w-full' />
                                <button type='button' className='h-[25px] w-[25px]'><IoMdCloseCircleOutline className='w-full h-full' /></button>
                            </li>
                            <MenuItem key='discount1' value='discount1'>
                                <Checkbox className='p-0' />
                                <ListItemText primary={'discount1'} className='ml-4' />
                            </MenuItem>
                            <MenuItem key='discount2' value='discount2'>
                                <Checkbox className='p-0' />
                                <ListItemText primary={'discount2'} className='ml-4' />
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <div className='ml-auto flex items-center pl-8'>
                        <button className='bg-[#b81410] w-[100px] pl-[5px] pr-[5px] h-[35px] rounded-[5px] text-[14px] text-[#FFFFFF] shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>
                            CLEAR ALL
                        </button>
                    </div>
                </div>}
        </div>
    )
}

export default Filters