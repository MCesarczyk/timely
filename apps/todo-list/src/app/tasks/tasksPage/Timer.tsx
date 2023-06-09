import { useContext } from 'react';

import { descriptions } from 'common/languages/descriptions';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { LanguageContext } from 'app/App';
import { Button } from './Button';

export const Timer = () => {
  const { language } = useContext(LanguageContext);

  return (
    <main>
      <Header title={descriptions[language].timerPageTitle} />
      <Section
        title={descriptions[language].timerSectionTitle}
        body={<Button>Start</Button>}
        extraHeaderContent={null}
      />
    </main>
  );
};
