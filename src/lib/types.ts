export type LeadService =
  | 'Sports Products & Equipment Solutions'
  | 'Strategic Partnerships & Ecosystem Development'
  | 'International Exchange & Capacity Building'
  | 'Sports Tourism & International Hosting'
  | 'Sports Innovation & Technology Solutions'
  | 'Corporate & Institutional Advisory'
  | 'General Partnership Inquiry'
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

// --- Auth & access control ---

export type UserRole = 'admin' | 'staff' | 'client';

export type UserAccountStatus = 'Active' | 'Locked' | 'Pending Activation';

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  status: UserAccountStatus;
  createdAt?: string;
  lastLoginAt?: string;
};

// --- Blog ---

export type BlogStatus = 'Draft' | 'Published';

export type BlogPost = {
  /** URL slug; also the Firestore document id, which keeps slugs unique. */
  slug: string;
  title: string;
  excerpt: string;
  /** Plain text. Blank lines separate paragraphs. */
  body: string;
  category: string;
  author: string;
  status: BlogStatus;
  createdAt: string;
  updatedAt: string;
  /** Set the first time a post is published; retained if later unpublished. */
  publishedAt?: string;
};
