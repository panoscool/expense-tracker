import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EmojiTransportationOutlinedIcon from '@mui/icons-material/EmojiTransportationOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import MoneyOffOutlinedIcon from '@mui/icons-material/MoneyOffOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';

const CategoryIcon: React.FC<{ icon: string }> = ({ icon }) => {
  const component: Record<string, JSX.Element> = {
    transportation: <EmojiTransportationOutlinedIcon />,
    entertainment: <InterestsOutlinedIcon />,
    supermarket: <ShoppingCartOutlinedIcon />,
    shopping: <ShoppingBagOutlinedIcon />,
    bills: <MoneyOffOutlinedIcon />,
    beauty: <MoodOutlinedIcon />,
    health: <HealthAndSafetyOutlinedIcon />,
    gift: <CardGiftcardOutlinedIcon />,
  };

  return component[icon] ? component[icon] : <ReceiptOutlinedIcon />;
};

export default CategoryIcon;
