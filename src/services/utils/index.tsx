export const getCurrentDate =  () => {
    const date = new Date();
    const year = date.getFullYear();
    // month is two digits
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    // day is two digits
    const day = date.getDate().toString().padStart(2, '0');
    // return it str format
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
}

// takes start date and add 7 days to it
export const getDefaultEndDate = (startDate:any) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 7);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
}


export const customFormatDate = (dateString: any): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};




