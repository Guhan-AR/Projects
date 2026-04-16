export default function Services() {
  return (
    <main>
      {/* Detailed Services */}
      <section id="services" className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center gap-16 mb-20">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Services</h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-4 max-w-2xl mx-auto md:mx-0">
              AccuMark Services provides professional accounting, GST compliance, and digital marketing solutions
              to support businesses in managing finances and improving online visibility.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-4 max-w-2xl mx-auto md:mx-0">
              Our services are designed to simplify business operations while helping companies grow faster and more
              efficiently by automating complex workflows and ensuring regulatory compliance.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
              We combine financial expertise with modern marketing strategies to deliver reliable solutions that
              improve business performance, customer reach, and long-term success.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <img src="/services.png" alt="Our Services Workspace" className="w-full h-[300px] object-cover rounded-3xl shadow-xl" />
          </div>
        </div>

        {/* Accounting */}
        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          Accounting & GST Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="font-bold text-lg text-slate-900 mb-2">GST Registration & Filing</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Ensure full compliance with seamless registration and timely filing services.</p>
          </div>
          <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="font-bold text-lg text-slate-900 mb-2">Book Keeping</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Accurate day-to-day financial tracking for clear visibility of your business health.</p>
          </div>
          <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="font-bold text-lg text-slate-900 mb-2">Financial Report & Analysis</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Deep-dive analytics to help you make informed strategic decisions.</p>
          </div>
          <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="font-bold text-lg text-slate-900 mb-2">Invoice, Billing & Follow-up</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Automated setup and management to maintain healthy cash flow.</p>
          </div>
          <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="font-bold text-lg text-slate-900 mb-2">Eway Bill & E-Invoice</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Streamlined digital documentation according to the latest government mandates.</p>
          </div>
        </div>

        {/* Marketing */}
        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
            </svg>
          </div>
          Digital Marketing Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="font-bold text-lg text-slate-900 mb-2">Social Media Management</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Engaging content and community management across platforms.</p>
          </div>
          <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="font-bold text-lg text-slate-900 mb-2">WhatsApp Business Mgmt</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Direct customer communication and automated flows setup.</p>
          </div>
          <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="font-bold text-lg text-slate-900 mb-2">Local SEO</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Dominate local search results and drive foot traffic to your store.</p>
          </div>
          <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="font-bold text-lg text-slate-900 mb-2">Performance Marketing</h4>
            <p className="text-sm text-slate-600 leading-relaxed">High ROAS Google Ads campaigns targeted for maximum conversion.</p>
          </div>
          <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="font-bold text-lg text-slate-900 mb-2">GBP Optimization</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Google Business Profile optimization to capture high-intent leads.</p>
          </div>
        </div>

        {/* Other Services */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            Other Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-lg text-slate-900 mb-2">Web Development</h4>
              <p className="text-sm text-slate-600 leading-relaxed">Modern, responsive, and high-performance websites built to elevate your brand's digital presence.</p>
            </div>
            <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-lg text-slate-900 mb-2">Poster Designing</h4>
              <p className="text-sm text-slate-600 leading-relaxed">Creative visual designs and branding materials that capture attention and communicate your message effectively.</p>
            </div>
            <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-lg text-slate-900 mb-2">TDS and PF Claim</h4>
              <p className="text-sm text-slate-600 leading-relaxed">Expert assistance in processing TDS filings and managing PF claims for hassle-free compliance.</p>
            </div>
            <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-lg text-slate-900 mb-2">MSME Registration</h4>
              <p className="text-sm text-slate-600 leading-relaxed">Swift and efficient Udyam registration to help your business unlock government benefits and subsidies.</p>
            </div>
          </div>
        </div>

        {/* Benefits of Choosing Us */}
        <div className="mt-32 border-t border-slate-100 pt-24">
          <div className="text-center mb-16">
            <h2 className="text-brand-600 font-semibold tracking-wider uppercase text-sm mb-2">Why Partner With Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Benefits Of Choosing AccuMark</h3>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
              We bridge the gap between reliable accounting management and result-driven digital marketing
              strategies, giving businesses a single platform to manage finances and accelerate growth. AccuMark
              Services acts as your complete business command center, helping you maintain financial clarity while
              expanding your market reach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-brand-50/40 p-8 rounded-3xl border border-brand-100/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h4 className="font-bold text-xl text-slate-900 mb-3">Holistic Growth Strategies</h4>
              <p className="text-slate-600 leading-relaxed">We align your marketing ad spends directly with your financial cash flows, ensuring every rupee invested drives measurable business expansion.</p>
            </div>
            
            <div className="bg-brand-50/40 p-8 rounded-3xl border border-brand-100/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-600 mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h4 className="font-bold text-xl text-slate-900 mb-3">100% Tax & Legal Compliance</h4>
              <p className="text-slate-600 leading-relaxed">Never worry about GST anomalies or missed bookkeeping entries. We keep your business legally sound so you can focus entirely on your core product.</p>
            </div>
            
            <div className="bg-brand-50/40 p-8 rounded-3xl border border-brand-100/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-600 mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h4 className="font-bold text-xl text-slate-900 mb-3">Transparent Reporting</h4>
              <p className="text-slate-600 leading-relaxed">Receive detailed, easy-to-understand monthly reports that present your financial runway alongside your digital marketing conversion KPIs.</p>
            </div>
            
            <div className="bg-brand-50/40 p-8 rounded-3xl border border-brand-100/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-600 mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h4 className="font-bold text-xl text-slate-900 mb-3">Industry Specialists</h4>
              <p className="text-slate-600 leading-relaxed">Our team merges certified financial expertise with advanced SEO mastery, acting as a complete in-house growth and management unit for your brand.</p>
            </div>
            
            <div className="bg-brand-50/40 p-8 rounded-3xl border border-brand-100/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-600 mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <h4 className="font-bold text-xl text-slate-900 mb-3">Customized Business Tech</h4>
              <p className="text-slate-600 leading-relaxed">We leverage state-of-the-art tools ranging from automated invoicing software to high-performing, intent-driven Google Ads funnels.</p>
            </div>
            
            <div className="bg-brand-50/40 p-8 rounded-3xl border border-brand-100/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-600 mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h4 className="font-bold text-xl text-slate-900 mb-3">Data Security & Privacy</h4>
              <p className="text-slate-600 leading-relaxed">Your sensitive financial documents and customer data are safeguarded with strict security protocols, ensuring absolute privacy.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
