import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { selectLanguage } from 'common/languages/languageSlice';
import { descriptions } from 'common/languages/descriptions';
import { useQueryParameter, useReplaceQueryParameter } from 'features/tasks/tasksPage/queryParameters';
import { Input } from 'features/tasks/tasksPage/Input';
import { SEARCH_QUERY_PARAM_NAME } from './constants';

export const Search = () => {
  const language = useSelector(selectLanguage);
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
      <Input placeholder={descriptions[language].searchLabelPlaceholder} value={query || ''} onChange={onInputChange} />
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;
