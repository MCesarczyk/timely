import { styled } from 'styled-components';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => (
  <header>
    <HeaderWrapper>
      <h1>{title}</h1>
    </HeaderWrapper>
  </header>
);

export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding-right: 10px;
  margin: 0 0 1px 0;
`;
