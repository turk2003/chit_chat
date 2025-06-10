'use client';
import { MessageCircle,  } from 'lucide-react';
import Link from 'next/link';
export default function Home() {
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
        {/* Chatbot container */}
        <div className="flex items-center justify-center w-full">
          <div className=" justify-center   relative h-[600px] sm:h-[80vh] w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden group">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>            
            {/* Inner container */}
            <div className="relative h-full bg-white rounded-2xl overflow-hidden">
              {/* Loading indicator */}
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
      </div>
      <div className="flex justify-center">
            <Link
              href="/predict"
              className="inline-block mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-700 transition"
            >
              ประเมินแนวโน้มการละเมิดใช้ไฟ
            </Link>
          </div>
      </div> 
    </div>
  );
}