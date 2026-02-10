export type Lead = {
  id: string;
  name: string;
  email: string;
  source: 'Website' | 'Referral' | 'Event';
  status: 'New' | 'Contacted' | 'Qualified' | 'Client';
  date: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  joinDate: string;
};

export type PortfolioItem = {
  id: string;
  service: 'Investments' | 'Real Estate' | 'Insurance' | 'Consulting';
  status: 'Active' | 'Pending' | 'Closed';
  value: number;
};

export type ClientDocument = {
  id: string;
  name:string;
  type: 'Statement' | 'Contract' | 'Report';
  uploadDate: string;
};
