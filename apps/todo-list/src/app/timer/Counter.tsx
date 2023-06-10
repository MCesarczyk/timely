import styled from 'styled-components';
import { useCurrentDate } from './useCurrentDate';
import { buildTimeStringHelper, compileTimeDisplayHelper } from './helpers';

interface CounterProps {
  isCounting: boolean;
  time: number;
}

export const Counter = ({ isCounting, time }: CounterProps) => {
  const date = useCurrentDate(isCounting);

  const timezoneOffset = new Date(0).getTimezoneOffset() * 60 * 1000;

  const currentTime: Date = new Date(date.getTime() - time + timezoneOffset);

  const currentTimeDisplay = compileTimeDisplayHelper(currentTime);

  const timeString = (timeset: number[]) => buildTimeStringHelper(timeset);

  const clockContent = timeString(currentTimeDisplay);

  return (
    <ClockContainer>
      <ClockElement>{clockContent}</ClockElement>
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
