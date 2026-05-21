import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      
      // Don't show if they already dismissed it this session
      const hasDismissed = sessionStorage.getItem('pwa_prompt_dismissed');
      if (!hasDismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setShowPrompt(false);
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-card border border-border rounded-2xl shadow-2xl p-5 z-[9999] flex flex-col gap-4 animate-in slide-in-from-bottom-5">
      <div className="flex items-start justify-between">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <Download className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-[15px] text-foreground">Install Roomhy App</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5 leading-tight">Install for a faster experience and 1-tap access from your home screen.</p>
          </div>
        </div>
        <button onClick={handleClose} className="text-muted-foreground hover:bg-muted p-1.5 rounded-lg transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <button 
        onClick={handleInstallClick}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-primary/20 text-[13px]"
      >
        Install Now
      </button>
    </div>
  );
}
