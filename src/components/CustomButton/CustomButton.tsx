import './CustomButton.css'

interface CustomButtonProps {
    text: string;
    className: string;
}

function CustomButton({ text, className }: CustomButtonProps) {
    return (
        <button className={`custom-button ${className}`}>{text}</button>
    )
} 

export default CustomButton