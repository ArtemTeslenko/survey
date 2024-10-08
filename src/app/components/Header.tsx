import React from 'react';
import { HeaderProps } from '@/app/components/types';

const Header: React.FC<HeaderProps> = ({ navContent }) => {
  return (
    <header className="header">
      <div className="header__nav">{navContent ? navContent : null}</div>

      <div className="header__logo"></div>
    </header>
  );
};

export default Header;
