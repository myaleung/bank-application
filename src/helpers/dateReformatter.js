
const transactionDate = (date) => { 
    const newDate = date !== undefined ? new Date(date) : new Date();
    const tMonth = String(newDate.getMonth() + 1).padStart(2, '0');
    const tDate = newDate.getDate() + "/" + tMonth + "/" + newDate.getFullYear();
    return tDate;
}

export default transactionDate;