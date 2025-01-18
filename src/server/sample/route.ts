import { Hono } from "hono";

function fetchClientData(): Promise<{ message: string }> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate server response
            resolve({ message: "This is client side data fetching" });
        }, 1000); // Delay of 1 second
    });
}

export const sampleController = new Hono()
    .get('/server', async (c) => {
        return c.json({ message: "This is server side data fetching" });
    })
    .get('/client', async (c) => {
        const data = await fetchClientData();
        return c.json(data);
    })