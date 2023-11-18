// export const Downloads = [
//     {
//         id: 1,
//         file: {
//             name: "Certificates 232006",
//             url: "/images/certificate1.svg",
//             download_url: "/232006.pdf",
//         },
//         icons: {
//             download: "Download",
//             file: "/images/download.svg",
//         },
//     },
//     {
//         id: 2,
//         file: {
//             name: "Certificates 232014",
//             url: "/images/certificate1.svg",
//             download_url: "/232014.pdf",
//         },
//         icons: {
//             download: "Download",
//             file: "/images/download.svg",
//         },
//     },
//     {
//         id: 3,
//         file: {
//             name: "Certificates 232015",
//             url: "/images/certificate1.svg",
//             download_url: "/232015.pdf",
//         },
//         icons: {
//             download: "Download",
//             file: "/images/download.svg",
//         },
//     },
//     {
//         id: 4,
//         file: {
//             name: "Certificates 232016",
//             url: "/images/certificate1.svg",
//             download_url: "/232016.pdf",
//         },
//         icons: {
//             download: "Download",
//             file: "/images/download.svg",
//         },
//     },
//     {
//         id: 5,
//         file: {
//             name: "Certificates 232017",
//             url: "/images/certificate1.svg",
//             download_url: "/232017.pdf",
//         },
//         icons: {
//             download: "Download",
//             file: "/images/download.svg",
//         },
//     },
//     {
//         id: 6,
//         file: {
//             name: "Certificates 404451",
//             url: "/images/certificate1.svg",
//             download_url: "/404451.pdf",
//         },
//         icons: {
//             download: "Download",
//             file: "/images/download.svg",
//         },
//     },
// ];

export const investmentData = [
    {
        investmenttype: "Tier 1",
        amount: "$1000",
        capital: "$USDC 500",
        apy: "5%",
        earnings: "$50",
        purchasedate: "20 May 2023",
        yielddate: "20 May 2023",
        status: 0, // Use values for status (0 for ongoing, 1 for liquidated, 2 for matured)
    },
    {
        investmenttype: "Tier 2",
        amount: "$1500",
        capital: "$USDC 500",
        apy: "4%",
        earnings: "$60",
        purchasedate: "20 May 2023",
        yielddate: "20 May 2023",
        status: 1, // Use values for status (0 for ongoing, 1 for liquidated, 2 for matured)
    },
    {
        investmenttype: "Tier 3",
        amount: "$800",
        capital: "$USDC 500",
        apy: "6%",
        earnings: "$48",
        purchasedate: "20 May 2023",
        yielddate: "20 May 2023",
        status: 2, // Use values for status (0 for ongoing, 1 for liquidated, 2 for matured)
    },
    {
        investmenttype: "Tier 4",
        amount: "$2000",
        capital: "$USDC 500",
        apy: "3%",
        earnings: "$60",
        purchasedate: "20 May 2023",
        yielddate: "20 May 2023",
        status: 0, // Use values for status (0 for ongoing, 1 for liquidated, 2 for matured)
    },
    {
        investmenttype: "Tier 1",
        amount: "$1200",
        capital: "$USDC 500",
        apy: "4.5%",
        earnings: "$54",
        purchasedate: "20 May 2023",
        yielddate: "20 May 2023",
        status: 1, // Use values for status (0 for ongoing, 1 for liquidated, 2 for matured)
    },
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

export const user = {
    name: 'Udeh Praise',
    account_type: 'individual',
    email: 'mailpraiseudeh@gmail.com',
    dob: '21 July, 2000',
    address: 'Earth',
    fireblock_vault_id: '123456789'
}