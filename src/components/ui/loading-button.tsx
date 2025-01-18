import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { FiLoader } from "react-icons/fi";


interface LoadingButtonProps extends ButtonProps {
    loading: boolean
}

export default function LoadingButton({
    loading,
    disabled,
    className,
    ...props
}: LoadingButtonProps) {
    return <Button
        disabled={loading || disabled}
        className={cn("flex items-center gap-2", className)}
        {...props}
    >
        {loading && <FiLoader className='size-5 animate-spin mr-2'/>}
        {props.children}
    </Button>
}