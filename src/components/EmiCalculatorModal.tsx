import React, { useEffect, useState } from 'react';
import { X, Calculator, ShieldCheck } from 'lucide-react';
import { formatNaira } from '../utils/format';

interface EmiCalculatorModalProps { isOpen: boolean; onClose: () => void; initialPrice?: number }

export const EmiCalculatorModal: React.FC<EmiCalculatorModalProps> = ({ isOpen, onClose, initialPrice = 1000000000 }) => {
  const [loanAmount, setLoanAmount] = useState(Math.round(initialPrice * 0.8));
  const [interestRate, setInterestRate] = useState(18);
  const [tenureYears, setTenureYears] = useState(15);
  useEffect(() => { if (initialPrice) setLoanAmount(Math.round(initialPrice * 0.8)); }, [initialPrice, isOpen]);
  if (!isOpen) return null;
  const monthlyRate = interestRate / 12 / 100;
  const months = tenureYears * 12;
  const emi = monthlyRate ? Math.round(loanAmount * monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1)) : loanAmount / months;
  const totalPayment = emi * months;

  return <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-[#142A23] text-white p-5 flex items-center justify-between"><div className="flex items-center gap-2"><Calculator className="w-5 h-5 text-[#D4B77A]"/><h3 className="font-serif-luxury font-bold text-lg">Home finance estimate</h3></div><button type="button" onClick={onClose} aria-label="Close calculator"><X className="w-5 h-5"/></button></div>
      <div className="p-6 sm:p-8 space-y-6">
        <p className="text-sm text-gray-600">An illustrative repayment estimate in Nigerian naira. Confirm current rates and terms with your lender.</p>
        <label className="block"><span className="flex justify-between text-sm font-semibold mb-2"><span>Loan amount</span><span>{formatNaira(loanAmount)}</span></span><input className="w-full accent-[#142A23]" type="range" min="50000000" max="3000000000" step="10000000" value={loanAmount} onChange={event => setLoanAmount(Number(event.target.value))}/></label>
        <label className="block"><span className="flex justify-between text-sm font-semibold mb-2"><span>Annual interest rate</span><span>{interestRate}%</span></span><input className="w-full accent-[#142A23]" type="range" min="10" max="35" step="0.5" value={interestRate} onChange={event => setInterestRate(Number(event.target.value))}/></label>
        <label className="block"><span className="flex justify-between text-sm font-semibold mb-2"><span>Loan term</span><span>{tenureYears} years</span></span><input className="w-full accent-[#142A23]" type="range" min="1" max="30" step="1" value={tenureYears} onChange={event => setTenureYears(Number(event.target.value))}/></label>
        <div className="bg-[#F6F3EC] p-5 rounded-xl border border-gray-200 grid sm:grid-cols-3 gap-4 text-center"><div><span className="text-xs uppercase tracking-wider text-gray-500 block">Estimated monthly payment</span><strong className="block mt-2 text-lg text-[#142A23]">{formatNaira(emi)}</strong></div><div><span className="text-xs uppercase tracking-wider text-gray-500 block">Total interest</span><strong className="block mt-2 text-lg">{formatNaira(totalPayment - loanAmount)}</strong></div><div><span className="text-xs uppercase tracking-wider text-gray-500 block">Total repayment</span><strong className="block mt-2 text-lg">{formatNaira(totalPayment)}</strong></div></div>
        <div className="flex items-center justify-between text-xs text-gray-500"><span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-600"/>Illustrative estimate only</span><button type="button" onClick={onClose} className="px-4 py-2 bg-[#142A23] text-white font-semibold rounded-lg">Done</button></div>
      </div>
    </div>
  </div>;
};
