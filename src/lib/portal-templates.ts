import { siteConfig } from './site-config';

export type TField = { key: string; label: string; type?: 'text' | 'textarea'; placeholder?: string };
export type TemplateDef = {
  slug: string; title: string; size: string; pageSize: string; description: string;
  fields: TField[]; defaults: Record<string, string>;
};

const company = {
  company: siteConfig.fullName,
  address: 'Nairobi, Kenya',
  email: siteConfig.email,
  phone: siteConfig.phone,
  website: 'oynamak.co.ke',
};
const companyFields: TField[] = [
  { key: 'company', label: 'Company name' }, { key: 'address', label: 'Address' },
  { key: 'email', label: 'Company email' }, { key: 'phone', label: 'Company phone' }, { key: 'website', label: 'Website' },
];

export const templates: TemplateDef[] = [
  {
    slug: 'cover-letter', title: 'Cover letter', size: 'A4', pageSize: 'A4',
    description: 'Letterhead for proposals, introductions and formal letters.',
    fields: [
      { key: 'date', label: 'Date' }, { key: 'toName', label: 'To (name)' }, { key: 'toOrg', label: 'Organisation' }, { key: 'toAddress', label: 'Address', type: 'textarea' },
      { key: 'subject', label: 'Subject' }, { key: 'salutation', label: 'Greeting' }, { key: 'body', label: 'Letter', type: 'textarea' },
      { key: 'closing', label: 'Closing' }, { key: 'fromName', label: 'Your name' }, { key: 'fromTitle', label: 'Your title' }, ...companyFields,
    ],
    defaults: { ...company, date: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }), toName: 'Name of recipient', toOrg: 'Organisation', toAddress: 'P.O. Box 00000\nNairobi', subject: 'Working together', salutation: 'Dear Sir or Madam,', body: 'Thank you for taking the time to speak with us.\n\nOynamak Sports Group helps clubs, academies, federations and brands get the kit, the training and the chances they need to win. We would love to work with you.\n\nPlease find our proposal attached. We are happy to talk it through whenever suits you.', closing: 'Yours sincerely,', fromName: 'Caroline Kariuki', fromTitle: 'Director' },
  },
  {
    slug: 'envelope', title: 'Envelope (DL)', size: '220 × 110 mm', pageSize: '220mm 110mm',
    description: 'Printed DL envelope with the return address and a recipient block.',
    fields: [{ key: 'toName', label: 'To (name)' }, { key: 'toOrg', label: 'Organisation' }, { key: 'toAddress', label: 'Address', type: 'textarea' }, ...companyFields],
    defaults: { ...company, toName: 'Name of recipient', toOrg: 'Organisation', toAddress: 'P.O. Box 00000\nNairobi' },
  },
  {
    slug: 'business-card', title: 'Business card', size: '90 × 55 mm', pageSize: '90mm 55mm',
    description: 'Front and back, ready to print for each team member.',
    fields: [{ key: 'name', label: 'Name' }, { key: 'title', label: 'Job title' }, { key: 'mobile', label: 'Mobile' }, { key: 'cardEmail', label: 'Email' }, ...companyFields.filter((f) => ['address', 'website'].includes(f.key))],
    defaults: { ...company, name: 'Caroline Kariuki', title: 'Director', mobile: siteConfig.phone, cardEmail: siteConfig.email },
  },
  {
    slug: 'compliment-slip', title: 'Compliment slip', size: '210 × 99 mm', pageSize: '210mm 99mm',
    description: 'A short note to go with kit, quotes or documents.',
    fields: [{ key: 'message', label: 'Message', type: 'textarea' }, { key: 'fromName', label: 'From' }, ...companyFields],
    defaults: { ...company, message: 'With compliments.', fromName: 'The Oynamak team' },
  },
  {
    slug: 'email-signature', title: 'Email signature', size: 'Copy and paste', pageSize: 'A4',
    description: 'A neat signature for Gmail, Outlook and Zoho Mail.',
    fields: [{ key: 'name', label: 'Name' }, { key: 'title', label: 'Job title' }, { key: 'mobile', label: 'Mobile' }, { key: 'cardEmail', label: 'Email' }, ...companyFields.filter((f) => ['website', 'address'].includes(f.key))],
    defaults: { ...company, name: 'Caroline Kariuki', title: 'Director', mobile: siteConfig.phone, cardEmail: siteConfig.email },
  },
];
