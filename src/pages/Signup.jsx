import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validatePassword } from '../utils/passwordValidation';
import styles from '../style';
import SocialLogin from '../components/SocialLogin';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { isValid, errors } = validatePassword(formData.password);
    if (!isValid) {
      setPasswordErrors(errors);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      setError('');
      setPasswordErrors([]);
      setLoading(true);
      await signup(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      const { errors } = validatePassword(e.target.value);
      setPasswordErrors(errors);
    }
  };

  return (
    <div className={`${styles.paddingX} ${styles.flexCenter} min-h-screen bg-primary`}>
      <div className="w-full max-w-md p-8 bg-black-gradient rounded-xl shadow-lg">
        <h2 className="text-4xl font-semibold text-white text-center mb-8">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-white text-sm font-medium block mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-dimWhite text-black placeholder-gray-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-white text-sm font-medium block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-dimWhite text-black placeholder-gray-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white text-sm font-medium block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-dimWhite text-black placeholder-gray-500"
              placeholder="Create a password"
              required
            />
            {passwordErrors.length > 0 && (
              <ul className="mt-2 text-yellow-400 text-sm">
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-white text-sm font-medium block mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-dimWhite text-black placeholder-gray-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || passwordErrors.length > 0}
            className="w-full bg-green-gradient text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <SocialLogin />
        
        <p className="mt-4 text-center text-dimWhite">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup; 