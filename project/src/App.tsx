import React, { useState } from 'react';
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
    <main className="container">
      <header>
        <h1>Dental Pilot AI</h1>
        <p>Professional Clinical Assistant for Evidence-Based Dentistry</p>
      </header>

      <section className="chat-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <p>Welcome to Dental Pilot AI. How can I assist you today?</p>
          </div>
        ) : (
          <div className="messages">
            {messages.map((message, index) => (
              <article 
                key={index} 
                className={`message ${message.role}`}
              >
                <p>{message.content}</p>
              </article>
            ))}
            {isLoading && (
              <div className="loading">
                <p>Processing your request...</p>
              </div>
            )}
          </div>
        )}
      </section>

      <footer>
        <form onSubmit={handleChat} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about dental procedures, techniques, or clinical protocols..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </footer>
    </main>
  );
}

export default App