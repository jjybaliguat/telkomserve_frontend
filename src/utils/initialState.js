const today = new Date()
export const initialState = {
    items: [
        {
        description: `Internet bill for the month of ${today.toLocaleString('default', { month: 'long' })}`, 
        price: '', 
        discount: '',
    },
    ],
    total: 0,
    rates: '',
    vat: 0,
    invoiceNumber: Math.floor(Math.random() * 100000),
    status: '',
    creator: '',
}
