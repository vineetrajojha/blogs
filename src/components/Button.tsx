import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const variantClass = variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
  return <button {...props} className={`btn ${variantClass} ${className}`.trim()} />
}


