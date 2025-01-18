"use client"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"

export const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button size="lg" className="w-full" variant="outline" onClick={() => { }}>
                <FcGoogle className="size-5 mr-2"/> Login with google 
            </Button>
        </div>
    )
}