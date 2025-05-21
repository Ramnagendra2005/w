import React, { useState } from 'react';

// Main App component
const App = () => {
  // State to manage the current page for routing
  const [currentPage, setCurrentPage] = useState('login'); // Default to login page

  // Function to navigate to a different page
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Common Tailwind classes for input fields and buttons
  const inputClasses = "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4";
  const buttonClasses = "w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out";
  const linkClasses = "text-blue-600 hover:underline cursor-pointer";

  // Registration Page Component
  const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      // In a real application, you would send this data to a backend
      console.log('Registering:', { name, email, password });
      alert('Registration successful! (Not actually saved)');
      navigateTo('login'); // Redirect to login after registration
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
              required
            />
            <button type="submit" className={buttonClasses}>
              Register
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <span onClick={() => navigateTo('login')} className={linkClasses}>
              Login here
            </span>
          </p>
        </div>
      </div>
    );
  };

  // Login Page Component
  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      // In a real application, you would authenticate against a backend
      console.log('Logging in:', { email, password });
      if (email === 'test@example.com' && password === 'password') {
        alert('Login successful!');
        // In a real app, you'd set user session/token and redirect to a dashboard
      } else {
        alert('Invalid credentials. Use test@example.com / password');
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
              required
            />
            <button type="submit" className={buttonClasses}>
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <span onClick={() => navigateTo('registration')} className={linkClasses}>
              Register here
            </span>
          </p>
        </div>
      </div>
    );
  };

  // Contact Page Component
  const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Contact message:', { name, email, message });
      alert('Your message has been sent! (Not actually sent)');
      setName('');
      setEmail('');
      setMessage('');
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClasses} h-32 resize-none`}
              required
            ></textarea>
            <button type="submit" className={buttonClasses}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  };

  // About Page Component
  const AboutPage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Our Student Management System</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Welcome to our comprehensive Student Management System, designed to streamline and simplify academic administration.
            Our platform provides a robust solution for managing student data, academic records, attendance, and much more.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our mission is to empower educational institutions with efficient tools to enhance student success and operational effectiveness.
            We are committed to providing a user-friendly and secure environment for students, faculty, and administrators alike.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Key features include student registration, course enrollment, grade tracking, communication tools, and reporting functionalities.
            We continuously strive to improve and expand our system to meet the evolving needs of modern education.
          </p>
        </div>
      </div>
    );
  };

  // Render the current page based on the currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'registration':
        return <RegistrationPage />;
      case 'login':
        return <LoginPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <LoginPage />; // Fallback to login page
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-4 shadow-lg fixed w-full z-10 top-0">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <span className="text-blue-400">Student</span>Manager
          </div>
          <div className="flex space-x-6">
            <button onClick={() => navigateTo('registration')} className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              Register
            </button>
            <button onClick={() => navigateTo('login')} className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              Login
            </button>
            <button onClick={() => navigateTo('contact')} className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              Contact
            </button>
            <button onClick={() => navigateTo('about')} className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              About
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content (add padding-top to account for fixed nav) */}
      <div className="pt-16"> {/* Adjust padding-top based on nav height */}
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
