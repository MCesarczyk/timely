import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { HeaderWrapper } from 'common/HeaderWrapper';

interface SectionProps {
  title: string;
  body: ReactNode;
  extraHeaderContent?: JSX.Element;
}

export const Section = ({ title, body, extraHeaderContent }: SectionProps) => (
  <SectionContainer>
    <HeaderWrapper>
      <Header>{title}</Header>
      {extraHeaderContent}
    </HeaderWrapper>
    {body}
  </SectionContainer>
);

export const SectionContainer = styled.section`
  background-color: ${({ theme }) => theme.color.background};
  margin-bottom: 10px;
  padding: 15px;
`;

export const Header = styled.h2`
  padding: 10px;
  font-weight: 700;
  font-size: 20px;
  margin: 0 0 1px 0;
`;
