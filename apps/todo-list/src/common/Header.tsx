import { Switcher } from 'common/languages/Switcher';
import { descriptions } from 'common/languages/descriptions';
import { HeaderWrapper } from 'common/HeaderWrapper';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => (
  <header>
    <HeaderWrapper>
      <h1>{title}</h1>
      <Switcher descriptions={descriptions} />
    </HeaderWrapper>
  </header>
);
