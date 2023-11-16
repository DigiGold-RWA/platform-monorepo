import React from "react";
import EmptyState from "../EmptyState";
import { LockIcon, MoreVertIcon, UnlockIcon } from "../IconComponent";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from "@chakra-ui/react";

const InvestmentsTable = ({ investments }) => {
    const statusTypes = {
        ongoing: 0,
        liquidated: 1,
        matured: 2,
    };

    const InvestmentStatus = ({ status }) => {
        switch (status) {
            case statusTypes.ongoing:
                return (
                    <span className="border-[0.5px] border-[#1DA1F2] rounded-2xl px-4 py-1 bg-[#E4F6FF] text-[#1DA1F2] text-xs">
                        Ongoing
                    </span>
                );
            case statusTypes.liquidated:
                return (
                    <span className="border-[0.5px] border-[#C39606] rounded-2xl px-4 py-1 bg-[#FFF8E0] text-[#C39606] text-xs">
                        Liquidated
                    </span>
                );
            case statusTypes.matured:
                return (
                    <span className="border-[0.5px] border-[#01974F] rounded-2xl px-4 py-1 bg-[#ECFDF3] text-[#01974F] text-xs">
                        Matured
                    </span>
                );
            default:
                return <span>--</span>;
        }
    };

    return (
        <div>
            {investments.length < 1 ? (
                <EmptyState title={"No investments yet"} />
            ) : (
                <>
                    <div className="overflow-x-auto md:overflow-x-auto min-h-[400px]">
                        <table className="min-w-full  leading-normal table-auto overflow-x-auto relative order-table bg-white">
                            <thead className="font-normal">
                                <tr className="text-[#4F4F4F]">
                                    <th
                                        scope="col"
                                        className="px-5 py-3  border-b border-gray-200   text-left text-sm   whitespace-nowrap"
                                    >
                                        Investment Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3  border-b border-gray-200   text-left text-sm   whitespace-nowrap"
                                    >
                                        Amount
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-5 py-3 border-b border-gray-200  text-left text-sm  whitespace-nowrap"
                                    >
                                        APY
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-5 py-3 border-b border-gray-200  text-left text-sm   whitespace-nowrap"
                                    >
                                        Earnings
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 border-b border-gray-200  text-left text-sm   whitespace-nowrap"
                                    >
                                        Purchase Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 border-b border-gray-200  text-left text-sm   whitespace-nowrap"
                                    >
                                        Maturity Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 border-b border-gray-200  text-left text-sm   whitespace-nowrap"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 border-b border-gray-200  text-left text-sm   whitespace-nowrap"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {investments?.map((investment, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <p className="text-[#4F4F4F] font-normal">
                                                {investment.plan?.name}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <p className="text-sm text-[#4F4F4F] font-normal">
                                                {investment.investment_amount} USDC
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <p className="text-sm text-[#4F4F4F] font-normal">
                                                {investment.plan?.apy}%
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <p className="text-sm text-[#4F4F4F] font-normal">
                                                {investment.interest_earned} USDC
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <p className="text-sm text-[#4F4F4F] font-normal">
                                                {investment.createdAt}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 whitespace-nowrap">
                                            <p className="text-sm text-[#4F4F4F] font-normal">
                                                {investment.maturity_date}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <InvestmentStatus status={0} />
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <Menu size="sm">
                                                <MenuButton
                                                    as={IconButton}
                                                    aria-label="Options"
                                                    icon={<MoreVertIcon />}
                                                ></MenuButton>
                                                <MenuList className="px-4 py-4 space-y-3 text-center rounded-2xl">
                                                    {/* <MenuItem> */}
                                                    {false ? (
                                                        <MenuItem className="text-white bg-[#008080] px-5 py-2 rounded-full font-medium text-center items-center ">
                                                            {/* <UnlockIcon /> */}
                                                            <span className="w-full text-center">
                                                                Withdraw
                                                            </span>
                                                        </MenuItem>
                                                    ) : (
                                                        <MenuItem
                                                            className="text-white bg-[#008080] px-5 py-2 rounded-full font-medium text-center items-center gap-1 opacity-30 cursor-not-allowed "
                                                            disabled
                                                        >
                                                            {/* <LockIcon /> */}
                                                            <span className="w-full text-center">
                                                                Withdraw
                                                            </span>
                                                        </MenuItem>
                                                    )}
                                                    {/* </MenuItem> */}

                                                    {/* <MenuItem> */}
                                                    {false ? (
                                                        <MenuItem className="text-white bg-[#008080] px-5 py-2 rounded-full font-medium  items-center gap-1 ">
                                                            <span className="w-full text-center">
                                                                Borrow USDC
                                                            </span>
                                                        </MenuItem>
                                                    ) : (
                                                        <MenuItem
                                                            className="text-white bg-[#008080] px-5 py-2 rounded-full font-medium  items-center gap-1 opacity-30 cursor-not-allowed "
                                                            disabled
                                                        >
                                                            <span className="w-full text-center">
                                                                Borrow USDC
                                                            </span>
                                                        </MenuItem>
                                                    )}
                                                    {/* </MenuItem> */}
                                                </MenuList>
                                            </Menu>
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

export default InvestmentsTable;
