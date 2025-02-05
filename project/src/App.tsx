import React, { useState } from 'react';
import { Bot, Send, Loader2, MessageSquare, Circle, PlusCircle, Settings, X, Moon, Sun, Globe, Key, History, ChevronRight } from 'lucide-react';
import { generateResponse } from './lib/mistral';

const clinicalResources = [
  {
    title: "Treatment Planning",
    topics: [
      "Complex Case Management",
      "Interdisciplinary Approach",
      "Risk Assessment",
      "Treatment Sequencing",
      "Patient Communication"
    ]
  },
  {
    title: "Clinical Procedures",
    topics: [
      "Advanced Techniques",
      "Step-by-step Protocols",
      "Material Selection",
      "Equipment Usage",
      "Best Practices"
    ]
  },
  {
    title: "Patient Management",
    topics: [
      "Behavior Guidance",
      "Anxiety Control",
      "Special Needs Care",
      "Emergency Protocols",
      "Post-operative Care"
    ]
  },
  {
    title: "Evidence-Based Updates",
    topics: [
      "Latest Research",
      "Clinical Guidelines",
      "Systematic Reviews",
      "Meta-analyses",
      "Practice Standards"
    ]
  }
];

const specialties = [
  {
    title: "Medication Cross Reference",
    description: "Drug interactions and protocols"
  },
  {
    title: "Prosthodontics",
    description: "Advanced restorative procedures"
  },
  {
    title: "Oral Surgery",
    description: "Surgical techniques and management"
  },
  {
    title: "Implantology",
    description: "Placement and restoration protocols"
  },
  {
    title: "Endodontics",
    description: "Root canal therapy and microsurgery"
  },
  {
    title: "Periodontics",
    description: "Soft tissue and bone management"
  },
  {
    title: "Orthodontics",
    description: "Alignment and occlusion therapy"
  },
  {
    title: "Pediatric Dentistry",
    description: "Child-specific treatments"
  }
];

function App() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateResponse([...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  const settingsOptions = [
    {
      title: 'Theme',
      description: 'Toggle light/dark mode',
      icon: Moon,
      action: () => alert('Theme toggle functionality coming soon')
    },
    {
      title: 'API Configuration',
      description: 'Manage your API keys',
      icon: Key,
      action: () => alert('API configuration coming soon')
    },
    {
      title: 'Language',
      description: 'Change interface language',
      icon: Globe,
      action: () => alert('Language settings coming soon')
    },
    {
      title: 'Chat History',
      description: 'Manage conversation history',
      icon: History,
      action: () => alert('Chat history settings coming soon')
    }
  ];

  return (
    <div className="grid grid-cols-[280px_1fr_280px] h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="h-14 flex items-center px-5 border-b border-gray-200">
          <div className="flex items-center gap-2 text-teal-600">
            <Bot className="h-6 w-6" />
            <span className="font-semibold text-lg">Dental Pilot AI</span>
          </div>
        </div>
        
        {/* Main sidebar content with flex column layout */}
        <div className="flex flex-col h-[calc(100vh-3.5rem)]">
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-5 py-3">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Clinical Resources</h3>
              <div className="space-y-0.5">
                {clinicalResources.map((category, index) => (
                  <div key={index} className="space-y-0.5">
                    <button
                      onClick={() => toggleCategory(category.title)}
                      className="w-full flex items-center justify-between py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {expandedCategory === category.title ? (
                          <Circle className="h-4 w-4 text-teal-600" />
                        ) : (
                          <PlusCircle className="h-4 w-4 text-teal-600" />
                        )}
                        <span className="text-[13px]">{category.title}</span>
                      </div>
                    </button>
                    {expandedCategory === category.title && (
                      <div className="ml-6 space-y-0.5">
                        {category.topics.map((topic, topicIndex) => (
                          <button
                            key={topicIndex}
                            onClick={() => setInput(`${category.title}: ${topic}`)}
                            className="w-full text-left py-1.5 px-3 text-xs text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent searches section */}
          <div className="mt-auto border-t border-gray-200">
            <div className="px-5 py-3">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Recent Searches</h3>
              <div className="space-y-1">
                {messages.slice(-3).map((msg, index) => (
                  msg.role === 'user' && (
                    <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                      <PlusCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <p className="truncate">{msg.content}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-end px-5">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="text-gray-500 hover:text-teal-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>

        {/* Settings Modal */}
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 space-y-2">
                {settingsOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={option.action}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <option.icon className="h-5 w-5 text-teal-600" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-700">{option.title}</p>
                        <p className="text-xs text-gray-500">{option.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 relative pb-20">
          <div className="h-full overflow-y-auto p-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center px-5 py-8 max-w-[90%] mx-auto sm:max-w-[85%] md:max-w-[80%]">
                <Bot className="h-[6.24rem] w-[6.24rem] text-teal-600 mb-6" />
                <h2 className="text-teal-600 font-bold text-center mb-4 text-[clamp(1rem,2.5vw,2rem)] leading-tight">
                  The World's Most Comprehensive Research-Based Dental Intelligence Database
                </h2>
                <p className="text-[clamp(0.5rem,1.5vw,0.75rem)] leading-relaxed text-center text-gray-600">
                  Where Advanced Research Meets Clinical Precision
                </p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                </div>
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-72 right-72 bg-white border-t border-gray-200 px-6 py-3 z-50">
            <div className="max-w-[800px] mx-auto w-full">
              <form onSubmit={handleChat} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about dental procedures, techniques, or clinical protocols..."
                  className="flex-1 h-10 px-4 text-[13px] rounded-md border-2 border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
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
                  <span className="text-[13px]">Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="bg-white border-l border-gray-200">
        <div className="h-14 flex items-center px-5 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600">Dental Specialties</h3>
        </div>
        <div className="px-5 py-3 space-y-0.5">
          {specialties.map((specialty, index) => (
            <button
              key={index}
              onClick={() => setInput(`Tell me about ${specialty.title}`)}
              className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-teal-600" />
                <div>
                  <p className="text-[13px] text-gray-700 font-medium leading-tight">{specialty.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{specialty.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;