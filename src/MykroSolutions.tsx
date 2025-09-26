import React, { useState, useEffect } from 'react';
import { useDocumentTitle } from './shared/hooks/useDocumentTitle';

const MykroSolutions: React.FC = () => {
  useDocumentTitle('mykro.solutions');
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('mykro-solutions-theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('mykro-solutions-theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Status Banner */}
      <div className="bg-green-500 text-white py-3 text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">All systems operational - API uptime 99.99%</span>
        </div>
      </div>

      {/* Navigation */}
      <div className={`fixed top-0 w-full ${isDarkMode ? 'bg-gray-800/98' : 'bg-white/98'} backdrop-blur-md z-50 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mt-10`}>
        <div className="bg-gray-900 text-white py-2">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm">
            <span>Part of the mykro ecosystem</span>
            <div className="space-x-6 font-mono">
              <a href="/mykro" className="hover:text-gray-300 transition-colors">mykro.co</a>
              <a href="/mykro/giving" className="hover:text-gray-300 transition-colors">mykro.giving</a>
              <a href="/mykro/solutions" className="font-semibold">mykro.solutions</a>
            </div>
          </div>
        </div>
        <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/mykro/solutions" className="text-xl font-bold text-teal-600 font-mono">mykro.solutions</a>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#docs" className={`${isDarkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'} transition-colors text-sm`}>Documentation</a>
              <a href="#api" className={`${isDarkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'} transition-colors text-sm`}>API Reference</a>
              <a href="#pricing" className={`${isDarkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'} transition-colors text-sm`}>Pricing</a>
              <a href="#sdks" className={`${isDarkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'} transition-colors text-sm`}>SDKs</a>
              <a href="#status" className={`${isDarkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'} transition-colors text-sm`}>Status</a>
              <a href="#support" className={`${isDarkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'} transition-colors text-sm`}>Support</a>
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <a href="#" className={`${isDarkMode ? 'bg-teal-500 hover:bg-teal-600' : 'bg-teal-600 hover:bg-teal-700'} text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors`}>
                Get API Key
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} py-20 mt-24`}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 leading-tight`}>
              Powerful Payments API with <span className={`${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>Purpose Built-In</span>
            </h1>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed`}>
              Enterprise-grade payment infrastructure that automatically enables charitable giving. One integration, endless possibilities, measurable good.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="#" className={`${isDarkMode ? 'bg-teal-500 hover:bg-teal-600' : 'bg-teal-600 hover:bg-teal-700'} text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center`}>
                Get Started
                <span className="ml-2">→</span>
              </a>
              <a href="#" className={`border-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:border-teal-400 hover:text-teal-400' : 'border-gray-300 text-gray-700 hover:border-teal-600 hover:text-teal-600'} px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center`}>
                View Documentation
                <span className="ml-2">•</span>
              </a>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>15ms</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Average latency</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>99.99%</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Uptime SLA</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>10M+</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Daily transactions</div>
              </div>
            </div>
          </div>
          
          {/* Code Demo */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
            <div className="flex space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="font-mono text-sm text-gray-300 space-y-1">
              <div className="text-gray-500">// Initialize mykro payments</div>
              <div><span className="text-purple-400">const</span> <span className="text-yellow-300">mykro</span> = <span className="text-purple-400">new</span> <span className="text-blue-400">MykroClient</span>({`{`}</div>
              <div className="ml-4"><span className="text-yellow-300">apiKey</span>: <span className="text-green-400">'mk_live_1234567890'</span>,</div>
              <div className="ml-4"><span className="text-yellow-300">enableGiving</span>: <span className="text-purple-400">true</span></div>
              <div>{`});`}</div>
              <div></div>
              <div className="text-gray-500">// Process payment with round-up</div>
              <div><span className="text-purple-400">const</span> <span className="text-yellow-300">payment</span> = <span className="text-purple-400">await</span> <span className="text-yellow-300">mykro</span>.<span className="text-blue-400">createPayment</span>({`{`}</div>
              <div className="ml-4"><span className="text-yellow-300">amount</span>: <span className="text-orange-400">47.83</span>,</div>
              <div className="ml-4"><span className="text-yellow-300">currency</span>: <span className="text-green-400">'GBP'</span>,</div>
              <div className="ml-4"><span className="text-yellow-300">roundUp</span>: {`{`}</div>
              <div className="ml-8"><span className="text-yellow-300">enabled</span>: <span className="text-purple-400">true</span>,</div>
              <div className="ml-8"><span className="text-yellow-300">charityId</span>: <span className="text-green-400">'save_children_uk'</span></div>
              <div className="ml-4">{`}`}</div>
              <div>{`});`}</div>
              <div></div>
              <div className="text-gray-500">// £0.17 automatically donated!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`} id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Built for Developers, Designed for Impact</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Everything you need to build modern payment experiences with social good at the core</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-gray-50 hover:bg-white border-gray-100'} p-8 rounded-lg hover:shadow-md transition-all border`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-600'} rounded-lg flex items-center justify-center text-white text-xl mb-4 font-bold`}>⚡</div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Lightning Fast</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sub-20ms response times with global edge infrastructure. Process payments at the speed of thought.</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-gray-50 hover:bg-white border-gray-100'} p-8 rounded-lg hover:shadow-md transition-all border`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-600'} rounded-lg flex items-center justify-center text-white text-xl mb-4 font-bold`}>◇</div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Bank-Grade Security</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>PCI DSS Level 1 certified. End-to-end encryption, tokenization, and fraud detection built-in.</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-gray-50 hover:bg-white border-gray-100'} p-8 rounded-lg hover:shadow-md transition-all border`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-600'} rounded-lg flex items-center justify-center text-white text-xl mb-4 font-bold`}>○</div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Global Coverage</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Support for 135+ currencies and payment methods. Local acquiring in 45 countries.</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-gray-50 hover:bg-white border-gray-100'} p-8 rounded-lg hover:shadow-md transition-all border`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-600'} rounded-lg flex items-center justify-center text-white text-xl mb-4 font-bold`}>◊</div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Impact Analytics</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Real-time dashboards showing donation metrics, social impact, and engagement rates.</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-gray-50 hover:bg-white border-gray-100'} p-8 rounded-lg hover:shadow-md transition-all border`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-600'} rounded-lg flex items-center justify-center text-white text-xl mb-4 font-bold`}>▲</div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Developer First</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>RESTful APIs, webhooks, SDKs in 10+ languages. Comprehensive docs and sandbox environment.</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-gray-50 hover:bg-white border-gray-100'} p-8 rounded-lg hover:shadow-md transition-all border`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-600'} rounded-lg flex items-center justify-center text-white text-xl mb-4 font-bold`}>◆</div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Smart Routing</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>ML-powered transaction routing for optimal success rates and lowest processing costs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`} id="api">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Simple, Powerful APIs</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>RESTful endpoints designed for clarity and ease of use</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`${isDarkMode ? 'bg-gray-900 border-gray-700 hover:border-teal-400' : 'bg-white border-gray-200 hover:border-teal-600'} p-6 rounded-lg border transition-colors cursor-pointer flex items-center space-x-4`}>
              <span className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-mono font-bold">POST</span>
              <div>
                <div className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>/v1/payments</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Create a new payment with optional round-up</div>
              </div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-900 border-gray-700 hover:border-teal-400' : 'bg-white border-gray-200 hover:border-teal-600'} p-6 rounded-lg border transition-colors cursor-pointer flex items-center space-x-4`}>
              <span className="bg-green-500 text-white px-3 py-1 rounded text-xs font-mono font-bold">GET</span>
              <div>
                <div className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>/v1/payments/{`{id}`}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Retrieve payment details and status</div>
              </div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-900 border-gray-700 hover:border-teal-400' : 'bg-white border-gray-200 hover:border-teal-600'} p-6 rounded-lg border transition-colors cursor-pointer flex items-center space-x-4`}>
              <span className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-mono font-bold">POST</span>
              <div>
                <div className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>/v1/refunds</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Issue full or partial refunds</div>
              </div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-900 border-gray-700 hover:border-teal-400' : 'bg-white border-gray-200 hover:border-teal-600'} p-6 rounded-lg border transition-colors cursor-pointer flex items-center space-x-4`}>
              <span className="bg-green-500 text-white px-3 py-1 rounded text-xs font-mono font-bold">GET</span>
              <div>
                <div className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>/v1/donations</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>List all donations and impact metrics</div>
              </div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-900 border-gray-700 hover:border-teal-400' : 'bg-white border-gray-200 hover:border-teal-600'} p-6 rounded-lg border transition-colors cursor-pointer flex items-center space-x-4`}>
              <span className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-mono font-bold">POST</span>
              <div>
                <div className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>/v1/webhooks</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Configure webhook endpoints</div>
              </div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-900 border-gray-700 hover:border-teal-400' : 'bg-white border-gray-200 hover:border-teal-600'} p-6 rounded-lg border transition-colors cursor-pointer flex items-center space-x-4`}>
              <span className="bg-green-500 text-white px-3 py-1 rounded text-xs font-mono font-bold">GET</span>
              <div>
                <div className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>/v1/charities</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Browse available charity partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Steps */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Start Building in Minutes</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>From zero to processing payments with purpose in just a few steps</p>
          </div>
          <div className="space-y-12">
            <div className="flex items-start space-x-6">
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-600'} text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0`}>1</div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Install the SDK</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>Choose your language and install via your preferred package manager</p>
                <div className="bg-gray-900 text-gray-300 p-4 rounded font-mono text-sm">npm install @mykro/payments-sdk</div>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-600'} text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0`}>2</div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Initialize with your API key</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>Get your API keys from the dashboard and configure the client</p>
                <div className="bg-gray-900 text-gray-300 p-4 rounded font-mono text-sm">const mykro = new MykroClient({`{ apiKey: 'mk_live_...' }`});</div>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-600'} text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0`}>3</div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Create your first payment</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>Process payments with built-in round-up functionality</p>
                <div className="bg-gray-900 text-gray-300 p-4 rounded font-mono text-sm">const payment = await mykro.createPayment({`{ amount: 99.99 }`});</div>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-600'} text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0`}>4</div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Monitor impact</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>Track donations and social impact through your dashboard</p>
                <div className="bg-gray-900 text-gray-300 p-4 rounded font-mono text-sm">const impact = await mykro.getImpactMetrics();</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`} id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Transparent, Scalable Pricing</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pay only for what you use. No setup fees, no hidden costs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-lg border text-center`}>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Starter</h3>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'} mb-2`}>1.4%<span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-normal`}> + 20p</span></div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Perfect for startups and small businesses</p>
              <ul className="space-y-3 mb-8 text-left">
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  Up to £100k/month
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  Standard support
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  Basic analytics
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  10 team members
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  API access
                </li>
              </ul>
              <a href="#" className={`w-full border-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:border-teal-400 hover:text-teal-400' : 'border-gray-300 text-gray-700 hover:border-teal-600 hover:text-teal-600'} py-3 rounded-lg font-semibold transition-colors block text-center`}>
                Get Started
              </a>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-900 border-teal-400' : 'bg-white border-teal-600'} p-8 rounded-lg border-2 text-center relative transform scale-105`}>
              <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-600'} text-white px-4 py-1 rounded-full text-xs font-bold`}>
                Most Popular
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Growth</h3>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'} mb-2`}>0.9%<span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-normal`}> + 20p</span></div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>For growing businesses with custom needs</p>
              <ul className="space-y-3 mb-8 text-left">
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  Up to £1M/month
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  Priority support
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  Advanced analytics
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  Unlimited team members
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  Custom integrations
                </li>
              </ul>
              <a href="#" className={`w-full ${isDarkMode ? 'bg-teal-500 hover:bg-teal-600' : 'bg-teal-600 hover:bg-teal-700'} text-white py-3 rounded-lg font-semibold transition-colors block text-center`}>
                Get Started
              </a>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-lg border text-center`}>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Enterprise</h3>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'} mb-2`}>Custom</div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Volume pricing for large organizations</p>
              <ul className="space-y-3 mb-8 text-left">
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  Unlimited volume
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  Dedicated support
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  Custom reporting
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  SLA guarantees
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-green-500 mr-3">✓</span>
                  White-label options
                </li>
              </ul>
              <a href="#" className={`w-full border-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:border-teal-400 hover:text-teal-400' : 'border-gray-300 text-gray-700 hover:border-teal-600 hover:text-teal-600'} py-3 rounded-lg font-semibold transition-colors block text-center`}>
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-900'} text-white`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Payments with Purpose?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers creating commerce that cares. Free sandbox account, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Building
            </a>
            <a href="#" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-950' : 'bg-gray-800'} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Documentation</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Getting Started</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">API Reference</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">SDKs & Libraries</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Webhooks</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Error Codes</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Code Examples</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Postman Collection</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Changelog</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">System Status</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Security</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Developer Forum</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Stack Overflow</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Support Center</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Contact Us</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">SLA</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">mykro Ecosystem</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">mykro.co - Corporate</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">mykro.giving - Foundation</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">About mykro</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Careers</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Blog</a>
              </div>
            </div>
          </div>
          <div className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-700'} pt-8 text-center text-gray-400 text-sm`}>
            <p>&copy; 2024 mykro.solutions. Part of the mykro ecosystem. Build with confidence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MykroSolutions;