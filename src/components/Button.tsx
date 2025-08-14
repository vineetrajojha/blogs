import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  text?: string
}

export function Button({ variant = 'primary', className = '', text, icon, children, ...props }: ButtonProps) {
  // If using the new animated style with icon
  if (icon) {
    return (
      <button {...props} className={`Btn ${className}`.trim()}>
        {text || children}
        {icon}
      </button>
    )
  }
  
  // Fallback to original button style
  const variantClass = variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
  return <button {...props} className={`btn ${variantClass} ${className}`.trim()}>{children}</button>
}


