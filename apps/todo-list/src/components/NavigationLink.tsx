import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
  path: string;
  label: string;
}

export const NavigationLink = ({ path, label }: NavigationLinkProps) => (
  <StyledNavLink to={path}>{label}</StyledNavLink>
);

export const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.color.fontDark};
  font-weight: 300;

  &.active {
    font-weight: 700;
  }
`;
