export type LeadService =
  | 'Sports Products & Equipment Solutions'
  | 'Strategic Partnerships & Ecosystem Development'
  | 'International Exchange & Capacity Building'
  | 'Sports Tourism & International Hosting'
  | 'Sports Innovation & Technology Solutions'
  | 'Corporate & Institutional Advisory'
  | 'General Partnership Inquiry'
  /** Fallback for an option the form offered but this list does not know. */
  | 'Other';

/**
 * Two states, deliberately. The portal exists to collect website enquiries and
 * show whether anyone has replied — 'New' means it still needs a reply,
 * 'Contacted' means it has been dealt with. The old six-step sales pipeline
 * (Qualified, Proposal, Converted, Lost) tracked a process nothing else in the
 * app modelled once customers and portfolios were removed.
 */
export type LeadStatus = 'New' | 'Contacted';

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
};

export type UserAccountStatus = 'Active' | 'Locked' | 'Pending Activation';

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
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
