import { styled } from 'styled-components';

export const Navigation = () => {
  return (
    <NavigationWrapper>
      <NavigationButton>{'<<'}</NavigationButton>
      <NavigationButton>{'<'}</NavigationButton>
      <NavigationButton>{'>'}</NavigationButton>
      <NavigationButton>{'>>'}</NavigationButton>
    </NavigationWrapper>
  );
};

const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 6px;
`;

const NavigationButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.fontLight};
  background-color: ${({ theme }) => theme.color.primary};
  transition: filter 0.2s, scale 0.2s;

  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }

  &:active {
    filter: brightness(0.9);
  }
`;
