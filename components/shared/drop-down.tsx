import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
  icon: React.ReactNode;
  id?: string;
  label?: string;
  btnType?: 'text' | 'icon';
  btnSize?: 'small' | 'medium' | 'large';
};

const DropDown: React.FC<Props> = ({ children, id, icon, label, btnSize, btnType }) => {
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
      {btnType === 'icon' ? (
        <IconButton
          color="inherit"
          size={btnSize}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
          aria-controls={Boolean(anchorEl) ? `menu-${id || 'dropdown'}` : undefined}
          onClick={handleMenu}
        >
          {icon}
        </IconButton>
      ) : (
        <Button
          color="inherit"
          size={btnSize}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
          aria-controls={Boolean(anchorEl) ? `menu-${id || 'dropdown'}` : undefined}
          startIcon={icon}
          onClick={handleMenu}
        >
          {label}
        </Button>
      )}
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
