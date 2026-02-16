export type LeadService =
  | 'Investment Services'
  | 'Real Estate Services'
  | 'Consulting & Advisory'
  | 'Insurance & Pension'
  | 'Financial Planning'
  | 'Corporate Training'
  | 'Other';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Converted' | 'Lost';

export type LeadSource = 'Website' | 'Referral' | 'Event' | 'Social Media' | 'Walk-In' | 'Other';

export type Lead = {
  id: string;
  leadNumber: number;
  name: string;
  email: string;
  phone: string;
  service: LeadService;
  source: LeadSource;
  status: LeadStatus;
  message?: string;
  notes?: string;
  assignedTo?: string;
  date: string;
  lastContactDate?: string;
  estimatedValue?: number;
};

export type CustomerStatus = 'Active' | 'Inactive' | 'Suspended';

export type Customer = {
  id: string;
  customerNumber: number;
  name: string;
  email: string;
  phone: string;
  idNumber?: string;
  address?: string;
  joinDate: string;
  status: CustomerStatus;
  source: 'Lead Conversion' | 'Direct' | 'Referral';
  leadId?: string;
  assignedAdvisor?: string;
  totalPortfolioValue: number;
  portfolioItems: PortfolioItem[];
  notes?: string;
};

export type PortfolioItem = {
  id: string;
  service: 'Investments' | 'Real Estate' | 'Insurance' | 'Consulting';
  productName: string;
  status: 'Active' | 'Pending' | 'Matured' | 'Closed';
  value: number;
  startDate: string;
  maturityDate?: string;
  returns?: number;
  notes?: string;
};

export type ClientDocument = {
  id: string;
  name: string;
  type: 'Statement' | 'Contract' | 'Report' | 'KYC' | 'Other';
  uploadDate: string;
};
