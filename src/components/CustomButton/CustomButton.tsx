import './CustomButton.css'

interface CustomButtonProps {
    children: React.ReactNode;
    className: string;
    onclickAction: any;
}

function CustomButton({ children, className, onclickAction }: CustomButtonProps) {
    return (
        <button onClick={() => onclickAction()} className={`custom-button ${className}`}>{children}</button>
    )
} 

export default CustomButton