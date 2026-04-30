import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-6 animate-in fade-in" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          {typeof title === 'string' ? <h2 className="text-xl font-bold text-slate-900">{title}</h2> : title}
          <button 
            onClick={onClose} 
            aria-label="Close modal"
            className="bg-slate-50 border-none w-10 h-10 rounded-xl flex items-center justify-center text-2xl text-slate-400 cursor-pointer transition-all hover:bg-slate-100 hover:text-slate-900 hover:rotate-90"
          >
            &times;
          </button>
        </header>
        
        <main className="p-6">
          {children}
        </main>

        {footer && (
          <footer className="p-5 px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    modalRoot
  );
};