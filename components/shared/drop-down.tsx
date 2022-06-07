import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
  icon: React.ReactNode;
  id?: string;
  btnSize?: 'small' | 'medium' | 'large';
};

const DropDown: React.FC<Props> = ({ children, id, icon, btnSize }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    // close menu when clicking any of the children
    if (anchorEl && event.target !== anchorEl) {
      setAnchorEl(null);
    }
  };

  return (
    <div>
      <IconButton
        size={btnSize}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        aria-controls={Boolean(anchorEl) ? `menu-${id || 'dropdown'}` : undefined}
        onClick={handleMenu}
        color="inherit"
      >
        {icon}
      </IconButton>
      <Menu
        id={`menu-${id || 'dropdown'}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        {children}
      </Menu>
    </div>
  );
};

export default DropDown;
