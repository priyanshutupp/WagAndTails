import { useNavigate } from 'react-router-dom';

const Button = ({ styles }) => {
  const navigate = useNavigate();
  
  return (
    <button 
      type="button" 
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-green-gradient rounded-[10px] outline-none ${styles}`}
      onClick={() => navigate('/signup')}
    >
      Get Started
    </button>
  );
};

export default Button;
