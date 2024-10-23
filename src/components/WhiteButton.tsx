interface WhiteButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset'; // Adjust according to your needs
  className: string;
  onClick?: () => void; // Optional onClick handler
}

const WhiteButton: React.FC<WhiteButtonProps> = ({ text, type, className, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default WhiteButton;
