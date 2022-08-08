import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { useId, useState } from 'react';

type Props = {
  children: React.ReactNode;
  icon: React.ReactNode;
  label?: string;
  disabled?: boolean;
  btnType: 'text' | 'icon';
  btnSize?: 'small' | 'medium' | 'large';
  iconEdge?: 'start' | 'end';
};

const DropDown: React.FC<Props> = ({ children, icon, btnType, label, btnSize, disabled, iconEdge }) => {
  const id = useId();
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
      {btnType === 'icon' && (
        <IconButton
          id={`${id}-menu-button`}
          color="inherit"
          edge={iconEdge || 'end'}
          size={btnSize}
          disabled={disabled}
          aria-haspopup="true"
          aria-label="dropdown-menu"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
          aria-controls={Boolean(anchorEl) ? `${id}-dropdown-menu` : undefined}
          onClick={handleMenu}
        >
          {icon}
        </IconButton>
      )}
      {btnType === 'text' && (
        <Button
          id={`${id}-menu-button`}
          color="inherit"
          size={btnSize}
          disabled={disabled}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
          aria-controls={Boolean(anchorEl) ? `${id}-dropdown-menu` : undefined}
          startIcon={icon}
          onClick={handleMenu}
        >
          {label}
        </Button>
      )}
      <Menu
        id={`${id}-dropdown-menu`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': `${id}-menu-button`,
        }}
      >
        {children}
      </Menu>
    </div>
  );
};

export default DropDown;
