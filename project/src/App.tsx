import React, { useState, useEffect } from 'react';
import { Bot, Send, Loader2, MessageSquare, Circle, PlusCircle, Settings } from 'lucide-react';
import { generateResponse } from './lib/mistral';
import { verifyAndFixScripts } from './lib/scriptVerifier';

function App() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    verifyAndFixScripts();
  }, []);

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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-14 flex items-center px-5">
        <div className="flex items-center gap-2 text-teal-600">
          <Bot className="h-6 w-6" />
          <span className="font-semibold text-lg">Dental Pilot AI</span>
        </div>
      </header>

      {/* Chat Area */}
      <main className="max-w-3xl mx-auto p-5">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="text-center py-12">
            <Bot className="h-16 w-16 text-teal-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome to Dental Pilot AI
            </h1>
            <p className="text-gray-600">
              Your professional clinical assistant for evidence-based dentistry
            </p>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleChat} className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about dental procedures, techniques, or protocols..."
            className="flex-1 h-10 px-4 text-sm rounded-md border-2 border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="h-10 px-5 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="text-sm">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;