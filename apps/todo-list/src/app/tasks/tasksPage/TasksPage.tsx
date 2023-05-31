import { useSelector } from 'react-redux';
import { descriptions } from 'common/languages/descriptions';
import { selectLanguage } from 'common/languages/languageSlice';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { Form } from './Form';
import { Search } from './Search';
import { TasksList } from './TasksList';
import { ListButtons } from './ListButtons';

export const TasksPage = () => {
  const language = useSelector(selectLanguage);

  return (
    <main>
      <Header title={descriptions[language].headerTitle} />
      <Section
        title={descriptions[language].sectionTitle}
        body={
          <Form language={language} />
        }
        extraHeaderContent={<></>}
      />
      <Section
        title={descriptions[language].searchSectionTitle}
        body={<Search />}
        extraHeaderContent={<></>}
      />
      <Section
        title={descriptions[language].tasksSectionTitle}
        body={<TasksList />}
        extraHeaderContent={<ListButtons language={language} />}
      />
    </main>
  );
};
