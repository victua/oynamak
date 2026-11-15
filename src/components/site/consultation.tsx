'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { SportsArt } from './sports-art';

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useConsultation = () => useContext(Ctx);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [agree, setAgree] = useState(true);

  const onOpenChange = (v: boolean) => {
    setIsOpen(v);
    if (!v) setTimeout(() => setSent(false), 200);
  };

  return (
    <Ctx.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl overflow-hidden border-0 p-0 sm:rounded-2xl">
          {sent ? (
            <div className="flex flex-col items-center px-8 py-16 text-center">
              <CheckCircle2 className="mb-4 h-14 w-14 text-accent" />
              <DialogTitle className="text-2xl font-bold text-primary">We will call you back shortly</DialogTitle>
              <DialogDescription className="mt-2">An Oynamak advisor will contact you within 24 hours.</DialogDescription>
              <Button className="mt-8 px-8" onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2">
              <form
                className="space-y-4 p-8 md:p-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <DialogTitle className="text-2xl font-bold text-primary">Book a consultation</DialogTitle>
                <DialogDescription className="sr-only">Leave your details and we will call you back.</DialogDescription>
                <div className="space-y-1.5">
                  <label htmlFor="c-name" className="text-sm font-medium">Your name</label>
                  <Input id="c-name" required placeholder="Your name" className="h-12 px-5" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="c-phone" className="text-sm font-medium">Phone</label>
                  <Input id="c-phone" required type="tel" placeholder="+254 7__ ___ ___" className="h-12 px-5" />
                </div>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} />
                  I agree to the privacy policy
                </label>
                <Button type="submit" disabled={!agree} size="lg" className="h-12 w-full">Send</Button>
              </form>
              <div className="relative hidden min-h-[360px] md:block">
                <SportsArt kind="team" className="absolute inset-0" />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}

export function ConsultButton({ children = 'Book a consultation', ...props }: ButtonProps) {
  const { open } = useConsultation();
  return (
    <Button onClick={open} {...props}>
      {children}
    </Button>
  );
}
