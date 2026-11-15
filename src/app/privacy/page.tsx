import { Breadcrumb } from '@/components/site/page-hero';
import { siteConfig } from '@/lib/site-config';

export const metadata = { title: 'Privacy Policy | Oynamak Sports Group' };

export default function PrivacyPage() {
  return (
    <section className="mx-auto w-[96%] max-w-3xl pb-24 pt-6">
      <Breadcrumb trail={[{ label: 'Privacy policy' }]} />
      <h1 className="mt-8 text-4xl font-bold text-primary md:text-5xl">Privacy policy</h1>
      <div className="mt-6 space-y-5 text-foreground/85">
        <p>{siteConfig.fullName} respects your privacy. This page explains what we collect and why.</p>
        <h2 className="text-xl font-bold text-primary">What we collect</h2>
        <p>Only what you give us: your name, phone number, email and any message you send through our forms.</p>
        <h2 className="text-xl font-bold text-primary">How we use it</h2>
        <p>We use your details to reply to you and to talk about our services. We do not sell your information.</p>
        <h2 className="text-xl font-bold text-primary">Your choices</h2>
        <p>You can ask us to see, correct or delete your details at any time. Write to {siteConfig.email}.</p>
        <p className="text-sm text-muted-foreground">This is a short summary and should be reviewed by a legal adviser before launch.</p>
      </div>
    </section>
  );
}
