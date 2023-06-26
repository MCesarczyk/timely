import styled from 'styled-components';

import { ReactComponent as CrossIcon } from './cross-icon.svg';

export const CloseIcon = styled(CrossIcon)`
  position: absolute;
  top: 35px;
  right: 35px;
  width: 15px;
  height: 15px;
  cursor: pointer;

  path {
    stroke: ${({ theme }) => theme.color.suvaGray};
  }
`;
