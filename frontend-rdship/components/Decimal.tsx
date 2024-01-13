import React from 'react'

const Decimal = (props: any) => {
    const transform = (value: number, decimalDigits ?: number) => {
        if (value) {
            const numStr: String = new String(value);
            const decimalIndex: number = numStr.lastIndexOf('.');
            if (decimalIndex !== -1) {
                if ((numStr.length - 1) >= (decimalIndex + (decimalDigits || 0) + 1)) {
                    try {
                        const formattedDecimalsValue: string = numStr.substring(0, (decimalIndex + (decimalDigits || 0) + 1));
                        return Number(formattedDecimalsValue);
                    }
                    catch (error) {
                        return value;
                    }
                }
            }
            return Number(numStr);
        }
        return 0;
    }
    return (
        <>{transform(props.value, props?.decimalDigits)}</>
    )
}

export default Decimal