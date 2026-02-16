import type { Lead, Customer } from './types';

// ===== TEAM =====
export interface StaffMember {
    id: string; name: string; role: string; email: string; phone: string; avatar: string; initials: string;
    department: string; joinDate: string; status: 'Active' | 'On Leave' | 'Deactivated';
    permissions: string[]; lastActive: string; activityLog: { action: string; date: string; target: string }[];
}

export const staffMembers: StaffMember[] = [
    {
        id: 'stf-001', name: 'Mumbi Mbiyu', role: 'Managing Director', email: 'mumbi@oaktreefsg.co.ke', phone: '+254 722 100 001', avatar: 'https://picsum.photos/seed/mumbi/100/100', initials: 'MM', department: 'Executive', joinDate: '2020-01-15', status: 'Active', permissions: ['admin', 'finance', 'portfolio', 'staff', 'marketing', 'cms', 'leads', 'customers', 'events', 'users'], lastActive: '2026-02-12T17:45:00Z', activityLog: [
            { action: 'Approved commission payout', date: '2026-02-12T17:30:00Z', target: 'KES 145,000 to Collet' },
            { action: 'Reviewed portfolio report', date: '2026-02-12T14:00:00Z', target: 'Q4 2025 AUM Report' },
            { action: 'Updated firm KPIs', date: '2026-02-11T09:00:00Z', target: 'Monthly Revenue Target' },
        ]
    },
    {
        id: 'stf-002', name: 'Alexandria Kimathi', role: 'Marketing & Communications', email: 'alexandria@oaktreefsg.co.ke', phone: '+254 722 100 002', avatar: 'https://picsum.photos/seed/alex/100/100', initials: 'AK', department: 'Marketing', joinDate: '2021-03-01', status: 'Active', permissions: ['marketing', 'cms', 'leads', 'events'], lastActive: '2026-02-12T16:20:00Z', activityLog: [
            { action: 'Published blog post', date: '2026-02-12T15:00:00Z', target: '5 Investment Tips for 2026' },
            { action: 'Scheduled email campaign', date: '2026-02-12T11:00:00Z', target: 'February Newsletter' },
            { action: 'Reviewed lead form submission', date: '2026-02-11T14:00:00Z', target: 'Wanjiku Muthoni' },
        ]
    },
    {
        id: 'stf-003', name: 'Debbie Wanjala', role: 'Compliance & Operations', email: 'debbie@oaktreefsg.co.ke', phone: '+254 722 100 003', avatar: 'https://picsum.photos/seed/debbie/100/100', initials: 'DW', department: 'Operations', joinDate: '2021-06-15', status: 'Active', permissions: ['customers', 'finance', 'leads'], lastActive: '2026-02-12T17:00:00Z', activityLog: [
            { action: 'Verified KYC documents', date: '2026-02-12T16:30:00Z', target: 'Catherine Wambui' },
            { action: 'Confirmed deposit receipt', date: '2026-02-12T10:00:00Z', target: 'KES 2,000,000 from James Kipchumba' },
            { action: 'Issued service invoice', date: '2026-02-11T11:00:00Z', target: 'INV-2026-034' },
        ]
    },
    {
        id: 'stf-004', name: 'Collet Adhiambo', role: 'Business Development', email: 'collet@oaktreefsg.co.ke', phone: '+254 722 100 004', avatar: 'https://picsum.photos/seed/collet/100/100', initials: 'CA', department: 'Sales', joinDate: '2022-01-10', status: 'Active', permissions: ['leads', 'customers', 'events'], lastActive: '2026-02-12T17:15:00Z', activityLog: [
            { action: 'Converted lead to customer', date: '2026-02-12T16:00:00Z', target: 'David Njeru' },
            { action: 'Followed up with lead', date: '2026-02-12T11:30:00Z', target: 'Amina Hassan' },
            { action: 'Registered attendee', date: '2026-02-11T15:00:00Z', target: 'Wealth Workshop - Fatuma Abdi' },
        ]
    },
    {
        id: 'stf-005', name: 'Denzel Omondi', role: 'Portfolio & Investment Analyst', email: 'denzel@oaktreefsg.co.ke', phone: '+254 722 100 005', avatar: 'https://picsum.photos/seed/denzel/100/100', initials: 'DO', department: 'Investments', joinDate: '2022-04-01', status: 'Active', permissions: ['portfolio', 'customers', 'finance'], lastActive: '2026-02-12T17:40:00Z', activityLog: [
            { action: 'Updated fund performance', date: '2026-02-12T17:30:00Z', target: 'Equity Portfolio — +18.3% YTD' },
            { action: 'Generated client statement', date: '2026-02-12T14:00:00Z', target: 'Lucy Nyokabi Q4 Statement' },
            { action: 'Rebalanced allocation', date: '2026-02-11T10:00:00Z', target: 'Catherine Wambui — Balanced Fund' },
        ]
    },
];

// ===== LEADS =====
export const mockLeads: Lead[] = [
    { id: 'ld-001', leadNumber: 1, name: 'Wanjiku Muthoni', email: 'wanjiku.m@gmail.com', phone: '+254 712 345 678', service: 'Investment Services', source: 'Website', status: 'New', message: 'Interested in unit trusts and money market funds for my savings.', date: '2026-02-12T08:30:00Z', estimatedValue: 500000 },
    { id: 'ld-002', leadNumber: 2, name: 'Kevin Odhiambo', email: 'kevin.odh@yahoo.com', phone: '+254 722 987 654', service: 'Real Estate Services', source: 'Referral', status: 'Contacted', message: 'Looking for residential property in Karen & Runda area.', date: '2026-02-11T14:15:00Z', estimatedValue: 15000000, assignedTo: 'Mumbi Mbiyu', lastContactDate: '2026-02-11T16:00:00Z' },
    { id: 'ld-003', leadNumber: 3, name: 'Amina Hassan', email: 'amina.h@outlook.com', phone: '+254 733 456 789', service: 'Insurance & Pension', source: 'Event', status: 'Qualified', message: 'Needs comprehensive family insurance cover and retirement plan.', date: '2026-02-10T10:00:00Z', estimatedValue: 2400000, assignedTo: 'John Kamau', lastContactDate: '2026-02-11T09:00:00Z', notes: 'Very interested. Has a family of 5. Scheduled a follow-up call for Friday.' },
    { id: 'ld-004', leadNumber: 4, name: 'Brian Kipchoge', email: 'brian.k@gmail.com', phone: '+254 710 111 222', service: 'Financial Planning', source: 'Social Media', status: 'New', message: 'Want to start saving for my children\'s education.', date: '2026-02-10T07:45:00Z', estimatedValue: 1200000 },
    { id: 'ld-005', leadNumber: 5, name: 'Grace Akinyi', email: 'grace.a@company.co.ke', phone: '+254 720 333 444', service: 'Corporate Training', source: 'Website', status: 'Proposal', message: 'Company interested in financial wellness program for 200 employees.', date: '2026-02-09T13:20:00Z', estimatedValue: 3500000, assignedTo: 'Sarah Njoroge', lastContactDate: '2026-02-10T11:00:00Z', notes: 'Sent proposal for Q2 training program. Awaiting board approval.' },
    { id: 'ld-006', leadNumber: 6, name: 'David Njeru', email: 'david.njeru@gmail.com', phone: '+254 711 555 666', service: 'Consulting & Advisory', source: 'Walk-In', status: 'Converted', message: 'SME owner needs help with business financial strategy.', date: '2026-02-08T09:00:00Z', estimatedValue: 800000, assignedTo: 'Mumbi Mbiyu', lastContactDate: '2026-02-09T15:30:00Z', notes: 'Successfully converted to customer.' },
    { id: 'ld-007', leadNumber: 7, name: 'Fatuma Abdi', email: 'fatuma.a@hotmail.com', phone: '+254 723 777 888', service: 'Investment Services', source: 'Referral', status: 'Contacted', message: 'Diaspora investor looking for Kenya real estate and bonds.', date: '2026-02-07T16:30:00Z', estimatedValue: 8000000, assignedTo: 'John Kamau' },
    { id: 'ld-008', leadNumber: 8, name: 'Peter Wainaina', email: 'peter.w@techstartup.co.ke', phone: '+254 700 999 000', service: 'Insurance & Pension', source: 'Website', status: 'Lost', message: 'Needed group pension scheme. Found cheaper alternative.', date: '2026-02-06T11:00:00Z', estimatedValue: 1500000, notes: 'Lost to competitor. Price was the main factor.' },
];

// ===== CUSTOMERS =====
export const mockCustomers: Customer[] = [
    {
        id: 'cst-001', customerNumber: 1, name: 'David Njeru', email: 'david.njeru@gmail.com', phone: '+254 711 555 666', idNumber: '28456789', address: 'Westlands, Nairobi', joinDate: '2026-02-09T00:00:00Z', status: 'Active', source: 'Lead Conversion', leadId: 'ld-006', assignedAdvisor: 'Mumbi Mbiyu', totalPortfolioValue: 2500000, notes: 'SME owner. Advisory retainer client.', portfolioItems: [
            { id: 'pf-001', service: 'Consulting', productName: 'Business Strategy Retainer', status: 'Active', value: 800000, startDate: '2026-02-09', notes: 'Monthly advisory sessions' },
            { id: 'pf-002', service: 'Investments', productName: 'Money Market Fund', status: 'Active', value: 1200000, startDate: '2026-02-10', returns: 12.5 },
            { id: 'pf-003', service: 'Insurance', productName: 'Business Insurance Cover', status: 'Pending', value: 500000, startDate: '2026-02-12' },
        ]
    },
    {
        id: 'cst-002', customerNumber: 2, name: 'Catherine Wambui', email: 'cathy.w@gmail.com', phone: '+254 722 111 333', idNumber: '31234567', address: 'Karen, Nairobi', joinDate: '2025-11-15T00:00:00Z', status: 'Active', source: 'Direct', assignedAdvisor: 'John Kamau', totalPortfolioValue: 18500000, notes: 'High-net-worth individual. Family wealth planning.', portfolioItems: [
            { id: 'pf-004', service: 'Investments', productName: 'Equity Portfolio', status: 'Active', value: 8000000, startDate: '2025-11-20', returns: 18.3 },
            { id: 'pf-005', service: 'Real Estate', productName: 'Runda Residential Property', status: 'Active', value: 7500000, startDate: '2025-12-01' },
            { id: 'pf-006', service: 'Insurance', productName: 'Family Health Cover', status: 'Active', value: 1200000, startDate: '2025-11-20' },
            { id: 'pf-007', service: 'Investments', productName: 'Government Bonds (Infrastructure)', status: 'Active', value: 1800000, startDate: '2026-01-05', returns: 14.0, maturityDate: '2031-01-05' },
        ]
    },
    {
        id: 'cst-003', customerNumber: 3, name: 'James Kipchumba', email: 'james.kip@gmail.com', phone: '+254 733 222 444', idNumber: '25789012', address: 'Eldoret', joinDate: '2026-01-20T00:00:00Z', status: 'Active', source: 'Referral', assignedAdvisor: 'Sarah Njoroge', totalPortfolioValue: 4200000, portfolioItems: [
            { id: 'pf-008', service: 'Investments', productName: 'Treasury Bills', status: 'Active', value: 2000000, startDate: '2026-01-25', returns: 16.0, maturityDate: '2026-07-25' },
            { id: 'pf-009', service: 'Insurance', productName: 'Education Savings Plan', status: 'Active', value: 1000000, startDate: '2026-01-25', maturityDate: '2034-01-25' },
            { id: 'pf-010', service: 'Real Estate', productName: 'Nanyuki Land (5 Acres)', status: 'Pending', value: 1200000, startDate: '2026-02-01' },
        ]
    },
    {
        id: 'cst-004', customerNumber: 4, name: 'Lucy Nyokabi', email: 'lucy.n@outlook.com', phone: '+254 710 555 777', idNumber: '30456123', address: 'Kileleshwa, Nairobi', joinDate: '2025-09-01T00:00:00Z', status: 'Active', source: 'Direct', assignedAdvisor: 'Mumbi Mbiyu', totalPortfolioValue: 6800000, portfolioItems: [
            { id: 'pf-011', service: 'Investments', productName: 'Balanced Fund', status: 'Active', value: 3500000, startDate: '2025-09-10', returns: 15.2 },
            { id: 'pf-012', service: 'Insurance', productName: 'Retirement Annuity', status: 'Active', value: 2000000, startDate: '2025-09-15', maturityDate: '2040-09-15' },
            { id: 'pf-013', service: 'Consulting', productName: 'Estate Planning', status: 'Active', value: 300000, startDate: '2025-10-01' },
            { id: 'pf-014', service: 'Insurance', productName: 'Life Cover', status: 'Active', value: 1000000, startDate: '2025-09-15' },
        ]
    },
    {
        id: 'cst-005', customerNumber: 5, name: 'Hassan Ali', email: 'hassan.a@mombasa.co.ke', phone: '+254 720 888 999', address: 'Nyali, Mombasa', joinDate: '2026-01-05T00:00:00Z', status: 'Inactive', source: 'Lead Conversion', assignedAdvisor: 'John Kamau', totalPortfolioValue: 950000, notes: 'Relocated abroad temporarily.', portfolioItems: [
            { id: 'pf-015', service: 'Investments', productName: 'Fixed Deposit', status: 'Matured', value: 500000, startDate: '2026-01-10', returns: 11.5, maturityDate: '2026-07-10' },
            { id: 'pf-016', service: 'Insurance', productName: 'Motor Insurance', status: 'Active', value: 450000, startDate: '2026-01-10' },
        ]
    },
];

// ===== FINANCE =====
export interface Transaction {
    id: string; date: string; type: 'Deposit' | 'Withdrawal' | 'Fee' | 'Commission' | 'Invoice';
    description: string; amount: number; customer?: string; status: 'Completed' | 'Pending' | 'Failed';
    reference: string;
}

export const mockTransactions: Transaction[] = [
    { id: 'txn-001', date: '2026-02-12T10:00:00Z', type: 'Deposit', description: 'Investment deposit — Money Market Fund', amount: 2000000, customer: 'James Kipchumba', status: 'Completed', reference: 'DEP-2026-078' },
    { id: 'txn-002', date: '2026-02-12T09:00:00Z', type: 'Fee', description: 'Advisory retainer — February 2026', amount: 50000, customer: 'David Njeru', status: 'Completed', reference: 'INV-2026-035' },
    { id: 'txn-003', date: '2026-02-11T14:00:00Z', type: 'Commission', description: 'Commission on Equity Portfolio', amount: 145000, customer: 'Catherine Wambui', status: 'Completed', reference: 'COM-2026-012' },
    { id: 'txn-004', date: '2026-02-11T11:00:00Z', type: 'Invoice', description: 'Estate planning consultation fee', amount: 75000, customer: 'Lucy Nyokabi', status: 'Pending', reference: 'INV-2026-034' },
    { id: 'txn-005', date: '2026-02-10T15:00:00Z', type: 'Deposit', description: 'Insurance premium — Retirement Annuity', amount: 500000, customer: 'Lucy Nyokabi', status: 'Completed', reference: 'DEP-2026-077' },
    { id: 'txn-006', date: '2026-02-10T10:00:00Z', type: 'Deposit', description: 'Property purchase deposit', amount: 3000000, customer: 'Catherine Wambui', status: 'Completed', reference: 'DEP-2026-076' },
    { id: 'txn-007', date: '2026-02-09T09:00:00Z', type: 'Fee', description: 'Portfolio management fee — Q1', amount: 120000, customer: 'Catherine Wambui', status: 'Completed', reference: 'INV-2026-033' },
    { id: 'txn-008', date: '2026-02-08T16:00:00Z', type: 'Commission', description: 'Insurance placement commission', amount: 35000, customer: 'David Njeru', status: 'Pending', reference: 'COM-2026-011' },
    { id: 'txn-009', date: '2026-02-07T12:00:00Z', type: 'Withdrawal', description: 'Matured fixed deposit payout', amount: 556000, customer: 'Hassan Ali', status: 'Completed', reference: 'WDR-2026-005' },
    { id: 'txn-010', date: '2026-02-06T14:00:00Z', type: 'Deposit', description: 'Government Bond subscription', amount: 1800000, customer: 'Catherine Wambui', status: 'Completed', reference: 'DEP-2026-075' },
];

// ===== EVENTS =====
export interface OaktreeEvent {
    id: string; title: string; type: 'Seminar' | 'Webinar' | 'Workshop' | 'Client Dinner';
    date: string; time: string; venue: string; description: string; capacity: number;
    registrations: number; attendees: number; status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
    registeredContacts: { name: string; email: string; phone: string; attended: boolean; isLead: boolean }[];
}

export const mockEvents: OaktreeEvent[] = [
    {
        id: 'evt-001', title: 'Wealth Building in 2026', type: 'Seminar', date: '2026-03-15', time: '09:00 AM - 1:00 PM', venue: 'The Hub Karen, Nairobi', description: 'An interactive seminar on investment strategies for the new year, covering bonds, equities and real estate.', capacity: 75, registrations: 48, attendees: 0, status: 'Upcoming', registeredContacts: [
            { name: 'Wanjiku Muthoni', email: 'wanjiku.m@gmail.com', phone: '+254 712 345 678', attended: false, isLead: true },
            { name: 'Brian Kipchoge', email: 'brian.k@gmail.com', phone: '+254 710 111 222', attended: false, isLead: true },
            { name: 'Jane Mwangi', email: 'jane.mw@gmail.com', phone: '+254 711 222 333', attended: false, isLead: false },
        ]
    },
    {
        id: 'evt-002', title: 'Insurance 101: Protecting Your Family', type: 'Webinar', date: '2026-02-28', time: '2:00 PM - 4:00 PM', venue: 'Online (Zoom)', description: 'A beginner-friendly webinar on the different types of insurance covers available for Kenyan families.', capacity: 200, registrations: 134, attendees: 0, status: 'Upcoming', registeredContacts: [
            { name: 'Amina Hassan', email: 'amina.h@outlook.com', phone: '+254 733 456 789', attended: false, isLead: true },
            { name: 'Fatuma Abdi', email: 'fatuma.a@hotmail.com', phone: '+254 723 777 888', attended: false, isLead: true },
        ]
    },
    {
        id: 'evt-003', title: 'Q4 Client Appreciation Dinner', type: 'Client Dinner', date: '2026-01-25', time: '6:30 PM - 10:00 PM', venue: 'Sarova Stanley, Nairobi', description: 'An evening to celebrate our clients and share our 2025 performance highlights.', capacity: 40, registrations: 38, attendees: 35, status: 'Completed', registeredContacts: [
            { name: 'Catherine Wambui', email: 'cathy.w@gmail.com', phone: '+254 722 111 333', attended: true, isLead: false },
            { name: 'Lucy Nyokabi', email: 'lucy.n@outlook.com', phone: '+254 710 555 777', attended: true, isLead: false },
            { name: 'David Njeru', email: 'david.njeru@gmail.com', phone: '+254 711 555 666', attended: true, isLead: false },
        ]
    },
    {
        id: 'evt-004', title: 'Real Estate Investment Workshop', type: 'Workshop', date: '2026-01-10', time: '10:00 AM - 3:00 PM', venue: 'The Hub Karen, Nairobi', description: 'Hands-on workshop covering property valuation, financing, and portfolio diversification with real estate.', capacity: 30, registrations: 30, attendees: 27, status: 'Completed', registeredContacts: [
            { name: 'Kevin Odhiambo', email: 'kevin.odh@yahoo.com', phone: '+254 722 987 654', attended: true, isLead: true },
            { name: 'Grace Akinyi', email: 'grace.a@company.co.ke', phone: '+254 720 333 444', attended: false, isLead: true },
        ]
    },
];

// ===== MARKETING =====
export interface Campaign {
    id: string; name: string; type: 'Email' | 'Social Media' | 'Content' | 'Paid Ads';
    status: 'Active' | 'Scheduled' | 'Completed' | 'Draft';
    startDate: string; endDate?: string; budget: number; spent: number;
    leads: number; clicks: number; impressions: number; conversions: number; channel: string;
}

export const mockCampaigns: Campaign[] = [
    { id: 'cmp-001', name: 'February Newsletter', type: 'Email', status: 'Active', startDate: '2026-02-01', budget: 15000, spent: 8500, leads: 12, clicks: 245, impressions: 1800, conversions: 3, channel: 'Mailchimp' },
    { id: 'cmp-002', name: 'Investment Tips Series', type: 'Social Media', status: 'Active', startDate: '2026-02-05', budget: 50000, spent: 32000, leads: 28, clicks: 1450, impressions: 18500, conversions: 5, channel: 'LinkedIn & Instagram' },
    { id: 'cmp-003', name: 'Insurance Awareness Week', type: 'Content', status: 'Scheduled', startDate: '2026-03-01', endDate: '2026-03-07', budget: 25000, spent: 0, leads: 0, clicks: 0, impressions: 0, conversions: 0, channel: 'Blog & Social' },
    { id: 'cmp-004', name: 'Google Ads — Wealth Management', type: 'Paid Ads', status: 'Active', startDate: '2026-01-15', budget: 100000, spent: 67000, leads: 34, clicks: 890, impressions: 24500, conversions: 8, channel: 'Google Ads' },
    { id: 'cmp-005', name: 'January Newsletter', type: 'Email', status: 'Completed', startDate: '2026-01-01', endDate: '2026-01-31', budget: 15000, spent: 15000, leads: 18, clicks: 312, impressions: 2100, conversions: 4, channel: 'Mailchimp' },
    { id: 'cmp-006', name: 'Year-End Promo Campaign', type: 'Paid Ads', status: 'Completed', startDate: '2025-12-01', endDate: '2025-12-31', budget: 80000, spent: 80000, leads: 42, clicks: 2100, impressions: 35000, conversions: 11, channel: 'Facebook & Google' },
];

// ===== CMS =====
export interface CMSPage {
    id: string; title: string; path: string; lastUpdated: string; updatedBy: string;
    status: 'Published' | 'Draft'; views: number;
}

export const cmsPages: CMSPage[] = [
    { id: 'pg-001', title: 'Home', path: '/', lastUpdated: '2026-02-10', updatedBy: 'Alexandria Kimathi', status: 'Published', views: 4580 },
    { id: 'pg-002', title: 'About Us', path: '/about', lastUpdated: '2026-02-08', updatedBy: 'Alexandria Kimathi', status: 'Published', views: 1230 },
    { id: 'pg-003', title: 'Investment Services', path: '/solutions/investment-services', lastUpdated: '2026-02-05', updatedBy: 'Alexandria Kimathi', status: 'Published', views: 2340 },
    { id: 'pg-004', title: 'Real Estate Services', path: '/solutions/real-estate-services', lastUpdated: '2026-02-05', updatedBy: 'Alexandria Kimathi', status: 'Published', views: 1890 },
    { id: 'pg-005', title: 'Consulting & Advisory', path: '/solutions/consulting-advisory', lastUpdated: '2026-02-05', updatedBy: 'Alexandria Kimathi', status: 'Published', views: 980 },
    { id: 'pg-006', title: 'Insurance & Pension', path: '/solutions/insurance-pension', lastUpdated: '2026-02-05', updatedBy: 'Alexandria Kimathi', status: 'Published', views: 1560 },
    { id: 'pg-007', title: 'Events', path: '/events', lastUpdated: '2026-02-11', updatedBy: 'Alexandria Kimathi', status: 'Published', views: 870 },
    { id: 'pg-008', title: 'Contact', path: '/contact', lastUpdated: '2026-02-01', updatedBy: 'Alexandria Kimathi', status: 'Published', views: 2100 },
    { id: 'pg-009', title: 'Get Started', path: '/get-started', lastUpdated: '2026-02-12', updatedBy: 'Alexandria Kimathi', status: 'Published', views: 3200 },
];

export interface BlogPost {
    id: string; title: string; excerpt: string; author: string; date: string;
    status: 'Published' | 'Draft'; category: string; views: number;
}

export const blogPosts: BlogPost[] = [
    { id: 'bp-001', title: '5 Investment Tips for Kenyan Millennials in 2026', excerpt: 'A practical guide to building wealth early through smart investing.', author: 'Alexandria Kimathi', date: '2026-02-12', status: 'Published', category: 'Investments', views: 890 },
    { id: 'bp-002', title: 'Understanding Treasury Bonds: A Beginner\'s Guide', excerpt: 'Everything you need to know about government securities in Kenya.', author: 'Denzel Omondi', date: '2026-02-08', status: 'Published', category: 'Investments', views: 1230 },
    { id: 'bp-003', title: 'Why Every Family Needs Life Insurance', excerpt: 'The importance of protecting your loved ones financially.', author: 'Debbie Wanjala', date: '2026-02-01', status: 'Published', category: 'Insurance', views: 650 },
    { id: 'bp-004', title: 'The Karen Real Estate Boom: What Investors Should Know', excerpt: 'Analyzing the rapid growth in Karen property values.', author: 'Mumbi Mbiyu', date: '2026-01-25', status: 'Published', category: 'Real Estate', views: 1750 },
    { id: 'bp-005', title: 'Retirement Planning: Starting Early vs Late', excerpt: 'Why starting your pension contributions now saves millions later.', author: 'Collet Adhiambo', date: '2026-01-20', status: 'Draft', category: 'Financial Planning', views: 0 },
];

// ===== CLIENT PORTAL USERS =====
export interface PortalUser {
    id: string; customerId: string; name: string; email: string; lastLogin: string;
    loginCount: number; status: 'Active' | 'Locked' | 'Pending Activation';
    documentsUploaded: number; statementsViewed: number;
}

export const portalUsers: PortalUser[] = [
    { id: 'usr-001', customerId: 'cst-002', name: 'Catherine Wambui', email: 'cathy.w@gmail.com', lastLogin: '2026-02-12T08:30:00Z', loginCount: 45, status: 'Active', documentsUploaded: 8, statementsViewed: 12 },
    { id: 'usr-002', customerId: 'cst-004', name: 'Lucy Nyokabi', email: 'lucy.n@outlook.com', lastLogin: '2026-02-11T19:00:00Z', loginCount: 32, status: 'Active', documentsUploaded: 5, statementsViewed: 8 },
    { id: 'usr-003', customerId: 'cst-001', name: 'David Njeru', email: 'david.njeru@gmail.com', lastLogin: '2026-02-10T14:00:00Z', loginCount: 12, status: 'Active', documentsUploaded: 3, statementsViewed: 4 },
    { id: 'usr-004', customerId: 'cst-003', name: 'James Kipchumba', email: 'james.kip@gmail.com', lastLogin: '2026-02-05T10:00:00Z', loginCount: 8, status: 'Active', documentsUploaded: 2, statementsViewed: 3 },
    { id: 'usr-005', customerId: 'cst-005', name: 'Hassan Ali', email: 'hassan.a@mombasa.co.ke', lastLogin: '2026-01-28T11:00:00Z', loginCount: 3, status: 'Locked', documentsUploaded: 1, statementsViewed: 1 },
];

export function getNextLeadNumber(): number { return mockLeads.length > 0 ? Math.max(...mockLeads.map(l => l.leadNumber)) + 1 : 1; }
export function getNextCustomerNumber(): number { return mockCustomers.length > 0 ? Math.max(...mockCustomers.map(c => c.customerNumber)) + 1 : 1; }
