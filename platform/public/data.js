
// export const transacData = [
//     {
//         expense_type: 1, // Use values for expense_type (0 for expense, 1 for top up
//         amount: "20.50",
//         activity: "Netflix Subscription",
//         date: "11-02-2023",
//         time: "4:50am",
//         status: 0, // Use values for status (0 for success, 1 for cancelled, 2 for reject)
//     },
// ]
    
export const transacData = [
    // {
    //   expense_type: 1,
    //   amount: "20.50",
    //   activity: "Netflix Subscription",
    //   date: "11-02-2023",
    //   time: "4:50am",
    //   status: 0,
    // },
    // {
    //   expense_type: 0,
    //   amount: "15.00",
    //   activity: "Grocery Shopping",
    //   date: "11-02-2023",
    //   time: "2:30pm",
    //   status: 0,
    // },
    // {
    //   expense_type: 1,
    //   amount: "10.99",
    //   activity: "App Store Purchase",
    //   date: "11-03-2023",
    //   time: "10:15am",
    //   status: 1,
    // },
    // {
    //   expense_type: 0,
    //   amount: "50.75",
    //   activity: "Dinner at Restaurant",
    //   date: "11-04-2023",
    //   time: "7:00pm",
    //   status: 0,
    // },
    // {
    //   expense_type: 1,
    //   amount: "5.00",
    //   activity: "Mobile Top-up",
    //   date: "11-05-2023",
    //   time: "12:45pm",
    //   status: 2,
    // },
    // {
    //   expense_type: 0,
    //   amount: "30.20",
    //   activity: "Online Shopping",
    //   date: "11-06-2023",
    //   time: "3:20pm",
    //   status: 0,
    // },
    // {
    //   expense_type: 1,
    //   amount: "8.99",
    //   activity: "Digital Movie Rental",
    //   date: "11-07-2023",
    //   time: "6:30pm",
    //   status: 0,
    // }
  ];
  

export const transactionHistory = [
    {
        createdAt: "20 May 2023",
        type: "Deposit",
        wallet_type: "Fund",
        currency: "$DCask",
        amount: "$500",
        status: 'pending', // Use values (0 for in progress, 1 for completed)
    },
    {
        createdAt: "21 May 2023",
        type: "Withdrawal",
        wallet_type: "Cash",
        currency: "$USDC",
        amount: "$300",
        status: "completed", // Use values (0 for in progress, 1 for completed)
    },
    {
        createdAt: "22 May 2023",
        type: "Deposit",
        wallet_type: "Fund",
        currency: "$AED",
        amount: "$700",
        status: "completed", // Use values (0 for in progress, 1 for completed)
    },
    {
        createdAt: "23 May 2023",
        type: "Withdrawal",
        wallet_type: "Cash",
        currency: "$USDC",
        amount: "$400",
        status: "pending", // Use values (0 for in progress, 1 for completed)
    },
    {
        createdAt: "24 May 2023",
        type: "Deposit",
        wallet_type: "Fund",
        currency: "$DCask",
        amount: "$600",
        status: "completed", // Use values (0 for in progress, 1 for completed)
    },
];

export const cardWithdrawalData = [
    
];
export const cardRechargeData = [
    
];

export const user = {
    name: 'Udeh Praise',
    account_type: 'individual',
    email: 'mailpraiseudeh@gmail.com',
    dob: '21 July, 2000',
    address: 'Earth',
    fireblock_vault_id: '123456789'
}