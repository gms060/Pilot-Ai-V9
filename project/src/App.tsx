import React, { useState } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
import { generateResponse } from './lib/mistral';

function App() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateResponse([...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Bot className="h-12 w-12 mx-auto text-teal-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dental Pilot AI</h1>
          <p className="text-gray-600">Professional Clinical Assistant for Evidence-Based Dentistry</p>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Chat Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[500px] mb-4 p-4 sm:p-6">
            <div className="h-full flex flex-col">
              <div className="flex-1 space-y-4">
                {messages.length === 0 && (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Start a conversation by typing a message below
                  </div>
                )}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg p-4 max-w-[85%] sm:max-w-[75%] ${
                        message.role === 'user'
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm sm:text-base whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleChat} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border-2 border-gray-200 px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-teal-600"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;