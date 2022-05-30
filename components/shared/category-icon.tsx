import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EmojiTransportationOutlinedIcon from '@mui/icons-material/EmojiTransportationOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import MoneyOffOutlinedIcon from '@mui/icons-material/MoneyOffOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import GirlOutlinedIcon from '@mui/icons-material/GirlOutlined';

const CategoryIcon: React.FC<{ icon: string }> = ({ icon }) => {
  const component: Record<string, JSX.Element> = {
    supermarket: <ShoppingCartOutlinedIcon />,
    transportation: <EmojiTransportationOutlinedIcon />,
    health: <HealthAndSafetyOutlinedIcon />,
    shopping: <ShoppingBagOutlinedIcon />,
    gift: <CardGiftcardOutlinedIcon />,
    leisure: <InterestsOutlinedIcon />,
    bills: <MoneyOffOutlinedIcon />,
    beauty: <GirlOutlinedIcon />,
  };

  return component[icon] ? component[icon] : <CategoryOutlinedIcon />;
};

export default CategoryIcon;
