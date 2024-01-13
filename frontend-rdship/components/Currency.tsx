import React from 'react'

const Currency = (props: any) => {
    const transform = (value: number, decimalDigits?: number) => {
        if (value) {
            const numStr: String = new String(value);
            const decimalIndex: number = numStr.lastIndexOf('.');
            if (decimalIndex !== -1) {
                if ((numStr.length - 1) >= decimalIndex + (decimalDigits || 0 + 1)) {
                    try {
                        const formattedDecimalsValue: string = numStr.substring(0, (decimalIndex + (decimalDigits || 0) + 1));
                        return '₹' + parseFloat(formattedDecimalsValue).toLocaleString('en-IN');
                    }
                    catch (error) {
                        return '₹' + value;
                    }
                }
            }
            return '₹' + parseFloat(numStr.toString()).toLocaleString('en-IN');
        }
        return '₹' + '0';
    }
    return (
        <>{transform(props.value, props?.decimalDigits)}</>
    )
}

export default Currency