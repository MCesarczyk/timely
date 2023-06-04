import styled from 'styled-components';

import { ReactComponent as LoaderCircle } from 'assets/svg/loaderCircle.svg';

interface SpinnerProps {
  caption?: string;
}

export const Spinner = ({ caption }: SpinnerProps) => (
  <>
    <LoaderCaption>{caption || 'Loading...'}</LoaderCaption>
    <LoaderCircleWrapper>
      <SpinnerCircle />
    </LoaderCircleWrapper>
  </>
);

export const LoaderCaption = styled.p`
  font-size: 20px;
  margin-top: 36px;
`;

export const LoaderCircleWrapper = styled.div`
  width: 100px;
  aspect-ratio: 1;
  margin: 24px;
`;

export const SpinnerCircle = styled(LoaderCircle)`
  width: 100%;
  height: 100%;
  color: teal;

  @media (prefers-reduced-motion: no-preference) {
    animation: Element-spin 1.2s linear infinite;
  }

  @keyframes Element-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
