import { redirect } from 'next/navigation';
import React from 'react'
import { validateRequest } from './auth-actions';

export default async function layout({ children }: { children: React.ReactNode }) {
    const { user } = await validateRequest();

    if (user) redirect('/')
    return (
        <div className='h-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500'>
            {children}
        </div>
    )
}
