import React from 'react';
import { Brain, Microscope, BookOpen, FlaskRound as Flask, Bluetooth as Tooth, Workflow, Shield, Award, ChevronRight, GraduationCap } from 'lucide-react';

const specialties = [
  {
    title: 'Prosthodontics',
    icon: Tooth,
    description: 'Advanced restorative techniques and digital workflow integration'
  },
  {
    title: 'Oral Surgery & Implantology',
    icon: Microscope,
    description: 'Complex surgical protocols and guided surgery workflows'
  },
  {
    title: 'Endodontics',
    icon: Flask,
    description: 'Microsurgical techniques and complex canal morphology'
  },
  {
    title: 'Periodontics',
    icon: Workflow,
    description: 'Advanced regenerative protocols and perio-prosthetic interface'
  }
];

const features = [
  {
    title: 'Evidence-Based Practice',
    icon: BookOpen,
    description: 'Access peer-reviewed research and clinical studies'
  },
  {
    title: 'Clinical Intelligence',
    icon: Brain,
    description: 'Advanced AI-powered clinical decision support'
  },
  {
    title: 'Risk Management',
    icon: Shield,
    description: 'Comprehensive protocols and prevention strategies'
  },
  {
    title: 'Professional Development',
    icon: GraduationCap,
    description: 'Stay current with latest techniques and materials'
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Clinical Assistant for
            <span className="text-blue-600"> Evidence-Based Dentistry</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Empowering dental professionals with AI-driven clinical decision support,
            backed by the latest research and evidence-based protocols.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center">
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 -z-10" />
      </header>

      {/* Specialties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Specialized Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((specialty, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                <specialty.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{specialty.title}</h3>
                <p className="text-gray-600">{specialty.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-2 bg-blue-50 rounded-full mb-8">
            <Award className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Trusted by Dental Professionals</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powered by advanced AI models including Mistral AI and OpenAI, delivering
            reliable clinical decision support with evidence-based recommendations.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Dental Pilot AI</h3>
              <p className="text-gray-400">
                Professional Clinical Assistant for Evidence-Based Dentistry
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">www.dentalpilotai.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Dental Pilot AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;