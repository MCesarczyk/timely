import { styled } from 'styled-components';

interface NavigationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const Navigation = ({ page, setPage, totalPages }: NavigationProps) => {
  const goToFirst = () => setPage(1);

  const goToPrevious = () => setPage(page > 1 ? page - 1 : page);

  const goToNext = () => setPage(page < totalPages ? page + 1 : page);

  const goToLast = () => setPage(totalPages);

  return (
    <NavigationWrapper>
      <NavigationButton onClick={goToFirst}>{'<<'}</NavigationButton>
      <NavigationButton onClick={goToPrevious}>{'<'}</NavigationButton>
      {page} / {totalPages}
      <NavigationButton onClick={goToNext}>{'>'}</NavigationButton>
      <NavigationButton onClick={goToLast}>{'>>'}</NavigationButton>
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
