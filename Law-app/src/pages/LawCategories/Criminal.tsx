

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import './Criminal.css';


interface CriminalCase {
  title: string;
  citation: string;
  court: string;
  facts: string;
  legalPrinciple: string;  // Standardized to camelCase
  link?: string;
  offenseType?: string;
  case_name?: string;
}

interface CriminalCasesData {
  criminal_cases: Record<string, CriminalCase[]>;
}

const VALID_OFFENSES = [
  'Murder', 'Theft', 'Robbery', 'Assault', 'Fraud', 'Bribery',
  'Drug Abuse and Trafficking', 'Defilement', 'Rape', 'Manslaughter',
  'Terrorism', 'Forgery', 'Abortion', 'Corruption', 'Bigamy', 'Elopement',
  'Child to child sex', 'Aggravated Difilement', 'Treason', 'Attempted Murder',
  'Aggravated Robbery', 'House Breaking', 'Burglary', 'Un natural Offences',
  'Elopements', 'Abduction', 'Prositution', 'Indecent Assult',
  'Attempted Rape', 'Procuring miscarriage', 'Insults to religion'
];

const CaseCard = ({ caseItem }: { caseItem: CriminalCase }) => (
  <div className="case-card">
    <h3>{caseItem.title}</h3>
    <p><strong>Citation:</strong> {caseItem.citation}</p>
    <p><strong>Court:</strong> {caseItem.court}</p>
    {caseItem.offenseType && <p><strong>Offense:</strong> {caseItem.offenseType}</p>}
    <div className="case-section">
      <h4>Facts:</h4>
      <p>{caseItem.facts}</p>
    </div>
    <div className="case-section">
      <h4>Legal Principle:</h4>
      <p>{caseItem.legalPrinciple}</p>
    </div>
    {caseItem.link && (
      <a href={caseItem.link} target="_blank" rel="noopener noreferrer" className="case-link">
        Read full case
      </a>
    )}
  </div>
);

const CriminalCasesPage = () => {
  const { country = '' } = useParams<{ country: string }>();
  const [data, setData] = useState<CriminalCasesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const validateOffenses = (data: CriminalCasesData) => {
    const unknown = Object.keys(data.criminal_cases).filter(
      offense => !VALID_OFFENSES.includes(offense)
    );
    if (unknown.length > 0) {
      console.warn(`⚠️ Unknown offense types in ${country}:`, unknown);
    }
  };

  const transformCaseData = (rawCases: any[]): CriminalCase[] => {
    return rawCases.map(c => {
      // Handle all possible case variations for legal principle
      const legalPrinciple = 
        c.legalPrinciple || 
        c.Legal_Principle || 
        c.Legal_principle || 
        c.legal_principle || 
        c.principle||
        'No legal principle provided';

      return {
        title: c.title || c.case_name || 'Untitled Case',
        citation: c.citation || 'No citation available',
        court: c.court || 'Court not specified',
        facts: c.facts || 'No facts provided',
        legalPrinciple: legalPrinciple,
        link: c.link || '',
        offenseType: c.offenseType || ''
      };
    });
  };

  useEffect(() => {
    const loadCases = async () => {
      try {
        setLoading(true);
        setError(null);
// Load country-specific criminal cases from a JSON file dynamically
        const filePath = `../../data/Criminal/${country}.json`;
        // - filePath is built from selected country
        const imported = await import(/* @vite-ignore */filePath);
        const raw = imported.default || imported;

        if (!raw.criminal_cases) {
          throw new Error('Missing criminal_cases in data');
        }

        // - ensure data matches the CriminalCasesData type structure
        const transformedData: CriminalCasesData = {
          criminal_cases: Object.fromEntries(
            Object.entries(raw.criminal_cases).map(([offense, cases]) => [
              offense,
              transformCaseData(cases as any[])
            ])
          )
        };

        validateOffenses(transformedData);
        setData(transformedData);
      } catch (err: any) {
        console.error(err);
        setError(`Failed to load cases for ${country}. ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadCases();
  }, [country]);

  const searchResults = useMemo(() => {
    if (!data) return {};

    const searchLower = searchTerm.toLowerCase();
    const results: Record<string, CriminalCase[]> = {};

    Object.entries(data.criminal_cases).forEach(([offense, cases]) => {
      const match = cases.filter(c =>
        [c.title, c.citation, offense, c.offenseType, c.facts, c.legalPrinciple]
          .join(' ')
          .toLowerCase()
          .includes(searchLower)
      );
      if (match.length > 0) results[offense] = match;
    });

    return results;
  }, [data, searchTerm]);

  const caseStats = useMemo(() => {
    if (!data) return null;
    return {
      totalOffenses: Object.keys(data.criminal_cases).length,
      totalCases: Object.values(data.criminal_cases).reduce((sum, c) => sum + c.length, 0)
    };
  }, [data]);

  if (loading) return <div className="loading-container">Loading cases...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="criminal-cases-container">
      <h1>{country} Criminal Cases</h1>

      {caseStats && (
        <div className="stats-bar">
          Showing {Object.keys(searchResults).length} offenses with{' '}
          {Object.values(searchResults).reduce((sum, c) => sum + c.length, 0)} cases (Total:{' '}
          {caseStats.totalCases} cases)
        </div>
      )}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title, citation, facts, or offense..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {Object.entries(searchResults).map(([offense, cases]) => (
        <div key={offense} className="offense-category">
          <h2 className="offense-title">
            {offense} <span className="case-count">({cases.length} cases)</span>
          </h2>
          <div className="cases-list">
            {cases.map((c) => (
              <CaseCard key={`${c.citation}-${c.title}`} caseItem={c} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CriminalCasesPage;