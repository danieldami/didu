import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Clock, Send, CheckCircle2, Landmark, Compass } from 'lucide-react';
import { saveFirestoreLead } from '../services/firebaseService';
import { LeadSubmission } from '../utils/security';

export const ContactScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Luxury Property Search');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    const contactLead: LeadSubmission = {
      id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
      propertyId: 'contact-desk',
      propertyTitle: service ? `Concierge: ${service}` : 'Concierge Desk Inquiry',
      buyerName: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      preferredTime: message ? `Notes: ${message.slice(0, 80)}` : 'General Contact Desk Form',
      timestamp: new Date().toLocaleString()
    };

    await saveFirestoreLead(contactLead);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="bg-brand-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-brand-primary" />
            <span>Private Concierge Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-brand-primary">
            Connect With Our Lagos Advisory
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Schedule a confidential consultation, request a private architectural chauffeur tour, or discuss bespoke estate acquisitions in Lagos.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Col: Contact Info & Direct Concierge Desk (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-brand-primary text-white p-6 sm:p-8 rounded-2xl border border-brand-primary-light shadow-lg space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-brand-primary-light">
                <div className="w-10 h-10 rounded-lg bg-brand-accent-soft flex items-center justify-center text-brand-primary">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-brand-title font-bold text-lg text-white">Chubank Property</h3>
                  <span className="text-xs text-brand-accent-soft">Private residential property advisory</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                <MapPin className="w-5 h-5 text-brand-accent shrink-0" />
                <span>4 Uwajeh Lane, Ikoyi, Lagos</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Co-Owner Direct Lines:</strong>
                    <div className="flex flex-col gap-1 mt-1">
                      <a href="tel:+2348035550148" className="text-gray-300 hover:text-white underline">
                        Amara Okafor (+234 803 555 0148)
                      </a>
                      <a href="tel:+2348095550182" className="text-gray-300 hover:text-white underline">
                        Tunde Adebayo (+234 809 555 0182)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Confidential Desk:</strong>
                    <a href="mailto:hello@chubankhomes.com" className="text-gray-300 hover:text-white underline">
                      hello@chubankhomes.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Advisory Hours:</strong>
                    <span className="text-gray-300">
                      By appointment, Monday to Saturday (WAT)<br />
                      Private viewings arranged on request
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-primary-light">
                <a
                  href="mailto:hello@chubankhomes.com?subject=Private%20property%20consultation"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Email our property desk</span>
                </a>
              </div>
            </div>

            {/* Clear Title Advisory Guarantee */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs text-xs text-gray-600 space-y-1">
              <span className="font-bold text-brand-primary block">A considered property search</span>
              <p>Our team can help you arrange a viewing and connect with the relevant property representative.</p>
            </div>

          </div>

          {/* Right Col: Consultation Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/80 shadow-md">
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-brand-primary mb-2">
                Book a Private Consultation
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-6">
                Tell us what you are looking for and we will help you plan the next step.
              </p>

              {sent ? (
                <div className="p-8 bg-emerald-50 text-emerald-900 rounded-xl text-center border border-emerald-200 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-serif-luxury font-bold">Thank you for your interest</h3>
                  <p className="text-xs text-emerald-800">
                    This demo keeps your request in this browser. Email hello@chubankhomes.com to reach the property team.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Seth Shanti Prasad"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 803 555 0148"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="vip@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Inquiry Purpose</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-primary"
                      >
                        <option value="Luxury Property Search">Buying a Luxury Villa / Home</option>
                        <option value="Post Property Listing">Selling / Leasing My Estate</option>
                        <option value="Chauffeur Site Visit">Booking a Private Site Tour</option>
                        <option value="Legal & Title Check">Clear Legal Title & Registry Check</option>
                        <option value="NRI Advisory">NRI Investment Portfolio</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Specific Requirements / Message</label>
                    <textarea
                      rows={3}
                      placeholder="Please mention preferred Lagos localities (e.g. Ikoyi Rd, Victoria Island), budget, or questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-contact-form-btn"
                    className="w-full py-3 bg-brand-primary hover:bg-brand-primary-light text-white rounded-lg font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Consultation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
