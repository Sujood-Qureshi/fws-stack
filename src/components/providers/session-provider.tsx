"use client"

import { UserType } from "@/types/user.type";
import { Session } from "@prisma/client";
import React, { createContext, useContext, type ReactNode } from "react";

// Define the type for the context value
interface SessionContextValue {
    user: UserType | null; // User can be null
    session: Session | null; // Session can be null
}

// Create the context with a default value of null
const SessionContext = createContext<SessionContextValue | undefined>(undefined);

interface SessionProviderProps {
    children: ReactNode;
    value: SessionContextValue;
}

// SessionProvider component
export default function SessionProvider({
    children,
    value
}: SessionProviderProps) {
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
}

// Custom hook to use the session context
export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}