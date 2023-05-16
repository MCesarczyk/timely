import { useLocation, useNavigate } from 'react-router-dom';

export const useQueryParameter = (key: string) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(key);
};

export const useReplaceQueryParameter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return ({ key, value }: { key: string; value: string | undefined }) => {
    const searchParams = new URLSearchParams(location.search);

    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
};
