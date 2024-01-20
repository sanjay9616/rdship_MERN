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
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

type SubcategoriesFormInputs = {// brand, price, rating, discount
    subCategories: Array<string>,
    brands: Array<string>,
    sellingPrice: any,
    rating: any,
    discountPercent: any,
};

const priceList: Array<any> = [
    { view: '₹901 - ₹1000', value: 1000 },
    { view: '₹801 - ₹900', value: 900 },
    { view: '₹701 - ₹800', value: 800 },
    { view: '₹601 - ₹700', value: 700 },
    { view: '₹501 - ₹600', value: 600 },
    { view: '₹401 - ₹500', value: 500 },
    { view: '₹301 - ₹400', value: 400 },
    { view: '₹201 - ₹300', value: 300 },
    { view: '₹101 - ₹200', value: 200 },
    { view: '₹1 - ₹100', value: 100 },
];

const ratingList: Array<any> = [
    { view: 5, value: 5 },
    { view: 4, value: 4 },
    { view: 3, value: 3 },
    { view: 2, value: 2 },
    { view: 1, value: 1 },
];

const discountPercent: Array<any> = [
    { view: '70% or more', value: 70 },
    { view: '60% or more', value: 60 },
    { view: '50% or more', value: 50 },
    { view: '40% or more', value: 40 },
    { view: '30% or more', value: 30 },
    { view: '20% or more', value: 20 },
    { view: '10% or more', value: 10 },
    { view: '0% or more', value: 0 },
];

const Filters = (props: any) => {
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<SubcategoriesFormInputs>();
    const [isActiveFilter, setIsActiveFilter] = useState<boolean>(true);

    const subCategoryList: Array<string> = props.subCategories;
    const [subCategoriesControlValue, setSubCategoriesControlValue] = useState<string[]>([]);
    const [subcategoryFilterCtrl, setSubcategoryFilterCtrl] = useState<string>('');
    const [subCategoryListOptions, setSubCategoryListOptions] = useState<string[]>(subCategoryList);
    const [subcategoryAllChecked, setSubcategoryAllChecked] = useState<boolean>(false);

    const brandList: Array<string> = props.brands;
    const [brandsControlValue, setBrandsControlValue] = useState<string[]>([]);
    const [brandFilterCtrl, setBrandFilterCtrl] = useState<string>('');
    const [brandListOptions, setBrandListOptions] = useState<string[]>(subCategoryList);
    const [brandAllChecked, setBrandAllChecked] = useState<boolean>(false);

    const [priceControlValue, setPriceControlValue] = useState('');
    const [ratingControlValue, setRatingControlValue] = useState('');
    const [discountControlValue, setDiscountControlValue] = useState('');

    const openCloseFilters = () => {
        setIsActiveFilter(!isActiveFilter);
    }

    useEffect(() => {
        setValue('subCategories', [], { shouldValidate: true });
    }, [subCategoriesControlValue]);

    useEffect(() => {
        setValue('brands', [], { shouldValidate: true });
    }, [brandsControlValue]);

    const clearAll = () => {
        // props.parentCallback('clearAll');
        // setValue('subCategories', [], { shouldValidate: true });
        Promise.resolve()
            .then(() => {
                setSubCategoriesControlValue([])
                setBrandsControlValue([])
                setPriceControlValue('')
                setRatingControlValue('')
                setDiscountControlValue('')
                setValue('sellingPrice', '', { shouldValidate: true });
                setValue('rating', '', { shouldValidate: true });
                setValue('discountPercent', '', { shouldValidate: true });
            })
            .then(() => applyAll())
}

const applyAll = () => {
    props.parentCallback(watch());
}


const filterSubcategoryListOptions = (event?: any) => {
    setSubcategoryFilterCtrl(event?.target?.value?.toLocaleLowerCase());
    let subcategory: any = subCategoryList.filter((subcategory: string) => subcategory.toLocaleLowerCase().trim().includes(event?.target?.value?.toLocaleLowerCase()?.trim() || ''))
    setSubCategoryListOptions(subcategory);
}

const handleSubcategoryChange = (event: any) => {
    const { target: { value } } = event;
    if (!value.includes(undefined)) setSubCategoriesControlValue(typeof value === 'string' ? value.split(',') : value);
}

const handleOpenCloseSubcategoryDropdown = (event: any) => {
    setSubcategoryFilterCtrl('');
    filterSubcategoryListOptions();
}

useEffect(() => {
    setSubcategoryAllChecked(JSON.stringify(subCategoryList.sort()) == JSON.stringify(subCategoriesControlValue.sort()));
}, [subCategoriesControlValue]);

const clearSubcategoryFilterCtrl = () => {
    setSubcategoryFilterCtrl('');
    filterSubcategoryListOptions();
}

const handleSelectAllSubcategories = (event: any) => {
    setSubcategoryAllChecked(event.target.checked);
    setSubCategoriesControlValue(event.target.checked ? subCategoryList : []);
}

const filterBrandListOptions = (event?: any) => {
    setBrandFilterCtrl(event?.target?.value?.toLocaleLowerCase());
    let brand: any = brandList.filter((brand: string) => brand.toLocaleLowerCase().trim().includes(event?.target?.value?.toLocaleLowerCase()?.trim() || ''))
    setBrandListOptions(brand);
}

const handleBrandChange = (event: any) => {
    const { target: { value } } = event;
    if (!value.includes(undefined)) setBrandsControlValue(typeof value === 'string' ? value.split(',') : value);
}

const handleOpenCloseBrandDropdown = (event: any) => {
    setBrandFilterCtrl('');
    filterBrandListOptions();
}

useEffect(() => {
    setBrandAllChecked(JSON.stringify(brandList.sort()) == JSON.stringify(brandsControlValue.sort()));
}, [brandsControlValue]);

const clearBrandFilterCtrl = () => {
    setBrandFilterCtrl('');
    filterBrandListOptions();
}

const handleSelectAllBrands = (event: any) => {
    setBrandAllChecked(event.target.checked);
    setBrandsControlValue(event.target.checked ? brandList : []);
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
            <form className='flex items-center gap-2 bg-white mt-2 mr-2 ml-2 p-2 rounded-[5px] shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>
                <FormControl className='w-full'>
                    <InputLabel>Sub Categories</InputLabel>
                    <Select multiple input={<OutlinedInput label="Sub Categories" />}
                        value={subCategoriesControlValue}
                        {...register('subCategories')}
                        onChange={handleSubcategoryChange}
                        renderValue={(selected) => selected.join(', ')}
                        onOpen={handleOpenCloseSubcategoryDropdown}
                        onClose={handleOpenCloseSubcategoryDropdown}>
                        <li className='flex items-center pt-[0px] w-fill pl-[7px] pr-[16px] border border-[red]'>
                            <Checkbox onChange={handleSelectAllSubcategories} checked={subcategoryAllChecked} />
                            <input type="text" onChange={filterSubcategoryListOptions} onKeyDown={(e) => e.stopPropagation()} value={subcategoryFilterCtrl || ''} placeholder='Search Sub Categories' className='w-full' />
                            {subcategoryFilterCtrl &&
                                <button type='button' onClick={clearSubcategoryFilterCtrl} className='h-[25px] w-[25px]'><IoMdCloseCircleOutline className='w-full h-full' /></button>
                            }
                        </li>
                        {subCategoryListOptions.map((subcategory: any) => {
                            return (
                                <MenuItem key={subcategory} value={subcategory}>
                                    <Checkbox checked={subCategoriesControlValue.includes(subcategory)} className='p-0' />
                                    <ListItemText primary={subcategory} className='ml-4' />
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl className='w-full'>
                    <InputLabel>Brands</InputLabel>
                    <Select multiple input={<OutlinedInput label="Brands" />}
                        value={brandsControlValue}
                        {...register('brands')}
                        onChange={handleBrandChange}
                        renderValue={(selected) => selected.join(', ')}
                        onOpen={handleOpenCloseBrandDropdown}
                        onClose={handleOpenCloseBrandDropdown}>
                        <li className='flex items-center pt-[0px] w-fill pl-[7px] pr-[16px] border border-[red]'>
                            <Checkbox onChange={handleSelectAllBrands} checked={brandAllChecked} />
                            <input type="text" onChange={filterBrandListOptions} onKeyDown={(e) => e.stopPropagation()} value={brandFilterCtrl || ''} placeholder='Search Brands' className='w-full' />
                            {brandFilterCtrl &&
                                <button type='button' onClick={clearBrandFilterCtrl} className='h-[25px] w-[25px]'><IoMdCloseCircleOutline className='w-full h-full' /></button>
                            }
                        </li>
                        {brandListOptions.map((brand: any) => {
                            return (
                                <MenuItem key={brand} value={brand}>
                                    <Checkbox checked={brandsControlValue.includes(brand)} className='p-0' />
                                    <ListItemText primary={brand} className='ml-4' />
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl className='w-full'>
                    <InputLabel>Price</InputLabel>
                    <Select input={<OutlinedInput label="Price" />}
                        {...register('sellingPrice')}
                        value={priceControlValue}
                        defaultValue={''}
                        onChange={(event) => {setPriceControlValue(event.target.value)}}
                    >
                        {priceList.map((price: any) => {
                            return (
                                <MenuItem key={price.view} value={price.value}>
                                    <ListItemText primary={price.view} className='ml-4' />
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl className='w-full'>
                    <InputLabel>Rating</InputLabel>
                    <Select input={<OutlinedInput label="Rating" />}
                        {...register('rating')}
                        value={ratingControlValue}
                        defaultValue={''}
                        onChange={(event) => {setRatingControlValue(event.target.value)}}
                    >
                        {ratingList.map((price: any) => {
                            return (
                                <MenuItem key={price.view} value={price.value}>
                                    <ListItemText primary={price.view} className='ml-4' />
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl className='w-full'>
                    <InputLabel>Discount</InputLabel>
                    <Select input={<OutlinedInput label="Discount" />}
                        {...register('discountPercent')}
                        value={discountControlValue}
                        defaultValue={''}
                        onChange={(event) => {setDiscountControlValue(event.target.value)}}
                    >
                        {discountPercent.map((price: any) => {
                            return (
                                <MenuItem key={price.view} value={price.value}>
                                    <ListItemText primary={price.view} className='ml-4' />
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <div className='ml-auto flex items-center pl-8'>
                    <Button onClick={() => { clearAll() }} className='bg-[#b81410] hover:bg-[#b81410] w-[100px] pl-[5px] pr-[5px] h-[35px] rounded-[5px] text-[14px] text-[#FFFFFF] hover:text-[#FFFFFF] shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>
                        CLEAR ALL
                    </Button>
                    <Button onClick={() => { applyAll() }} className='ml-2 bg-[#b81410] hover:bg-[#b81410] w-[100px] pl-[5px] pr-[5px] h-[35px] rounded-[5px] text-[14px] text-[#FFFFFF] hover:text-[#FFFFFF] shadow-[0_3px_6px_rgb(0_0_0_/_16%)]'>
                        APPLY ALL
                    </Button>
                </div>
            </form>}
    </div>
)
}

export default Filters