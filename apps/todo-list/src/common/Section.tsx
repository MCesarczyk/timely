import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface SectionProps {
  title: ReactNode | null;
  body: ReactNode | null;
  extraHeaderContent?: ReactNode | null;
}

export const Section = ({ title, body, extraHeaderContent }: SectionProps) => (
  <SectionContainer>
    <HeaderWrapper>
      <Header>{title}</Header>
      <ExtraContentWrapper>{extraHeaderContent}</ExtraContentWrapper>
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

export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding-right: 10px;
  margin: 0 0 1px 0;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

const ExtraContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
