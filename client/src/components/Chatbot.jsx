import React, { useState, useEffect, useRef } from 'react';
import { MdChat, MdClose, MdSend } from 'react-icons/md';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Travlia Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // অটো স্ক্রল টু বটম
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // সাধারণ প্রশ্নের জন্য নলেজ বেস
const knowledgeBase = {
    // সম্ভাষণ
    "hi": "Hello! Looking for a tour package or country info?",
    "hello": "Hi there! Welcome to Travlia. How can I assist you?",
    "hey": "Hey! Travlia Assistant here. How can I help?",

    // বটের পরিচয়
    "name": "I am Travlia AI Assistant, your personal travel guide!",
    "who are you": "I am the official AI bot of Travlia, designed to help you with travel info.",
    
    // সার্ভিস সংক্রান্ত
    "better": "It depends on your taste! For beaches, Bali is great. For mountains, try Switzerland. What do you prefer?",
    "place": "Every place is beautiful! Our 'Sajek Valley' and 'Cox's Bazar' packages are very popular right now.",
    "package": "We have many packages starting from $23! Go to the 'Tours' page to see all.",
    "price": "Our tour prices are very affordable, starting from just $23.00!",
    
    // বিদায় ও ধন্যবাদ
    "thanks": "You're welcome! Happy traveling! ✈️",
    "thank you": "Glad I could help! Do you need anything else?",
    "bye": "Goodbye! Hope to see you on a trip soon!"
  };
  const handleSendMessage = async () => {
    const userText = input.trim().toLowerCase();
    if (!userText) return;

    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput("");

   
    let botResponse = "";
    
    //  key word matching
    const foundKeyword = Object.keys(knowledgeBase).find(key => userText.includes(key));

    if (foundKeyword) {
      botResponse = knowledgeBase[foundKeyword];
      setTimeout(() => {
        setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      }, 500);
    } 
    //  Country API call
    else {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${userText}`);
        const country = response.data[0];
        botResponse = `📍 Country: ${country.name.common}\n🏙️ Capital: ${country.capital?.[0]}\n👥 Population: ${country.population.toLocaleString()}\n🌍 Region: ${country.region}\n💰 Currency: ${Object.values(country.currencies)[0].name}`;
        
        setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      } catch (error) {
        setMessages(prev => [...prev, { 
          text: "I'm still learning! You can ask about a specific country name or say 'Hi' to start.", 
          isBot: true 
        }]);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Greeting Bubble */}
      {showGreeting && !isOpen && (
        <div className="bg-white text-slate-800 px-4 py-2 rounded-2xl shadow-xl mb-3 border border-slate-100 animate-bounce text-xs font-bold">
          Need travel help? Chat with me! 👋
        </div>
      )}

      {/* Chat Icon */}
      <button 
        onClick={() => { setIsOpen(!isOpen); setShowGreeting(false); }}
        className="bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:bg-slate-900 transition-all"
      >
        {isOpen ? <MdClose size={30} /> : <MdChat size={30} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-5">
          <div className="bg-slate-900 p-4 text-white font-bold flex items-center justify-between">
            <span>Travlia Assistant</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-snug ${
                  msg.isBot ? 'bg-white text-slate-700 shadow-sm' : 'bg-orange-500 text-white'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 border-t bg-white flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me something..."
              className="flex-1 bg-slate-100 p-2.5 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500"
            />
            <button onClick={handleSendMessage} className="bg-orange-500 text-white p-2 rounded-xl">
              <MdSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;