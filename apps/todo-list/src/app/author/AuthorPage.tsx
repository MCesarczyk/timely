import { useContext } from 'react';

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
