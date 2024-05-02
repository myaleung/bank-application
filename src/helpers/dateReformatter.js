
const transactionDate = (date) => { 
    const newDate = date !== undefined ? new Date(date) : new Date();
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const tDate = day + "/" + month + "/" + newDate.getFullYear();
    return tDate;
}

export default transactionDate;