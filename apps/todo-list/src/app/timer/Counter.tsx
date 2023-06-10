import styled from 'styled-components';
import { useCurrentDate } from './useCurrentDate';

interface CounterProps {
  isCounting: boolean;
  time: number;
}

export const Counter = ({ isCounting, time }: CounterProps) => {
  const date = useCurrentDate(isCounting);
  
  const timezoneOffset = new Date(0).getTimezoneOffset() * 60 * 1000;

  const currentTime: Date = new Date(date.getTime() - time + timezoneOffset);

  return (
    <ClockContainer>
      <ClockElement>{`${currentTime.getHours() < 10 ? '0' : ''}${currentTime.getHours()}:${
        currentTime.getMinutes() < 10 ? '0' : ''
      }${currentTime.getMinutes()}:${
        currentTime.getSeconds() < 10 ? '0' : ''
      }${currentTime.getSeconds()}`}</ClockElement>
    </ClockContainer>
  );
};

export const ClockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

export const ClockElement = styled.p`
  font-family: monospace;
  font-size: 24px;
  margin: 0;
  padding: 0 24px;
  text-align: center;
`;
