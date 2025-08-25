import { toast } from 'sonner'

export interface ToastProps {
  title: string
  description?: string
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'
}

export const useToast = () => {
  const showToast = ({ title, description, variant = 'default' }: ToastProps) => {
    const message = description ? `${title}\n${description}` : title

    switch (variant) {
      case 'destructive':
        return toast.error(message)
      case 'success':
        return toast.success(message)
      case 'warning':
        return toast.warning(message)
      case 'info':
        return toast.info(message)
      default:
        return toast(message)
    }
  }

  return {
    toast: showToast
  }
}