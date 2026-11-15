import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Breadcrumb, SectionTitle } from '@/components/site/page-hero';
import { ConsultButton } from '@/components/site/consultation';
import { siteConfig } from '@/lib/site-config';

export const metadata = { title: 'Contact | Oynamak Sports Group' };

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1685.6871596774977!2d36.761165460166744!3d-1.2865340053856902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f109996536c39%3A0x4eb6d6e1e16b4153!2siHUB!5e1!3m2!1sen!2ske!4v1771959055645!5m2!1sen!2ske';

export default function ContactPage() {
  const rows = [
    { icon: MapPin, text: siteConfig.address },
    { icon: Clock, text: siteConfig.hours },
    { icon: Mail, text: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, text: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
  ];
  return (
    <section className="mx-auto w-[96%] pb-16 pt-6 md:pb-24">
      <Breadcrumb trail={[{ label: 'Contact' }]} />
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
        <div>
          <SectionTitle>Talk to us</SectionTitle>
          <p className="mt-4 text-foreground/80">Need kit, a camp, a partnership or some advice? Call, email or leave your number and we will call you back.</p>
          <ul className="mt-8 space-y-5">
            {rows.map(({ icon: Icon, text, href }) => (
              <li key={text} className="flex items-center gap-4">
                <Icon className="h-6 w-6 text-primary" />
                {href ? <a href={href} className="text-lg hover:text-accent">{text}</a> : <span className="text-lg">{text}</span>}
              </li>
            ))}
          </ul>
          <ConsultButton className="mt-8 h-12 px-8">Book a consultation</ConsultButton>
        </div>
        <div className="overflow-hidden rounded-brand shadow-xl">
          <iframe title="Oynamak location map" src={MAP_SRC} width="100%" height="450" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </div>
    </section>
  );
}
