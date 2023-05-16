import { styled } from 'styled-components';
import { NavigationLink } from 'common/nav/NavigationLink';

interface NavProps {
  tasksPath: string;
  tasksLabel: string;
  authorPath: string;
  authorLabel: string;
}

export const Nav = ({ tasksPath, tasksLabel, authorPath, authorLabel }: NavProps) => (
  <nav>
    <StyledNavList>
      <li>
        <NavigationLink path={tasksPath} label={tasksLabel} />
      </li>
      <li>
        <NavigationLink path={authorPath} label={authorLabel} />
      </li>
    </StyledNavList>
  </nav>
);

export const StyledNavList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 15px;
  background-color: ${({ theme }) => theme.color.primary};
  margin-bottom: 20px;
`;
