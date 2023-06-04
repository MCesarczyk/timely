import { useContext } from 'react';

import { descriptions } from 'common/languages/descriptions';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { LanguageContext } from '../App';
import { authorApiService } from './authorApiService';
import { Tile } from './Tile';
import { styled } from 'styled-components';

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
      <GalleryWrapper>
        {reposList &&
          reposList.map((repo) => (
            <Tile
              key={repo.id}
              title={repo.name}
              description={repo.description}
              codeLink={repo.html_url}
              demoLink={repo.homepage}
            />
          ))}
      </GalleryWrapper>
    </main>
  );
};

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
