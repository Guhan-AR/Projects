import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DOMPurify from 'dompurify';

// Indian phone number regex: allows optional +91 or 0 prefix, follows by 10 digits starting with 6,7,8,9
const phoneRegex = /^(?:\+?91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

const contactSchema = z.object({
  fullName: z.string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name cannot exceed 30 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  location: z.string().min(2, "Location is required"),
  service: z.string().min(1, "Service is required"),
  message: z.string()
    .min(5, "Message must be at least 5 characters")
    .max(100, "Message cannot exceed 100 characters"),
  botField: z.string().optional() // Honeypot field
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  className?: string;
  formId?: string;
}

const services = [
  "General Inquiry",
  "Accounting & Bookkeeping",
  "GST & Tax Filing",
  "Digital Marketing (SEO/Ads)",
  "Social Media Management",
  "Web Development",
  "Poster Designing",
  "MSME Registration",
  "TDS & PF Claim"
];

export default function ContactForm({ className = "", formId }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: 'General Inquiry',
      botField: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    // 1. Honeypot check: If the hidden field is filled, silently reject the submission
    if (data.botField) {
      console.warn("Automated submission detected.");
      return; 
    }

    // 2. XSS Prevention: Sanitize the message
    const sanitizedMessage = DOMPurify.sanitize(data.message);

    setStatus('submitting');
    setErrorMessage('');

    try {
      const htmlMessage = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
            .header { background-color: #2563eb; color: #ffffff; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.025em; }
            .content { padding: 32px 40px; color: #334155; }
            .field { margin-bottom: 24px; }
            .label { font-size: 13px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
            .value { font-size: 16px; color: #0f172a; padding: 14px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
            .primary-value { font-weight: 600; color: #2563eb; font-size: 18px; }
            .grid { display: grid; gap: 12px; }
            .grid-item { border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 8px; }
            .grid-item:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
            .grid-item strong { display: inline-block; width: 100px; color: #475569; }
            .message-box { font-size: 16px; color: #0f172a; padding: 16px; background-color: #f8fafc; border-radius: 8px; white-space: pre-wrap; border-left: 4px solid #2563eb; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; line-height: 1.6; }
            .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 13px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Service Inquiry</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Service Required</div>
                <div class="value primary-value">${data.service}</div>
              </div>
              
              <div class="field">
                <div class="label">Client Details</div>
                <div class="value grid">
                  <div class="grid-item"><strong>Name:</strong> ${data.fullName}</div>
                  <div class="grid-item"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></div>
                  <div class="grid-item"><strong>Phone:</strong> ${data.phone}</div>
                  <div class="grid-item"><strong>Location:</strong> ${data.location}</div>
                </div>
              </div>

              <div class="field">
                <div class="label">Client Message</div>
                <div class="message-box">${sanitizedMessage}</div>
              </div>
            </div>
            <div class="footer">
              This is an automated notification from your website's contact form.
            </div>
          </div>
        </body>
        </html>
      `;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          location: data.location,
          service: data.service,
          message: sanitizedMessage,
          html_message: htmlMessage
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong sending the email.');
      }
      
      setStatus('success');
      reset();
    } catch (error: any) {
      console.error('Failed to send message:', error);
      setStatus('error');
      setErrorMessage(error?.message || "Failed to send message. Please try again later.");
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-20 h-20 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-slate-600">Thank you for reaching out. Our team will contact you shortly.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-brand-600 font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={className}>
      
      {/* Honeypot Field - Hidden from real users */}
      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
        <label htmlFor="botField">Leave this field empty</label>
        <input id="botField" type="text" tabIndex={-1} autoComplete="off" {...register('botField')} />
      </div>

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
          <input 
            type="text" 
            {...register('fullName')}
            className={`w-full bg-slate-50 border ${errors.fullName ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all`}
            placeholder="John Doe" 
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
          <input 
            type="email" 
            {...register('email')}
            className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all`}
            placeholder="john@example.com" 
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
          <input 
            type="text" 
            {...register('phone')}
            className={`w-full bg-slate-50 border ${errors.phone ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all`}
            placeholder="+91 00000 00000" 
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
          <input 
            type="text" 
            {...register('location')}
            className={`w-full bg-slate-50 border ${errors.location ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all`}
            placeholder="City, State" 
          />
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Service Required</label>
        <select 
          {...register('service')}
          className={`w-full bg-slate-50 border ${errors.service ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-slate-600`}
        >
          {services.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>}
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
        <textarea 
          {...register('message')}
          rows={4} 
          className={`w-full bg-slate-50 border ${errors.message ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all`}
          placeholder="Tell us about your business goals... (5-100 characters)"
        ></textarea>
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className={`w-full bg-brand-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
