import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { close, menu } from "../assets";
import Button from "./SignUp";
import LoginButton from "./Login";
import UserMenu from "./UserMenu";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingBag, FiChevronDown } from 'react-icons/fi';
import { navItems } from '../constants/navItems';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user } = useAuth();
  const { getCartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on an auth page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const handleNavigation = (subItem, itemType) => {
    // Close dropdowns
    setActiveDropdown(null);
    setToggle(false);

    // Navigate to products page with filter
    navigate(`/products?${itemType}=${subItem.id}`);
  };

  return (
    <nav className="w-full bg-primary relative z-50">
      <div className="container mx-auto px-4">
        {/* Top Navigation */}
        <div className="flex py-4 justify-between items-center">
          <Link to="/" className="font-poppins font-normal text-white text-[28px] hover:text-secondary transition-colors">
            Wag and Tails
          </Link>

          <div className="sm:flex hidden items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-white hover:text-secondary transition-colors"
                >
                  <FiShoppingBag size={24} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-gradient text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                      {getCartCount()}
                    </span>
                  )}
                </button>
                <UserMenu styles="mr-10 z-[5]" />
              </div>
            ) : (
              <>
                <LoginButton styles="mr-2" />
                <Button styles="mr-10 z-[5]" />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </div>

        {/* Dropdown Navigation - Hidden on auth pages */}
        {!isAuthPage && (
          <div className="hidden sm:block border-t border-white/10">
            <ul className="flex">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-3 text-white hover:text-secondary transition-colors ${
                      activeDropdown === item.id ? 'text-secondary' : ''
                    }`}
                  >
                    {item.title}
                    <FiChevronDown className={`transition-transform ${
                      activeDropdown === item.id ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute left-0 top-full min-w-[200px] bg-black-gradient shadow-lg rounded-lg overflow-hidden transition-all duration-300 z-50 ${
                    activeDropdown === item.id
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <ul className="py-2">
                      {item.items.map((subItem) => (
                        <li key={subItem.id}>
                          <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 transition-colors"
                            onClick={() => handleNavigation(subItem, item.id)}
                          >
                            <span className="text-xl">{subItem.icon}</span>
                            <span>{subItem.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {!isAuthPage && (
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar sm:hidden z-50`}
        >
          <ul className="list-none flex flex-col justify-end items-start gap-4">
            {navItems.map((item) => (
              <li key={item.id} className="w-full">
                <button
                  className="flex items-center justify-between w-full text-white hover:text-secondary transition-colors"
                  onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                >
                  <span>{item.title}</span>
                  <FiChevronDown className={`transition-transform ${
                    activeDropdown === item.id ? 'rotate-180' : ''
                  }`} />
                </button>
                {activeDropdown === item.id && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {item.items.map((subItem) => (
                      <li key={subItem.id}>
                        <button
                          className="flex items-center gap-2 text-white hover:text-secondary transition-colors"
                          onClick={() => handleNavigation(subItem, item.id)}
                        >
                          <span className="text-xl">{subItem.icon}</span>
                          <span>{subItem.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {user ? (
              <>
                <li className="w-full">
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="flex items-center gap-2 text-white hover:text-secondary transition-colors"
                  >
                    <FiShoppingBag size={20} />
                    Cart ({getCartCount()})
                  </button>
                </li>
                <li className="w-full">
                  <UserMenu />
                </li>
              </>
            ) : (
              <>
                <li className="w-full"><LoginButton /></li>
                <li className="w-full mt-2"><Button /></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
