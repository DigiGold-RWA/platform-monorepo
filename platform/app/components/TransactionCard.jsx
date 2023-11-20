import Image from 'next/image';
import React from 'react';

const truncateActivity = (activity) => {
  if (activity) return `${activity.slice(0, 12)}...`;
};

const TransactionCard = ({ trans, index }) => {
  const statusTypes = {
    success: 0,
    rejected: 1,
    cancelled: 2,
  };
  const TransactionStatus = ({ status }) => {
    switch (status) {
      case statusTypes.success:
        return (
          <p className="border-[0.5px] border-[#8BFFC9] rounded-2xl px-2 py-1 text-[#8BFFC9] text-xs inline-block">
            Success
          </p>
        );
      case statusTypes.rejected:
        return (
          <p className="border-[0.5px] border-[#940e04] rounded-2xl px-2 py-1 text-[#c73a30] text-xs inline-block">
            Rejected
          </p>
        );
      case statusTypes.cancelled:
        return (
          <p className="border-[0.5px] border-[#940e04] rounded-2xl px-2 py-1 text-[#c73a30] text-xs inline-block">
            Canceled
          </p>
        );

      default:
        return <span>--</span>;
    }
  };
  return (
    <>
      <button className="px-4 py-3 rounded-lg  bg-card-background text-white flex items-start justify-start gap-3 flex-row text-left w-full">
        <div className="mb-2">
          <Image
            src="/Logo/logo_main.svg"
            alt="logo"
            width={30}
            height={30}
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between w-full">
            <div className="space-y-1">
              <h2 className="card-title text-sm">
                {trans.expense_type == 0 ? 'Expenses' : 'Top Up'}
              </h2>
              <p className="text-xl">{trans.activity}</p>
              {/* <p className="text-xl">{truncateActivity(trans.activity)}</p> */}
              <p className="text-xs text-[#C0C0C0]">
                {trans.date} {trans.time}
              </p>
            </div>

            <div className="space-y-1 flex items-end justify-end flex-col">
              <h2 className="card-title sm:text-lg md:text-2xl lg:text-2xl flex items-center gap-2">
                {trans.expense_type == 0 ? '-' : '+'} {trans.amount}{' '}
                <span className=" text-white text-xs">USD</span>
              </h2>
              <TransactionStatus status={trans.status} />
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

export default TransactionCard;
