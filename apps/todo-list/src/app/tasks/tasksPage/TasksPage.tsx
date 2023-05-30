import { useSelector } from 'react-redux';
import { descriptions } from 'common/languages/descriptions';
import { selectLanguage } from 'common/languages/languageSlice';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { Form } from './Form';
import { Search } from './Search';
import { TasksList } from './TasksList';
import { FormButtons } from './FormButtons';

export const TasksPage = () => {
  const language = useSelector(selectLanguage);

  return (
    <main>
      <Header title={descriptions[language].headerTitle} />
      <Section
        title={descriptions[language].sectionTitle}
        body={
          <Form
            inputPlaceholder={descriptions[language].inputPlaceholder}
            formButtonInnerText={descriptions[language].formButtonInnerText}
          />
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
        extraHeaderContent={
          <FormButtons
            setDoneButtonInnerText={
              descriptions[language].setDoneButtonInnerText
            }
            toggleButtonInnerTextVisible={
              descriptions[language].toggleButtonInnerTextVisible
            }
            toggleButtonInnerTextHidden={
              descriptions[language].toggleButtonInnerTextHidden
            }
          />
        }
      />
    </main>
  );
};
