import { useNavigate } from 'react-router-dom';

const LoginButton = ({ styles }) => {
  const navigate = useNavigate();
  
  return (
    <button 
      type="button" 
      className={`py-2 px-4 font-poppins font-medium text-[16px] text-white border-2 border-white hover:bg-dimWhite hover:text-primary rounded-[10px] outline-none transition-colors ${styles}`}
      onClick={() => navigate('/login')}
    >
      Login
    </button>
  );
};

export default LoginButton; 