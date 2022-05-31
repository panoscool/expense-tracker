import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
  icon: React.ReactNode;
  id?: string;
};

const DropDown: React.FC<Props> = ({ children, id, icon }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        aria-controls={Boolean(anchorEl) ? `menu-${id || 'dropdown'}` : undefined}
        onClick={handleMenu}
        sx={{ color: '#fff' }}
      >
        {icon}
      </IconButton>
      <Menu
        id={`menu-${id || 'dropdown'}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </div>
  );
};

export default DropDown;
