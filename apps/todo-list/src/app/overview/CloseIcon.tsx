import styled from 'styled-components';

import { ReactComponent as CrossIcon } from './cross-icon.svg';

export const CloseIcon = styled(CrossIcon)`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;

  path {
    stroke: ${({ theme }) => theme.color.suvaGray};
  }
`;
