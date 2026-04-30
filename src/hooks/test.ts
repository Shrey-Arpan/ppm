export const PPM_EXTRACTION_DATA = [
  {
    title: 'DST Offering Summary',
    fields: [
      { name: 'Location', value: 'Miami, Florida', source: 'Page 2, Summary' },
      { name: 'MSA', value: 'Miami, FL', source: 'Page 2, Summary' },
      { name: 'Street Address', value: '40 NE 1st Ave, Ste. 301, Miami, Florida 33132', source: 'Page 2, Summary' },
      { name: 'Asset Type', value: 'Private Investment Fund (Historic Real Estate & Legacy Businesses)', source: 'Cover Page' },
      { name: 'Sponsor', value: 'Revitalization Unlimited, LLC', source: 'Page 1, Intro' },
      { name: 'Acquisition Cost', value: 'N/A', source: 'Financials' },
      { name: 'Offering Price', value: '$25,000 per Unit', source: 'Offering Terms' },
      { name: 'Units', value: '3,920 Units offered', source: 'Offering Terms' },
      { name: 'Offering LTV', value: 'Up to 65% leverage on real estate portfolio', source: 'Page 18' },
      { name: 'Ave Distribution (Full Term)', value: '7% Preferred Return', source: 'Page 5, Distributions' }
    ]
  },
  {
    title: 'Sources',
    fields: [
      { name: 'Offering Equity', value: 'Up to $100,000,000', source: 'Capitalization Table' },
      { name: 'Loan Proceeds', value: 'N/A', source: 'Capitalization Table' },
      { name: 'Total Sources', value: '-', source: '-' }
    ]
  },
  {
    title: 'Cost Of Acquisition',
    fields: [
      { name: 'Sponsor Equity Contribution', value: 'Not specified', source: 'Page 12' },
      { name: 'Acquisition Fee', value: 'Included in price', source: 'Fee Schedule' },
      { name: 'Legal Costs', value: 'Not specified', source: 'Fee Schedule' },
      { name: 'Total Acquisition Cost', value: '-', source: '-' }
    ]
  },
  {
    title: 'Offering Expenses',
    fields: [
      { name: 'Selling Commissions', value: 'Up to 10% of offering proceeds', source: 'Page 22, Commissions' },
      { name: 'Dealer Fee', value: 'Not specified', source: 'Page 22' },
      { name: 'Total Offering Expenses', value: '-', source: '-' }
    ]
  },
  {
    title: 'Sponsor Compensation',
    fields: [
      { name: 'Acquisition Fee', value: '2% of Acquisition Price', source: 'Compensation' },
      { name: 'O/O Expense Reimbursment', value: 'At Cost', source: 'Compensation' },
      { name: 'Total Front-end Fees', value: '-', source: '-' }
    ]
  },
  {
    title: 'Operating Fees',
    fields: [
      { name: 'Asset Mgmt Fee (annual)', value: '2% of Gross Capital Contributions', source: 'Operations' },
      { name: 'Property Mgmt Fee', value: '3% of Gross Revenue', source: 'Operations' }
    ]
  },
  {
    title: 'Acquisition Terms',
    fields: [
      { name: 'Appraised Value', value: 'Not specified', source: 'Appraisal' },
      { name: 'Acquisition Cost', value: '$25,000 per unit basis', source: 'Purchase Agreement' }
    ]
  }
];

export const MOCK_DOCUMENTS = [
  { id: 'doc_1', name: 'Revitalization_Unlimited_Miami_PPM.pdf', status: 'Completed', date: '2023-10-24', sections: PPM_EXTRACTION_DATA },
  { id: 'doc_2', name: 'Northstar_Equity_Fund_IV.pdf', status: 'In Process', date: '2023-10-25', sections: [] },
  { id: 'doc_3', name: 'Global_Tech_Ventures_VI.pdf', status: 'Queued', date: '2023-10-25', sections: [] },
  { id: 'doc_4', name: 'Legacy_Wealth_Trust_PPM_v2.pdf', status: 'Failed', date: '2023-10-23', sections: [] },
  { id: 'doc_5', name: 'West_Coast_Real_Estate_Fund.pdf', status: 'Completed', date: '2023-10-22', sections: PPM_EXTRACTION_DATA },
  { id: 'doc_6', name: 'Growth_Equity_Partners_X.pdf', status: 'Completed', date: '2023-10-21', sections: PPM_EXTRACTION_DATA },
  { id: 'doc_7', name: 'Renewable_Energy_Infrastructure.pdf', status: 'In Process', date: '2023-10-20', sections: [] },
  { id: 'doc_8', name: 'Blue_Horizon_Ventures_PPM.pdf', status: 'Queued', date: '2023-10-19', sections: [] },
  { id: 'doc_9', name: 'Metropolis_Development_Fund.pdf', status: 'Completed', date: '2023-10-18', sections: PPM_EXTRACTION_DATA },
  { id: 'doc_10', name: 'Apex_Strategic_Growth_V.pdf', status: 'Failed', date: '2023-10-17', sections: [] },
  { id: 'doc_11', name: 'Heritage_Preservation_Trust.pdf', status: 'Completed', date: '2023-10-16', sections: PPM_EXTRACTION_DATA },
  { id: 'doc_12', name: 'Silver_Lake_Opportunities.pdf', status: 'In Process', date: '2023-10-15', sections: [] },
];
