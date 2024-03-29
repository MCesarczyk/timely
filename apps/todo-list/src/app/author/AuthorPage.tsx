import { useContext } from 'react';
import { styled } from 'styled-components';

import { descriptions } from 'services/languages/descriptions';
import { Header } from 'components/Header';
import { Section } from 'components/Section';
import { Spinner, SpinnerWrapper } from 'components/Spinner';
import { authorApiService } from 'infra/author/authorApiService';
import { LanguageContext } from 'app/App';
import { Tile } from './Tile';

export const AuthorPage = () => {
  const { language } = useContext(LanguageContext);

  const { reposList, isLoading } = authorApiService.useGetAuthorRepos();

  return (
    <main>
      <Header title={descriptions[language].authorPageTitle} />
      <Section
        title="Michał Cesarczyk"
        body={descriptions[language].authorPageContent}
        extraHeaderContent={null}
      />
      <GalleryHeader>
        {descriptions[language].authorPageReposHeader}
      </GalleryHeader>
      {isLoading && (
        <SpinnerWrapper>
          <Spinner caption="Please wait while projects are being loaded..." />
        </SpinnerWrapper>
      )}
      <GalleryWrapper>
        {reposList &&
          reposList.map((repo) => (
            <Tile
              key={repo.id}
              title={repo.name}
              description={repo.description}
              codeLink={repo.html_url}
              demoLink={repo.homepage}
              language={language}
            />
          ))}
      </GalleryWrapper>
    </main>
  );
};

const GalleryHeader = styled.h2`
  font-size: 24px;
  font-weight: 900;
  margin-top: 36px;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    font-size: 18px;
  }
`;

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
`;
