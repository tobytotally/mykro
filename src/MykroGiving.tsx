import React from 'react';
import { useDocumentTitle } from './shared/hooks/useDocumentTitle';

const MykroGiving: React.FC = () => {
  useDocumentTitle('mykro.giving');
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="bg-gray-900 text-white py-2">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm">
            <span>Part of the mykro ecosystem</span>
            <div className="space-x-6">
              <a href="/mykro" className="hover:text-gray-300 transition-colors">mykro.co</a>
              <a href="/mykro/giving" className="font-semibold">mykro.giving</a>
              <a href="/mykro/solutions" className="hover:text-gray-300 transition-colors">mykro.solutions</a>
            </div>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/mykro/giving" className="text-2xl font-bold text-gray-900">mykro.giving</a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#impact" className="text-gray-700 hover:text-green-600 transition-colors">Our Impact</a>
            <a href="#charities" className="text-gray-700 hover:text-green-600 transition-colors">Charities</a>
            <a href="#stories" className="text-gray-700 hover:text-green-600 transition-colors">Stories</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
            <a href="#donate" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">Donate Now</a>
          </div>
        </nav>
      </div>


      {/* Hero Section */}
      <section className="relative bg-gray-900 min-h-screen flex items-center mt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/knowledge/images/website/pexels-julia-m-cameron-6994963.jpg" 
            alt="Children learning"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Small Change Creates <span className="text-green-400">Big Smiles</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Your spare change becomes life-changing moments. See the smiles you create, the futures you build, the lives you transform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#stories" className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-all hover:scale-105 text-center">
                See Their Stories
              </a>
              <a href="#impact" className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all text-center">
                View Your Impact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Counter */}
      <section className="py-20 bg-white" id="impact">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Lives Changed Forever</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Behind every number is a name, a story, a future made brighter</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">12,847</div>
              <div className="text-gray-800 font-medium text-lg">Children in School</div>
              <div className="text-gray-500 text-sm mt-1">Learning, growing, dreaming</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">8,392</div>
              <div className="text-gray-800 font-medium text-lg">Families Fed</div>
              <div className="text-gray-500 text-sm mt-1">No more hungry nights</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">3,756</div>
              <div className="text-gray-800 font-medium text-lg">Medical Treatments</div>
              <div className="text-gray-500 text-sm mt-1">Health restored, hope renewed</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">156</div>
              <div className="text-gray-800 font-medium text-lg">Communities Thriving</div>
              <div className="text-gray-500 text-sm mt-1">Sustainable change, lasting impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 bg-gray-50" id="stories">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stories of Change</h2>
            <p className="text-xl text-gray-600">Every donation tells a story. Every transaction creates impact.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/knowledge/images/website/MSF223413.png" 
                  alt="Children in classroom"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3">Education</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Amara's Dream Came True</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">"I never thought I'd learn to read. Now I'm teaching my little sister!" Thanks to you, Amara and 500 other children in Kenya now attend school every day.</p>
                <a href="#" className="text-green-600 font-semibold hover:text-green-700 flex items-center group">
                  Read Amara's full story
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/knowledge/images/website/pexels-julia-m-cameron-6995106.jpg" 
                  alt="Healthcare worker with child"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">Healthcare</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Baby Sarah's Second Chance</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">Born premature, Sarah needed urgent care. Your contributions brought a mobile clinic to her village just in time. Today, she's a healthy, giggling one-year-old.</p>
                <a href="#" className="text-green-600 font-semibold hover:text-green-700 flex items-center group">
                  See Sarah today
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/knowledge/images/website/MSB237597.png" 
                  alt="Community working together"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium mb-3">Community</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Maria's Village Transformed</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">Clean water changed everything. Children no longer miss school due to waterborne illness. Mothers have time to work. An entire village thrives.</p>
                <a href="#" className="text-green-600 font-semibold hover:text-green-700 flex items-center group">
                  Visit Maria's village
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Impact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">See the Joy You Create</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Every penny counts. Every donation has a face. Every contribution writes a story of hope.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Track Your Impact</h3>
                    <p className="text-gray-600">See exactly where your donations go and the lives they touch</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Connect with Recipients</h3>
                    <p className="text-gray-600">Receive updates and messages from the communities you help</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Celebrate Milestones</h3>
                    <p className="text-gray-600">Be part of the celebration when goals are reached</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/knowledge/images/website/pexels-b-aristotle-guweh-jr-1643208950-32230250.jpg" 
                alt="Happy children"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
                <p className="text-gray-800 font-medium italic">"Thank you for giving me hope for my children's future"</p>
                <p className="text-gray-600 text-sm mt-2">- Fatima, mother of three</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">Voices of Hope</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                  <img src="/knowledge/images/website/MSF311836.png" alt="Sarah" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Sarah M.</h4>
                  <p className="text-gray-600 text-sm">Monthly Donor</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"I used to feel helpless seeing poverty. Now, every coffee I buy helps educate a child. It's amazing how small actions create big changes."</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                  <img src="/knowledge/images/website/MSB179934.png" alt="James" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">James K.</h4>
                  <p className="text-gray-600 text-sm">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"Our customers love that their purchases make a difference. Sales are up, and we're helping build schools. It's a win for everyone."</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                  <img src="/knowledge/images/website/MSF134502.png" alt="Amina" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Amina R.</h4>
                  <p className="text-gray-600 text-sm">Teacher, Kenya</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"The new school built with your donations changed our village. My students now dream of becoming doctors and engineers. Thank you!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">Moments of Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <img src="/knowledge/images/website/pexels-kublackphotography-10858387.jpg" alt="Community celebration" className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
            </div>
            <div>
              <img src="/knowledge/images/website/MSB73391.png" alt="Child smiling" className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
            </div>
            <div>
              <img src="/knowledge/images/website/MSF44570.png" alt="Learning together" className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
            </div>
            <div>
              <img src="/knowledge/images/website/MSB239080.png" alt="Healthcare in action" className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
            </div>
            <div>
              <img src="/knowledge/images/website/MSB194686.png" alt="Clean water access" className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Be Part of Their Story</h2>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
            Your spare change is someone's answered prayer. Start transforming lives today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="bg-white text-green-700 px-10 py-5 rounded-lg font-bold text-lg hover:bg-green-50 transition-all hover:scale-105">
              Start Changing Lives
            </a>
            <a href="#stories" className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white hover:text-green-700 transition-all">
              Read More Stories
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">For Donors</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">How It Works</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Browse Charities</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Impact Reports</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Tax Benefits</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Charities</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Partner With Us</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Success Stories</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Resources</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Apply Now</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Our Mission</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Transparency</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Annual Report</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Contact Us</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">mykro Ecosystem</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">mykro.co - Corporate</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">mykro.solutions - Developers</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Careers at mykro</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Press & Media</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 mykro.giving. Part of the mykro ecosystem. Registered charity number 1234567.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default MykroGiving;