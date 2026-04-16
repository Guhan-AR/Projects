export default function About() {
  return (
    <main>
      {/* About Section */}
      <section id="about" className="bg-brand-50/50 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* Company Intro Card */}
          <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl shadow-brand-100/30 mb-20 border border-brand-100/50 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-50 rounded-full opacity-50"></div>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex flex-row items-center justify-center md:justify-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  About Us
                </h3>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed text-justify">
                  AccuMark Services is a professional business solutions company that provides accounting
                  services and digital marketing solutions for startups, small businesses, and growing enterprises. Our
                  goal is to simplify financial management while helping businesses build a strong digital
                  presence. We specialize in GST filing, bookkeeping, financial reporting, SEO, social media
                  marketing, and business growth strategies. By combining financial expertise with modern digital
                  marketing techniques, we help businesses operate efficiently and attract more customers. At
                  AccuMark, we believe that every business deserves accurate financial clarity and effective
                  marketing support. Our team works closely with clients to understand their business goals and
                  provide customized solutions that improve performance and long-term growth.
                </p>
              </div>
              <div className="flex-1 w-full md:w-auto">
                <img src="/about_us_team.png" alt="AccuMark Team" className="rounded-[2rem] shadow-2xl w-full object-cover" />
              </div>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto mb-20 text-center">
            <div className="flex-1 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-lg border border-brand-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Our Vision</h3>
              <p className="text-slate-600 text-lg leading-relaxed text-justify">
                Our vision is to become a trusted partner for businesses by delivering reliable accounting and
                innovative digital marketing solutions. We aim to help companies achieve financial clarity,
                strong online presence, and sustainable business growth. AccuMark strives to support businesses
                in building a stable and successful future.
              </p>
            </div>

            <div className="flex-1 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-lg border border-brand-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Our Mission</h3>
              <p className="text-slate-600 text-lg leading-relaxed text-justify">
                Our mission is to simplify business operations through accurate accounting, GST compliance, and
                strategic digital marketing services. We focus on providing transparent financial management and
                effective marketing strategies for our clients. Our goal is to help businesses grow faster,
                smarter, and more efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Founders */}
      <section id="leadership" className="bg-slate-900 py-24 border-y border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-900 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Founders</h3>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">The visionary minds bridging the gap between sound financials and exponential growth.</p>
          </div>

          <div className="flex flex-col gap-12 max-w-5xl mx-auto">
            {/* Afsal Rahman */}
            <div className="bg-white p-8 md:p-8 rounded-[3rem] shadow-xl shadow-brand-100/50 flex flex-col md:flex-row items-center gap-12 transition-transform hover:-translate-y-1 border border-transparent hover:border-brand-100">
              <div className="flex flex-col items-center text-center w-full md:w-2/5 flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-brand-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-5xl shadow-lg font-bold mb-6 overflow-hidden">
                  <img src="/founder.jpeg" alt="Mr.Afsal Rahman KA" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-2xl text-slate-900 leading-tight">Mr.Afsal Rahman KA</h4>
                <p className="text-brand-600 font-semibold text-base mt-2">Founder & CEO</p>
              </div>
              <div className="w-full md:w-3/5 border-t md:border-t-0 md:border-l border-slate-100 pt-8 md:pt-0">
                <p className="text-slate-600 leading-relaxed text-lg text-justify">
                  Mr.Afsal Rahman is the Founder of AccuMark Services and leads the company's financial
                  management and accounting operations. With strong expertise in bookkeeping, GST compliance,
                  tax filing, and financial reporting, he helps businesses maintain accurate financial records
                  and stay compliant with regulations. His focus is on providing clear financial insights and
                  reliable accounting solutions that support better decision-making and long-term business
                  stability.
                </p>
              </div>
            </div>

            {/* Suhail Ahmed TJ */}
            <div className="bg-white p-8 md:p-8 rounded-[3rem] shadow-xl shadow-brand-100/50 flex flex-col md:flex-row items-center gap-12 transition-transform hover:-translate-y-1 border border-transparent hover:border-brand-100">
              <div className="flex flex-col items-center text-center w-full md:w-2/5 flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-white text-5xl shadow-lg font-bold mb-6 overflow-hidden">
                  <img src="/suhail.jpeg" alt="Suhail Ahmed TJ" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-2xl text-slate-900 leading-tight">Mr.Suhail Ahmed TJ</h4>
                <p className="text-brand-600 font-semibold text-base mt-2">Co-Founder & CFO</p>
              </div>
              <div className="w-full md:w-3/5 border-t md:border-t-0 md:border-l border-slate-100 pt-8 md:pt-0">
                <p className="text-slate-600 leading-relaxed text-lg text-justify">
                  Mr.Suhail Ahmed TJ is the Co-Founder of AccuMark Services and specializes in digital marketing
                  and search engine optimization (SEO). He works on building effective online strategies that
                  help businesses improve their digital presence, search visibility, and customer reach. His
                  goal is to combine data-driven marketing strategies with business growth planning to help
                  clients attract more customers and achieve measurable results online.
                </p>
              </div>
            </div>

            {/* Azarudheen TA */}
            <div className="bg-white p-8 md:p-8 rounded-[3rem] shadow-xl shadow-brand-100/50 flex flex-col md:flex-row items-center gap-12 transition-transform hover:-translate-y-1 border border-transparent hover:border-brand-100">
              <div className="flex flex-col items-center text-center w-full md:w-2/5 flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full flex items-center justify-center text-white text-5xl shadow-lg font-bold mb-6 overflow-hidden">
                  <img src="/azar.jpeg" alt="Azarudheen TA" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-2xl text-slate-900 leading-tight">Mr.Azarudheen TA</h4>
                <p className="text-brand-600 font-semibold text-base mt-2">Operational Advisor</p>
              </div>
              <div className="w-full md:w-3/5 border-t md:border-t-0 md:border-l border-slate-100 pt-8 md:pt-0">
                <p className="text-slate-600 leading-relaxed text-lg text-justify">
                  Mr. Azarudheen TA serves as the Operational Advisor, strengthening overall business
                  performance by reviewing operations, identifying inefficiencies, and recommending practical
                  improvements. Through detailed analysis of workflows, financial processes, and business
                  systems, he ensures smooth and efficient organizational functioning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Businesses Trust AccuMark */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-brand-600 font-semibold tracking-wider uppercase text-sm mb-3">Our Promise</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Businesses Trust AccuMark</h3>
            <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto text-justify">
              Businesses choose AccuMark Services because we combine financial expertise and digital marketing
              knowledge to deliver complete business solutions. Our approach focuses on accuracy, transparency,
              and measurable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            <div className="flex items-start gap-4 bg-brand-50/50 border border-brand-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition duration-300">
              <div className="w-10 h-10 flex-shrink-0 bg-brand-600 rounded-xl flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">Accurate Financial Management</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Precise bookkeeping and GST compliance you can rely on.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-brand-50/50 border border-brand-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition duration-300">
              <div className="w-10 h-10 flex-shrink-0 bg-brand-600 rounded-xl flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">Strategic Business Growth Support</h4>
                <p className="text-slate-500 text-sm leading-relaxed">SEO and digital marketing strategies that drive real, measurable results.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-brand-50/50 border border-brand-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition duration-300">
              <div className="w-10 h-10 flex-shrink-0 bg-brand-600 rounded-xl flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">Transparent and Reliable Services</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Clear reporting and honest communication at every step.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-brand-50/50 border border-brand-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition duration-300">
              <div className="w-10 h-10 flex-shrink-0 bg-brand-600 rounded-xl flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">Customized Solutions for Every Business</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Tailored services designed to fit your unique business needs and goals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
