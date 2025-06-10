import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: "Os produtos são originais?",
      answer: "Todos os produtos são testados rigorosamente antes de serem selecionados."
    },
    {
      question: "Tem seguro?",
      answer: "Ao confirmar a compra, um contrato é enviado no seu WhatsApp ou email para assinatura. Esse contrato protege indefinidamente ambos os lados."
    },
    {
      question: "Quantos dias a entrega?",
      answer: "Para a região do Triangulo Mineiro, 1 a 2 dias úteis. Demais localidades, de 3 a 15 dias úteis."
    }
  ];

  return (
    <div className="faq-section py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">Perguntas Frequentes</h2>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                  <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus-visible:ring focus-visible:ring-[#ff6100] focus-visible:ring-opacity-75">
                    <span className="text-lg font-medium text-white">{item.question}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 text-[#ff6100] transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Disclosure.Button>
                  
                  <Transition
                    enter="transition duration-300 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-200 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-6 py-4 text-gray-300 bg-gray-800 border-t border-gray-700">
                      {item.answer}
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
