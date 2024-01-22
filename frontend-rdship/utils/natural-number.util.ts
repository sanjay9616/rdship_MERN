let previousValue: any;
export const naturalNumber = (event: any) => {
    let value = event.target.value;
    const pattern = new RegExp(/^[1-9]\d*$/);
    if(value == '') return ''
    if(value == 'undefined' || value == null) return 1;
    if(pattern.test(value)) {
        previousValue = value;
        return value;
    } else if(!pattern.test(value)) { // copy paste
        let replace = '';
        for (let i = 0; i < value.length; i++) {
            if(pattern.test(value[i])) {
                replace += value[i]
            }
        }
        previousValue = replace;
    }
    return previousValue;
}