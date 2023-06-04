import { useContext } from 'react';
import { styled } from 'styled-components';

import { descriptions } from 'common/languages/descriptions';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { LanguageContext } from '../App';
import { authorApiService } from './authorApiService';

export const AuthorPage = () => {
  const { language } = useContext(LanguageContext);

  const { reposList, isLoading } = authorApiService.useGetAuthorRepos();

  return (
    <main>
      <Header title={descriptions[language].authorPageTitle} />
      <Section
        title="Michał Cesarczyk"
        body={descriptions[language].authorPageContent}
        extraHeaderContent={<></>}
      />
      {isLoading ? 'isLoading...' : ''}
      <ul>{reposList && reposList.map((repo) => <li>{`${repo.name}`}</li>)}</ul>
    </main>
  );
};

const GalleryHeader = styled.h2`
  font-size: 24px;
  font-weight: 900;
  margin-top: 36px;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobileMax}) {
    font-size: 18px;
  }
`;

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoint.notebookMax}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.netbookMax}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobileMax}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
`;
