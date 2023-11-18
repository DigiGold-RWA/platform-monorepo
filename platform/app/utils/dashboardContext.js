'use client';
import React, { createContext, useState } from 'react';

const DashboardMenuContext = createContext(undefined);

const DashboardMenuProvider = ({ children }) => {
    const [showDashMenu, setShowDashMenu] = useState(false);
  
    const toggleDashMenu = () => {
      setShowDashMenu((prev) => !prev);
    };
  
    return (
      <DashboardMenuContext.Provider value={{ toggleDashMenu, showDashMenu }}>
        {children}
      </DashboardMenuContext.Provider>
    );
  };
  

  export {
    DashboardMenuContext,
    DashboardMenuProvider,
  };
  