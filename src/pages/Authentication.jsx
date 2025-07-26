import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Target } from 'lucide-react';

const Authentication = () => {
  const [formType, setFormType] = useState('login');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showSuccessChar, setShowSuccessChar] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ text: '', type: '' });
  const loginFormRef = useRef(null);
  const signupFormRef = useRef(null);
  const navigate = useNavigate();

  // Create twinkling stars
  useEffect(() => {
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star absolute w-1 h-1 bg-white rounded-full animate-twinkle';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
      }
    }
  }, []);

  const showForm = (type) => {
    setFormType(type);
    setMessage({ text: '', type: '' });
    setShowSuccessChar(false);
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    if (type === 'success') {
      setTimeout(() => {
        showSuccessAnimation();
        setTimeout(() => navigate('/home'), 2000);
      }, 1500);
    }
  };

  const showSuccessAnimation = () => {
    setShowSuccessChar(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setShowSuccessChar(false), 2000);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = loginFormRef.current;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (!email || !password) {
      showMessage('Please fill in all fields! 📝', 'error');
      return;
    }

    showMessage('Logging you in... 🔄', 'success');
  };

  const handleSignup = (event) => {
    event.preventDefault();
    const form = signupFormRef.current;
    const name = form.querySelector('input[placeholder="Your Name"]').value;
    const username = form.querySelector('input[placeholder="Username"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (!name || !username || !email || !password) {
      showMessage('Please fill in all fields! 📝', 'error');
      return;
    }

    if (password.length < 6) {
      showMessage('Password should be at least 6 characters! 🔒', 'error');
      return;
    }

    showMessage(`Creating your account, ${name}... 🔄`, 'success');
  };

  const handleGoogleAuth = () => {
    showMessage('Connecting with Google... 🔄', 'success');
  };

  const checkPasswordStrength = (e) => {
    const password = e.target.value;
    if (password.length === 0) {
      setPasswordStrength({ text: '', type: '' });
      return;
    }

    if (password.length < 6) {
      setPasswordStrength({ text: 'Password is too short! 🔴', type: 'strength-weak' });
    } else if (password.length < 10) {
      setPasswordStrength({ text: 'Good password! 🟡', type: 'strength-medium' });
    } else {
      setPasswordStrength({ text: 'Strong password! 🟢', type: 'strength-strong' });
    }
  };

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes celebrate {
          0% { transform: scale(0) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: #ddd;
          z-index: 1;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-leaderboard-purple to-leaderboard-dark-purple flex items-center justify-center overflow-x-hidden font-comic-sans">
        <div className="stars fixed inset-0 pointer-events-none z-[1]"></div>
        <div className="relative bg-white/95 rounded-[25px] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.1)] max-w-[450px] w-[90%] z-[2] backdrop-blur-[10px]">
          <div className="floating-elements absolute inset-0 pointer-events-none overflow-hidden">
            <div className="floating-icon absolute text-2xl opacity-60 animate-float top-[10%] left-[10%]">🌟</div>
            <div className="floating-icon absolute text-2xl opacity-60 animate-float top-[20%] right-[15%]">🎨</div>
            <div className="floating-icon absolute text-2xl opacity-60 animate-float bottom-[30%] left-[20%]">🚀</div>
            <div className="floating-icon absolute text-2xl opacity-60 animate-float bottom-[20%] right-[10%]">🎮</div>
          </div>
          <div className="mascot text-center mb-[30px] text-[60px] animate-bounce">🐰</div>
          <div className="form-toggle flex mb-[30px] bg-gray-100 rounded-[15px] p-[5px]">
            <button
              className={`flex-1 p-4 bg-transparent rounded-[10px] text-lg font-bold cursor-pointer transition-all duration-300 ${formType === 'login' ? 'bg-green-500 text-white scale-105' : ''}`}
              onClick={() => showForm('login')}
            >
              Log In
            </button>
            <button
              className={`flex-1 p-4 bg-transparent rounded-[10px] text-lg font-bold cursor-pointer transition-all duration-300 ${formType === 'signup' ? 'bg-green-500 text-white scale-105' : ''}`}
              onClick={() => showForm('signup')}
            >
              Sign Up
            </button>
          </div>
          <div className={`message p-4 rounded-[10px] mb-[15px] font-bold text-center ${message.type === 'error' ? 'bg-red-50 text-red-800 border-2 border-red-500 animate-shake' : message.type === 'success' ? 'bg-green-50 text-green-800 border-2 border-green-500' : 'hidden'}`}>
            {message.text}
          </div>
          <div className={`success-character text-[80px] text-center mb-5 ${showSuccessChar ? 'block animate-celebrate' : 'hidden'}`}>🎉</div>

          {/* Login Form */}
          <div className={`form-section ${formType === 'login' ? 'block animate-fadeIn' : 'hidden'}`}>
            <h2 className="form-title text-center text-[28px] text-gray-800 mb-[25px] font-bold">Welcome Back! 👋</h2>
            <form ref={loginFormRef} onSubmit={handleLogin}>
              <div className="input-group mb-5 relative">
                <Mail className="input-icon absolute left-[15px] top-1/2 -translate-y-1/2 text-xl text-gray-600" />
                <input
                  type="email"
                  className="form-input w-full p-4 pl-[50px] border-4 border-gray-300 rounded-[15px] text-base transition-all duration-300 bg-white focus:border-green-500 focus:shadow-[0_0_15px_rgba(76,175,80,0.3)] focus:scale-[1.02]"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="input-group mb-5 relative">
                <Lock className="input-icon absolute left-[15px] top-1/2 -translate-y-1/2 text-xl text-gray-600" />
                <input
                  type="password"
                  className="form-input w-full p-4 pl-[50px] border-4 border-gray-300 rounded-[15px] text-base transition-all duration-300 bg-white focus:border-green-500 focus:shadow-[0_0_15px_rgba(76,175,80,0.3)] focus:scale-[1.02]"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full p-[18px] bg-gradient-to-r from-green-500 to-green-600 text-white border-none rounded-[15px] text-xl font-bold cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(76,175,80,0.4)] active:translate-y-0">
                Let's Go! 🚀
              </button>
            </form>
            <div className="divider text-center my-[25px] text-gray-600 relative">
              <span className="bg-white px-5 z-[2] relative">or</span>
            </div>
            <button className="google-btn w-full p-4 bg-white border-4 border-gray-300 rounded-[15px] text-base font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5 hover:border-blue-500 hover:-translate-y-[2px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.1)]" onClick={handleGoogleAuth}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </div>

          {/* Sign Up Form */}
          <div className={`form-section ${formType === 'signup' ? 'block animate-fadeIn' : 'hidden'}`}>
            <h2 className="form-title text-center text-[28px] text-gray-800 mb-[25px] font-bold">Create Your Account! ✨</h2>
            <form ref={signupFormRef} onSubmit={handleSignup}>
              <div className="input-group mb-5 relative">
                <User className="input-icon absolute left-[15px] top-1/2 -translate-y-1/2 text-xl text-gray-600" />
                <input
                  type="text"
                  className="form-input w-full p-4 pl-[50px] border-4 border-gray-300 rounded-[15px] text-base transition-all duration-300 bg-white focus:border-green-500 focus:shadow-[0_0_15px_rgba(76,175,80,0.3)] focus:scale-[1.02]"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="input-group mb-5 relative">
                <Target className="input-icon absolute left-[15px] top-1/2 -translate-y-1/2 text-xl text-gray-600" />
                <input
                  type="text"
                  className="form-input w-full p-4 pl-[50px] border-4 border-gray-300 rounded-[15px] text-base transition-all duration-300 bg-white focus:border-green-500 focus:shadow-[0_0_15px_rgba(76,175,80,0.3)] focus:scale-[1.02]"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="input-group mb-5 relative">
                <Mail className="input-icon absolute left-[15px] top-1/2 -translate-y-1/2 text-xl text-gray-600" />
                <input
                  type="email"
                  className="form-input w-full p-4 pl-[50px] border-4 border-gray-300 rounded-[15px] text-base transition-all duration-300 bg-white focus:border-green-500 focus:shadow-[0_0_15px_rgba(76,175,80,0.3)] focus:scale-[1.02]"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="input-group mb-5 relative">
                <Lock className="input-icon absolute left-[15px] top-1/2 -translate-y-1/2 text-xl text-gray-600" />
                <input
                  type="password"
                  className="form-input w-full p-4 pl-[50px] border-4 border-gray-300 rounded-[15px] text-base transition-all duration-300 bg-white focus:border-green-500 focus:shadow-[0_0_15px_rgba(76,175,80,0.3)] focus:scale-[1.02]"
                  placeholder="Create Password"
                  required
                  onKeyUp={checkPasswordStrength}
                />
                <div className={`password-strength mt-[5px] text-sm ${passwordStrength.type} ${passwordStrength.text ? 'block' : 'hidden'}`}>
                  {passwordStrength.text}
                </div>
              </div>
              <button type="submit" className="btn-primary w-full p-[18px] bg-gradient-to-r from-green-500 to-green-600 text-white border-none rounded-[15px] text-xl font-bold cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(76,175,80,0.4)] active:translate-y-0">
                Create Account! 🌟
              </button>
            </form>
            <div className="divider text-center my-[25px] text-gray-600 relative">
              <span className="bg-white px-5 z-[2] relative">or</span>
            </div>
            <button className="google-btn w-full p-4 bg-white border-4 border-gray-300 rounded-[15px] text-base font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5 hover:border-blue-500 hover:-translate-y-[2px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.1)]" onClick={handleGoogleAuth}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;