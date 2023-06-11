import { styled } from 'styled-components';
import { NavigationLink } from 'common/nav/NavigationLink';

interface NavProps {
  navConfig: {
    id: number;
    path: string;
    label: string;
  }[];
}

export const Nav = ({ navConfig }: NavProps) => (
  <nav>
    <StyledNavList>
      {navConfig.map((item) => (
        <li key={item.id}>
          <NavigationLink path={item.path} label={item.label} />
        </li>
      ))}
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
