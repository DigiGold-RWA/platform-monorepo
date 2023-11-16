import React from 'react';

const CardComponent = ({ children }) => {
  return (
    <div className="rounded-lg p-5 h-44  bg-card-background">
      <div className="h-full flex justify-between flex-col">{children}</div>
    </div>
  );
};

export default CardComponent;
