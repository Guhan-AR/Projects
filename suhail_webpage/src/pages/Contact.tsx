import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <main>
      <section id="contact" className="max-w-7xl mx-auto px-4 py-24">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="flex flex-col lg:flex-row">
            {/* Contact Info */}
            <div className="lg:w-5/12 bg-slate-900 text-white p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Let's Grow Your Business</h3>
                <p className="text-slate-300 mb-12 text-lg">
                  Have questions or need expert support? Our team is available and ready to elevate your business.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-brand-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div>
                      <p className="font-semibold text-white mb-1">Call Us</p>
                      <p className="text-slate-300">+91 99944 21537</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-brand-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2V10a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <p className="font-semibold text-white mb-1">Email Us</p>
                      <p className="text-slate-300">info@accumark.co.in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-brand-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <p className="font-semibold text-white mb-1">Office Location</p>
                      <p className="text-slate-300 leading-relaxed">
                        No-93, New Rose Garden,<br />South Ukkadam,<br />Coimbatore - 641001,<br />Tamil Nadu, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-7/12 p-12 md:p-16">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
