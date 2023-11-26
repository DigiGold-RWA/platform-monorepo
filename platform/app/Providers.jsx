"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { MenuProvider } from "./utils/context";
import { DashboardMenuProvider } from "./utils/dashboardContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export function Providers({ children }) {
    return (
        <UserProvider>
            <CacheProvider>
                <MenuProvider>
                    <DashboardMenuProvider>
                        <ChakraProvider theme={theme}>
                            {children}
                        </ChakraProvider>
                    </DashboardMenuProvider>
                </MenuProvider>
            </CacheProvider>
        </UserProvider>
    );
}
