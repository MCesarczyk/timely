import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { buildTimeStringHelper, compileTimeDisplayHelper } from './helpers';

interface CounterProps {
  time: number;
  isCounting: boolean;
}

export const Counter = ({ time, isCounting }: CounterProps) => {
  const [initialDate, setInitialDate] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timezoneOffset = new Date(0).getTimezoneOffset() * 60 * 1000;

  useEffect(() => {
    !isRunning && isCounting && !initialDate && setInitialDate(Date.now());
    setIsRunning(isCounting);
  }, [isCounting]);

  const currentTime: Date = new Date(time + timezoneOffset);

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
