import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

interface NavigationLinkProps {
  path: string;
  label: string;
}

export const NavigationLink = ({ path, label }: NavigationLinkProps) => (
  <StyledNavLink to={path}>{label}</StyledNavLink>
);

export const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.color.fontLight};
  font-weight: 300;

  &.active {
    font-weight: 700;
  }
`;
