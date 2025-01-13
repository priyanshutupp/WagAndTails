import { useNavigate } from 'react-router-dom';

const Button = ({ styles }) => {
  const navigate = useNavigate();
  
  return (
    <button 
      type="button" 
      className={`py-2 px-4 font-poppins font-medium text-[16px] text-primary bg-green-gradient rounded-[10px] outline-none ${styles}`}
      onClick={() => navigate('/signup')}
    >
      Sign Up
    </button>
  );
};

export default Button;
