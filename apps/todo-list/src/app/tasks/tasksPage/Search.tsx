import { ChangeEvent, useContext } from 'react';
import { styled } from 'styled-components';

import {
  useQueryParameter,
  useReplaceQueryParameter,
} from 'services/queryParameters';
import { SEARCH_QUERY_PARAM_NAME } from 'services/constants';
import { Input } from 'components/Input';

export const Search = () => {
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
        placeholder='Search for tasks...'
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
