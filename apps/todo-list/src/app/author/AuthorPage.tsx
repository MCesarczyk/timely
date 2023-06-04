import { useContext } from 'react';

import { descriptions } from 'common/languages/descriptions';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { LanguageContext } from '../App';

export const AuthorPage = () => {
  const { language } = useContext(LanguageContext);

  return (
    <main>
      <Header title={descriptions[language].authorPageTitle} />
      <Section
        title="Michał Cesarczyk"
        body={descriptions[language].authorPageContent}
        extraHeaderContent={<></>}
      />
    </main>
  );
};
