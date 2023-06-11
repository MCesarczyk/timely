import { useContext, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { descriptions } from 'common/languages/descriptions';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { LanguageContext } from 'app/App';
import 'react-calendar/dist/Calendar.css';

export const Overview = () => {
  const { language } = useContext(LanguageContext);
  const [value, setValue] = useState(new Date());

  const onDateChange = (value: Date) => {
    setValue(value);
  };

  return (
    <main>
      <Header title={descriptions[language].overviewPageTitle} />
      <Section
        title={descriptions[language].calendarSectionTitle}
        // @ts-ignore
        body={<ReactCalendar onChange={onDateChange} value={value} />}
      />
    </main>
  );
};
