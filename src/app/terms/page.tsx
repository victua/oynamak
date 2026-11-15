import { Breadcrumb } from '@/components/site/page-hero';
import { siteConfig } from '@/lib/site-config';

export const metadata = { title: 'Terms of Use | Oynamak Sports Group' };

export default function TermsPage() {
  return (
    <section className="mx-auto w-[96%] max-w-3xl pb-24 pt-6">
      <Breadcrumb trail={[{ label: 'Terms of use' }]} />
      <h1 className="mt-8 text-4xl font-bold text-primary md:text-5xl">Terms of use</h1>
      <div className="mt-6 space-y-5 text-foreground/85">
        <p>By using this website you agree to these terms. The site is run by {siteConfig.fullName}.</p>
        <h2 className="text-xl font-bold text-primary">Using the site</h2>
        <p>The information here is for general use. We try to keep it correct and up to date, but things can change.</p>
        <h2 className="text-xl font-bold text-primary">Our content</h2>
        <p>The text, logo and images on this site belong to Oynamak or its partners. Please ask before you copy or share them.</p>
        <h2 className="text-xl font-bold text-primary">Contact</h2>
        <p>Questions? Write to {siteConfig.email}.</p>
        <p className="text-sm text-muted-foreground">This is a short summary and should be reviewed by a legal adviser before launch.</p>
      </div>
    </section>
  );
}
