import { MouseEvent, useContext, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import 'react-calendar/dist/Calendar.css';

import { descriptions } from 'services/languages/descriptions';
import { Header } from 'components/Header';
import { Section } from 'components/Section';
import { LanguageContext } from 'app/App';

export const Overview = () => {
  const { language } = useContext(LanguageContext);
  const [value, setValue] = useState(new Date());

  const onDateChange = (value: Value, event: MouseEvent<HTMLButtonElement>) => {
    value && setValue(value as Date);
  };

  return (
    <main>
      <Header title={descriptions[language].overviewPageTitle} />
      <Section
        title={descriptions[language].calendarSectionTitle}
        body={<ReactCalendar onChange={onDateChange} value={value} />}
      />
    </main>
  );
};
