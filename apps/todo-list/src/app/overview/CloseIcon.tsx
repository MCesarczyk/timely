import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { CrossIcon } from 'app/overview/CrossIcon';

export const CloseIcon = styled(CrossIcon)`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;

  stroke: ${({ theme }) =>
    (theme as DefaultTheme & { color: { suvaGray: string } }).color.suvaGray};
`;
