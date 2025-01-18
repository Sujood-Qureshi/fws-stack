"use client"

import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function ClientFetchExample() {
    const { data, isLoading, } = useQuery({
        queryKey: ['sample', 'client'],
        queryFn: async () => {
            const response = await client.api.sample.client.$get();
            const data = await response.json();
            return data.message;
        },
    });

    if (isLoading) {
        return <p className="bg-white/20 px-4 py-2 rounded-md">
            loading...
        </p>
    }
    return (
        <p className="bg-white/20 px-4 py-2 rounded-md">
            {data}
        </p>
    )
}
