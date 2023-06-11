import styled from 'styled-components';
import { descriptions } from 'services/languages/descriptions';

interface TileProps {
  title: string;
  description: string;
  demoLink: string;
  codeLink: string;
  language: string;
}

export const Tile = ({
  title,
  description,
  demoLink,
  codeLink,
  language,
}: TileProps) => (
  <TileBody>
    <TileHeader>{title}</TileHeader>
    <p>{description}</p>
    <TileList>
      <li key={demoLink}>
        {descriptions[language].authorPageRepoDemoLabel}:{' '}
        <TileLink href={demoLink} target="_blank">
          {demoLink
            ? descriptions[language].authorPageRepoDemoUrlLive
            : descriptions[language].authorPageRepoDemoUrlUnavailable}
        </TileLink>
      </li>
      <li key={codeLink}>
        {descriptions[language].authorPageRepoCodeLabel}:{' '}
        <TileLink href={codeLink} target="_blank">
          {descriptions[language].authorPageRepoCodeUrl}
        </TileLink>
      </li>
    </TileList>
  </TileBody>
);

export const TileBody = styled.div`
  text-align: left;
  padding: 18px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.secondaryBackground};
  border: ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};
  transition: color ease-in 2s, background-color ease-in 2s,
    box shadow ease-in 1s;

  &:hover {
    box-shadow: 0px 0px 6px 0px ${({ theme }) => theme.color.themeColor};
  }
`;

export const TileHeader = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.themeColor};
`;

export const TileList = styled.ul`
  list-style: none;
  padding-left: 0px;
`;

export const TileLink = styled.a`
  color: ${({ theme }) => theme.color.themeColor};
`;
