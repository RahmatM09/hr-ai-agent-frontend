const jobs = [
  {
    id: '1',
    title: 'Backend Developer',
    recruiter_company_name: 'CloudCore HR',
    location: 'Remote - United States',
    description:
      'Build secure backend services for a growing HR automation platform. This role focuses on APIs, database design, authentication workflows, and clean integrations with AI-assisted screening systems.',
    requirements: [
      '3+ years of backend development experience',
      'Strong knowledge of REST APIs and relational databases',
      'Experience with authentication and role-based access',
      'Comfortable writing clear documentation and tests',
    ],
    is_active: true,
    applicants_count: 18,
    shortlisted_count: 7,
    rejected_count: 11,
  },
  {
    id: '2',
    title: 'AI Product Manager',
    recruiter_company_name: 'TalentFlow Labs',
    location: 'New York, NY',
    description:
      'Lead roadmap decisions for AI recruiting workflows used by hiring teams. You will translate recruiter needs into product features and work closely with design, engineering, and data teams.',
    requirements: [
      '4+ years of product management experience',
      'Experience shipping AI or workflow automation products',
      'Strong communication with technical and non-technical teams',
      'Comfort with product analytics and customer discovery',
    ],
    is_active: true,
    applicants_count: 24,
    shortlisted_count: 9,
    rejected_count: 15,
  },
  {
    id: '3',
    title: 'Frontend React Developer',
    recruiter_company_name: 'PeopleOps Studio',
    location: 'Austin, TX',
    description:
      'Create polished recruiter and applicant interfaces for a modern SaaS platform. This role focuses on React components, dashboard workflows, accessibility, and responsive UI quality.',
    requirements: [
      '2+ years of React development experience',
      'Strong CSS layout and responsive design skills',
      'Experience with React Router and component state',
      'Ability to turn product requirements into clean UI',
    ],
    is_active: true,
    applicants_count: 31,
    shortlisted_count: 12,
    rejected_count: 19,
  },
  {
    id: '4',
    title: 'Data Analyst',
    recruiter_company_name: 'HireSignal Analytics',
    location: 'San Francisco, CA',
    description:
      'Analyze recruiting funnel data and help hiring teams understand candidate pipelines. You will build reports, identify bottlenecks, and support AI evaluation quality reviews.',
    requirements: [
      '2+ years of analytics or business intelligence experience',
      'Strong SQL and spreadsheet skills',
      'Experience creating dashboards for business users',
      'Ability to explain insights clearly to stakeholders',
    ],
    is_active: true,
    applicants_count: 16,
    shortlisted_count: 5,
    rejected_count: 11,
  },
]

const applicants = [
  {
    id: 'app-101',
    job_id: '1',
    applicant_name: 'Maya Chen',
    applicant_email: 'maya.chen@example.com',
    ai_score: 92,
    ai_status: 'shortlisted',
    ai_reason:
      'Strong backend API experience, clear database background, and direct work on authentication-heavy SaaS systems.',
    ai_strengths: [
      'Designed scalable REST APIs',
      'Strong PostgreSQL and testing experience',
      'Good security and authentication background',
    ],
    ai_weaknesses: ['Limited direct HR technology experience'],
    ai_recommendation:
      'Move to technical interview with emphasis on system design and production debugging.',
    ai_provider: 'OpenAI',
    ai_model: 'gpt-4o-mini',
    evaluated_at: '2026-05-18',
  },
  {
    id: 'app-102',
    job_id: '1',
    applicant_name: 'Daniel Brooks',
    applicant_email: 'daniel.brooks@example.com',
    ai_score: 68,
    ai_status: 'rejected',
    ai_reason:
      'Solid general development experience, but resume shows limited backend ownership and little evidence of API security work.',
    ai_strengths: ['General JavaScript knowledge', 'Some database exposure'],
    ai_weaknesses: [
      'Backend experience appears junior',
      'No clear authentication or testing examples',
    ],
    ai_recommendation:
      'Not recommended for this opening; may fit a junior full-stack role.',
    ai_provider: 'OpenAI',
    ai_model: 'gpt-4o-mini',
    evaluated_at: '2026-05-19',
  },
  {
    id: 'app-201',
    job_id: '2',
    applicant_name: 'Priya Shah',
    applicant_email: 'priya.shah@example.com',
    ai_score: 88,
    ai_status: 'shortlisted',
    ai_reason:
      'Resume shows repeated delivery of AI workflow products and strong collaboration with research, design, and enterprise customers.',
    ai_strengths: [
      'AI product roadmap ownership',
      'Excellent customer discovery signals',
      'Strong metrics and launch experience',
    ],
    ai_weaknesses: ['Less detail on pricing and packaging decisions'],
    ai_recommendation:
      'Advance to product case interview focused on recruiter workflow design.',
    ai_provider: 'OpenAI',
    ai_model: 'gpt-4o-mini',
    evaluated_at: '2026-05-20',
  },
  {
    id: 'app-202',
    job_id: '2',
    applicant_name: 'Omar Lewis',
    applicant_email: 'omar.lewis@example.com',
    ai_score: 61,
    ai_status: 'rejected',
    ai_reason:
      'Strong project coordination background, but product ownership and AI product strategy are not demonstrated clearly enough.',
    ai_strengths: ['Stakeholder communication', 'Operational coordination'],
    ai_weaknesses: [
      'Limited AI product experience',
      'Few examples of roadmap ownership',
    ],
    ai_recommendation:
      'Do not advance for this product manager role; consider for operations roles.',
    ai_provider: 'OpenAI',
    ai_model: 'gpt-4o-mini',
    evaluated_at: '2026-05-21',
  },
  {
    id: 'app-301',
    job_id: '3',
    applicant_name: 'Elena Rivera',
    applicant_email: 'elena.rivera@example.com',
    ai_score: 94,
    ai_status: 'shortlisted',
    ai_reason:
      'Excellent React portfolio with dashboard-heavy SaaS work, strong CSS skills, and clear accessibility awareness.',
    ai_strengths: [
      'Reusable React component design',
      'Responsive dashboard layouts',
      'Strong product UI polish',
    ],
    ai_weaknesses: ['Could provide more examples of test coverage'],
    ai_recommendation:
      'Advance to frontend interview and ask for a component refactor exercise.',
    ai_provider: 'OpenAI',
    ai_model: 'gpt-4o-mini',
    evaluated_at: '2026-05-22',
  },
  {
    id: 'app-302',
    job_id: '3',
    applicant_name: 'Noah Kim',
    applicant_email: 'noah.kim@example.com',
    ai_score: 73,
    ai_status: 'rejected',
    ai_reason:
      'Candidate has React experience but resume is weighted toward content sites rather than SaaS workflows and complex state.',
    ai_strengths: ['React fundamentals', 'Clean visual design examples'],
    ai_weaknesses: [
      'Limited dashboard workflow experience',
      'No clear React Router project examples',
    ],
    ai_recommendation:
      'Hold for future marketing-site roles; do not advance for this SaaS dashboard role.',
    ai_provider: 'OpenAI',
    ai_model: 'gpt-4o-mini',
    evaluated_at: '2026-05-23',
  },
  {
    id: 'app-401',
    job_id: '4',
    applicant_name: 'Sara Patel',
    applicant_email: 'sara.patel@example.com',
    ai_score: 86,
    ai_status: 'shortlisted',
    ai_reason:
      'Strong SQL, funnel reporting, and stakeholder presentation experience with clear recruiting analytics examples.',
    ai_strengths: [
      'Recruiting funnel dashboards',
      'SQL and spreadsheet modeling',
      'Clear business communication',
    ],
    ai_weaknesses: ['Less exposure to AI evaluation review processes'],
    ai_recommendation:
      'Advance to analytics case interview using candidate pipeline data.',
    ai_provider: 'OpenAI',
    ai_model: 'gpt-4o-mini',
    evaluated_at: '2026-05-24',
  },
  {
    id: 'app-402',
    job_id: '4',
    applicant_name: 'Marcus Green',
    applicant_email: 'marcus.green@example.com',
    ai_score: 59,
    ai_status: 'rejected',
    ai_reason:
      'Resume shows general reporting experience but does not show enough SQL depth or recruiting analytics context.',
    ai_strengths: ['Basic dashboard creation', 'Organized reporting habits'],
    ai_weaknesses: [
      'Limited SQL examples',
      'No direct hiring funnel analytics experience',
    ],
    ai_recommendation:
      'Do not advance for this role; consider for an entry-level reporting position.',
    ai_provider: 'OpenAI',
    ai_model: 'gpt-4o-mini',
    evaluated_at: '2026-05-25',
  },
]

const recruiter = {
  company_name: 'CloudCore HR',
  contact_name: 'Amina Rahimi',
  email: 'recruiting@cloudcorehr.example',
}

export { applicants, jobs, recruiter }
