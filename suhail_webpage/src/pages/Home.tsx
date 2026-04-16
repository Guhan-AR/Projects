import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="relative max-w-7xl mx-auto px-4 py-16 md:py-28 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Precision in <span className="text-brand-600">Accounting</span> & <br /> Digital Marketing for Modern Business
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Empowering businesses with professional accounting services and data-driven digital marketing.
              From financial management to online growth, AccuMark delivers solutions that help your business
              scale faster and smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/contact" className="inline-flex justify-center items-center bg-brand-600 text-white font-semibold py-4 px-8 rounded-full hover:bg-brand-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                Get Free Consultation
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 w-full mt-10 md:mt-0 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-400 to-purple-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <img src="/hero_new.png" alt="Modern corporate office" className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl ring-1 ring-slate-900/5 transform transition-transform duration-700 hover:scale-[1.02]" />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-white py-20 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16">
            <div className="md:w-1/2 w-full relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-400 to-blue-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <img src="/team_new.png" alt="Our Team Philosophy" className="relative w-full h-[400px] object-cover rounded-3xl shadow-2xl ring-1 ring-slate-900/5 filter contrast-105" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-brand-600 font-semibold tracking-wider uppercase text-lg mb-2">Our Philosophy</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">Driven by accuracy, fueled by growth.</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                We believe in empowering modern businesses through uncompromising accuracy in financial
                management and innovative strategies in digital marketing. Our dedicated support ensures that
                every client achieves sustainable and measurable growth.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-slate-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  Uncompromising Accuracy
                </li>
                <li className="flex items-center text-slate-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  Data-Driven Growth
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Services</h2>
            <p className="text-slate-600 text-lg">
              AccuMark Services offers integrated accounting and digital marketing solutions to help businesses manage
              finances and grow their online presence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Digital Marketing</h3>
              <p className="text-slate-600 mb-6">Boost your online presence and engage with your target audience through tailored strategies.</p>
              <Link to="/services" className="text-brand-600 font-semibold inline-flex items-center hover:text-brand-800 transition-colors">
                Learn more <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Accounting Services</h3>
              <p className="text-slate-600 mb-6">Streamline your finances with accurate bookkeeping, tax filing, and insightful reporting.</p>
              <Link to="/services" className="text-brand-600 font-semibold inline-flex items-center hover:text-brand-800 transition-colors">
                Learn more <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Business Consulting</h3>
              <p className="text-slate-600 mb-6">Strategic advice and operational efficiencies to scale your enterprise.</p>
              <Link to="/services" className="text-brand-600 font-semibold inline-flex items-center hover:text-brand-800 transition-colors">
                Learn more <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Other Services</h3>
              <p className="text-slate-600 mb-6">Flexible support services including Web Development, Poster Designing, TDS & PF Claims, and MSME Registration.</p>
              <Link to="/services" className="text-brand-600 font-semibold inline-flex items-center hover:text-brand-800 transition-colors">
                Learn more <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section (Dark) */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Why AccuMark <br /><span className="text-brand-400">is Different</span></h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Your one stop Solution for Accounting and Digital Marketing. We don't just provide services; we act as
                an extension of your team. Our holistic approach ensures that your marketing efforts yield high ROI
                while your financial health remains impeccable.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  Customized Solutions For Every Business
                </li>
                <li className="flex items-center gap-4 text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  Transparent Reporting & Reliable Services
                </li>
                <li className="flex items-center gap-4 text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  Expert Professional Support
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <img src="/growth.png" alt="Business Growth" className="w-full h-[400px] object-cover rounded-3xl relative z-10 shadow-2xl" />
            </div>
          </div>

          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold mb-8">Industries We Specialize In</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition uppercase tracking-wider backdrop-blur-sm">Healthcare</div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition uppercase tracking-wider backdrop-blur-sm">Food Services</div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition uppercase tracking-wider backdrop-blur-sm">Textile</div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition uppercase tracking-wider backdrop-blur-sm">Startups</div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition uppercase tracking-wider backdrop-blur-sm">Retail</div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition uppercase tracking-wider backdrop-blur-sm">Travel</div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition uppercase tracking-wider backdrop-blur-sm">Real Estate</div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto block mt-16 relative">
             <div className="absolute -top-16 -left-16 w-60 h-60 bg-brand-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
             <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
             
             <div className="relative p-10 md:p-16 rounded-[3rem] bg-slate-800/40 backdrop-blur-2xl border border-slate-700 shadow-2xl text-center">
                 <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-widest mb-6">Our Commitment</span>
                 <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-8">Why Choose <span className="text-brand-400">AccuMark?</span></h3>
                 <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto font-light mb-10">
                     AccuMark Services provides professional <span className="text-white font-semibold">bookkeeping</span>, <span className="text-white font-semibold">GST filing</span>, <span className="text-white font-semibold">SEO</span>, and
                     <span className="text-white font-semibold"> digital marketing</span> solutions designed to support business growth. Our team focuses on
                     delivering accurate financial insights and effective marketing strategies that drive real results.
                 </p>
                 <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-slate-700/50">
                     <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
                         <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></div>
                         Professional Expertise
                     </div>
                     <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
                         <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></div>
                         Data Driven Growth
                     </div>
                     <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
                         <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></div>
                         Real Results
                     </div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Ready to Get Started?</h3>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            Fill out the form below and our team will get back to you with a customized solution for your business.
          </p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 max-w-5xl mx-auto">
          <div className="p-8 md:p-16">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
