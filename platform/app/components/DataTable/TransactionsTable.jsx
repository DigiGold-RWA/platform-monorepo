import React from "react";
import EmptyState from "../EmptyState";

const TransactionsTable = ({ transactions }) => {
    const TransactionStatus = ({ status }) => {
        switch (status) {
            case "pending":
                return (
                    <p className="border-[0.5px] border-[#FFCC29] rounded-2xl px-2 py-1 text-[#FFCC29] text-xs inline-block">
                        <span className="h-2 w-2 rounded-full  bg-[#FFCC29] inline-block mr-2"></span>
                        In Progress
                    </p>
                );
            case "completed":
                return (
                    <p className="border-[0.5px] border-[#8BFFC9] rounded-2xl px-2 py-1 text-[#8BFFC9] text-xs inline-block">
                        <span className="h-2 w-2 rounded-full  bg-[#8BFFC9] inline-block mr-2"></span>
                        Completed
                    </p>
                );
            default:
                return <span>--</span>;
        }
    };
    return (
        <div>
            {transactions.length < 1 ? (
                <EmptyState title={"No transaction yet"} />
            ) : (
                <>
                    <div className="overflow-x-auto md:overflow-x-auto ">
                        <table className="min-w-full leading-normal table-auto overflow-x-auto relative order-table">
                            <thead className="bg-neutral50 font-normal">
                                <tr className="text-white">
                                    <th
                                        scope="col"
                                        className="px-5 py-3  border-b border-[#363636]   text-left text-sm   whitespace-nowrap"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3  border-b border-[#363636]   text-left text-sm   whitespace-nowrap"
                                    >
                                        Type
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-5 py-3 border-b border-[#363636]   text-left text-sm   whitespace-nowrap"
                                    >
                                        Wallet
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-5 py-3 border-b border-[#363636]  text-left text-sm   whitespace-nowrap"
                                    >
                                        Coin
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-5 py-3 border-b border-[#363636]  text-left text-sm whitespace-nowrap"
                                    >
                                        Amount
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 border-b border-[#363636]  text-left text-sm whitespace-nowrap"
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#363636]">
                                {transactions?.map((transaction, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <p className="text-[#B4B1B1] font-normal">
                                                {transaction.createdAt}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <p className="text-sm text-[#B4B1B1] font-normal">
                                                {transaction.type}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <p className="text-sm text-[#B4B1B1] font-normal">
                                                {transaction.wallet_type}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <p className="text-sm text-[#B4B1B1] font-normal">
                                                {transaction.currency}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <p className="text-sm text-[#B4B1B1] font-normal">
                                                {transaction.amount}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <TransactionStatus
                                                status={transaction.status}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default TransactionsTable;
