import { ChangeEvent, useContext } from 'react';

import { styled } from 'styled-components';
import {
  useQueryParameter,
  useReplaceQueryParameter,
} from 'app/tasks/tasksPage/queryParameters';
import { Input } from 'app/tasks/tasksPage/Input';
import { descriptions } from 'common/languages/descriptions';
import { SEARCH_QUERY_PARAM_NAME } from './constants';
import { LanguageContext } from '~/app/App';

export const Search = () => {
  const { language } = useContext(LanguageContext);

  const query = useQueryParameter(SEARCH_QUERY_PARAM_NAME);
  const replaceQueryParameter = useReplaceQueryParameter();

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    replaceQueryParameter({
      key: SEARCH_QUERY_PARAM_NAME,
      value: event.target.value.trim() !== '' ? event.target.value : undefined,
    });
  };

  return (
    <Wrapper>
      <Input
        placeholder={descriptions[language].searchLabelPlaceholder}
        value={query || ''}
        onChange={onInputChange}
      />
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;
