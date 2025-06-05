'use client';
import React, { useState, useEffect } from 'react';
import { MessageCircle, Minimize2, Maximize2, Smartphone, Monitor } from 'lucide-react';

export default function Home() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header */}
        <div className="w-full max-w-5xl mb-4 sm:mb-6">
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Chit-Chat
              </h1>
            </div>
            
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className=" text-purple-500 flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-sm border border-gray-200/50"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {isFullscreen ? 'Minimize' : 'Fullscreen'}
              </span>
            </button>
            
            <div className=" text-purple-500 flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-sm border border-gray-200/50">
              {isMobile ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {isMobile ? 'Mobile' : 'Desktop'} View
              </span>
            </div>
          </div>
        </div>

        {/* Chatbot Container */}
        <div className={`
          w-full transition-all duration-300 ease-in-out
          ${isFullscreen 
            ? 'max-w-full h-[calc(100vh-8rem)]' 
            : 'max-w-5xl h-[70vh] sm:h-[80vh]'
          }
        `}>
          <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden group">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Inner container */}
            <div className="relative h-full bg-white rounded-2xl overflow-hidden">
              {/* Loading indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 font-medium">Connected</span>
              </div>

              {/* Iframe */}
              <iframe
                src="https://copilotstudio.microsoft.com/environments/Default-25a337e5-ec92-4fa0-852a-2815e0cdcd11/bots/crbf1_chitchat/webchat?__version__=2"
                className="w-full h-full border-none"
                title="AI Assistant Chatbot"
                allow="microphone; camera"
                loading="lazy"
              />

              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Powered by Microsoft Copilot Studio
          </p>
        </div>
      </div>

      {/* Mobile optimization styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .min-h-screen {
            min-height: 100vh;
            min-height: 100dvh; /* Dynamic viewport height for mobile */
          }
        }
      `}</style>
    </div>
  );
}