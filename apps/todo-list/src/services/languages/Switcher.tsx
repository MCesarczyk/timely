import { useContext } from 'react';
import { styled } from 'styled-components';

import { Descriptions } from 'types';
import { LanguageContext } from 'app/App';
import { localStorageService } from '~/services/localStorageService';

interface SwitcherProps {
  descriptions: Descriptions;
}

export const Switcher = ({ descriptions }: SwitcherProps) => {
  const { setLanguage } = useContext(LanguageContext);

  const onLanguageChange = (key: string) => {
    setLanguage(key);
    localStorageService.setValue('language', key);
  };

  return (
    <div>
      {Object.keys(descriptions).map((key) => (
        <Button key={key} value={key} onClick={() => onLanguageChange(key)}>
          {key}
        </Button>
      ))}
    </div>
  );
};

export const Button = styled.button`
  color: ${({ theme }) => theme.color.fontDark};
  background-color: ${({ theme }) => theme.color.background};
  font-weight: 700;
  border: solid 1px;
  padding: 5px;
  margin: 5px;
  transition: background 0.5s, transform 1s;

  &:hover {
    filter: brightness(130%);
    transform: scale(1.05);
  }

  &:active {
    filter: brightness(160%);
    box-shadow: inset 1px 1px 2px darkgrey;
  }
`;
