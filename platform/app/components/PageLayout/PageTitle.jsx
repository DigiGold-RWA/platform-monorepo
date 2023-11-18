import React from 'react';

export const PageTitle = ({ title, submenu }) => {
  return (
    <>
      {!submenu ? (
        <>
          <div className="lg:py-4 py-2 text-white">
            <h1 className="text-2xl font-medium title">{title}</h1>
          </div>
        </>
      ) : (
        <div className="lg:py-4 py-2">
          <div className='flex items-center justify-start gap-3'>
            <h1 className="text-xl font-normal title text-white">{title}</h1>
                <span >&gt;</span>
            <h1 className="text-2xl font-medium title">{submenu}</h1>
          </div>
        </div>
      )}
    </>
  );
};
