import { SVGProps } from 'react';
import styled from 'styled-components';

const LoaderCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M80 154.312C121.042 154.312 154.312 121.042 154.312 80C154.312 38.9583 121.042 5.6875 80 5.6875C38.9583 5.6875 5.6875 38.9583 5.6875 80C5.6875 121.042 38.9583 154.312 80 154.312Z"
      stroke="#D1D5DA"
      stroke-opacity="0.3"
      stroke-width="11.375"
    />
    <path
      d="M132.547 27.4531C146.483 41.3894 154.312 60.2911 154.312 80C154.312 99.7089 146.483 118.611 132.547 132.547"
      stroke="currentColor"
      stroke-width="11.375"
    />
  </svg>
);

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

export const SpinnerWrapper = styled.div`
  display: grid;
  place-items: center;
`;
