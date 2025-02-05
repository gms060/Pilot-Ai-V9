import React, { useState } from 'react';
import { Bot, Send, Loader2, Search, PlusCircle, ChevronRight, MessageSquare, Syringe, Scissors, Bone, Gauge, FlaskConical, Bluetooth as Tooth } from 'lucide-react';
import { generateResponse } from './lib/mistral';

function App() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestions = [
    "Protocol for immediate implant placement in the aesthetic zone",
    "Current guidelines for full-arch rehabilitation",
    "Best practices for crown lengthening procedure",
    "Evidence-based approach to guided tissue regeneration",
    "Latest techniques in socket preservation",
    "Recommended materials for posterior composite restorations"
  ];

  const quickActions = [
    { 
      icon: <Syringe />, 
      label: "Surgical Procedures",
      subcategories: [
        "Implant Surgery",
        "Bone Grafting",
        "Soft Tissue Procedures",
        "Extractions"
      ]
    },
    { 
      icon: <Tooth />, 
      label: "Restorative",
      subcategories: [
        "Direct Restorations",
        "Indirect Restorations",
        "Full Mouth Rehab",
        "Materials Selection"
      ]
    },
    { 
      icon: <Bone />, 
      label: "Implantology",
      subcategories: [
        "Treatment Planning",
        "Surgical Protocols",
        "Prosthetic Options",
        "Complications Management"
      ]
    },
    { 
      icon: <Scissors />, 
      label: "Periodontics",
      subcategories: [
        "Surgical Techniques",
        "Regenerative Procedures",
        "Pocket Management",
        "Maintenance Protocols"
      ]
    },
    { 
      icon: <Gauge />, 
      label: "Clinical Guidelines",
      subcategories: [
        "Treatment Protocols",
        "Best Practices",
        "Case Selection",
        "Risk Assessment"
      ]
    },
    { 
      icon: <FlaskConical />, 
      label: "Materials & Tech",
      subcategories: [
        "Biomaterials",
        "Digital Workflow",
        "Equipment",
        "New Technologies"
      ]
    }
  ];

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setError(null);
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateResponse([...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center gap-3 text-[#0D9488]">
            <Bot className="h-10 w-10" />
            <span className="font-bold text-xl">Dental Pilot AI</span>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Clinical Resources</h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <div key={index} className="space-y-1">
                <button
                  className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {action.icon}
                    <span>{action.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="ml-9 space-y-1">
                  {action.subcategories.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      className="w-full text-left px-3 py-1.5 text-sm text-gray-600 hover:text-[#0D9488] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Searches</h3>
          <div className="space-y-2">
            {messages.slice(-3).map((msg, index) => (
              msg.role === 'user' && (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <Search className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p className="truncate">{msg.content}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-xl font-semibold text-gray-900">Clinical Assistant</h1>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex max-w-6xl mx-auto w-full">
          {/* Main Chat */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Welcome to Your Clinical Assistant</h2>
                  <p className="text-gray-600 mb-4">Ask any question about surgical procedures, restorative techniques, or evidence-based protocols.</p>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-[#0D9488] text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <Loader2 className="h-5 w-5 animate-spin text-[#0D9488]" />
                  </div>
                </div>
              )}
              {error && (
                <div className="flex justify-center">
                  <div className="bg-red-50 text-red-600 rounded-lg p-4 max-w-[80%]">
                    {error}
                  </div>
                </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleChat} className="max-w-3xl mx-auto">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about surgical procedures, restorative techniques, or clinical protocols..."
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#0D9488] text-white px-6 py-3 rounded-lg hover:bg-[#0B7C71] transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    <span>Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Suggestions Sidebar */}
          <div className="w-72 border-l border-gray-200 p-4 bg-white">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Suggested Topics</h3>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInput(suggestion)}
                  className="w-full text-left text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <PlusCircle className="h-4 w-4 text-[#0D9488]" />
                  <span className="text-gray-700">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;