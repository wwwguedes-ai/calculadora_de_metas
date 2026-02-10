
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative mb-2">
        {/* Simplified Infinity/Helix shape inspired by the logo */}
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20C20 28.2843 26.7157 35 35 35C43.2843 35 50 28.2843 50 20C50 11.7157 56.7157 5 65 5C73.2843 5 80 11.7157 80 20" stroke="#B0BFA8" strokeWidth="2" />
          <path d="M60 20C60 11.7157 53.2843 5 45 5C36.7157 5 30 11.7157 30 20C30 28.2843 23.2843 35 15 35C6.71573 35 0 28.2843 0 20" stroke="#B0BFA8" strokeWidth="2" />
        </svg>
      </div>
      <div className="text-center">
        <span className="block text-sm tracking-widest text-[#B0BFA8] uppercase font-light">Grupo</span>
        <h1 className="text-4xl font-light tracking-tight text-[#2D5A43]">
          Saúde <span className="font-semibold italic">Forever</span>
        </h1>
      </div>
    </div>
  );
};

export default Logo;
