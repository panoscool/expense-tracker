import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EmojiTransportationOutlinedIcon from '@mui/icons-material/EmojiTransportationOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

type Props = {
  icon: string;
  size?: 'small' | 'medium' | 'large';
};

const CategoryIcon: React.FC<Props> = ({ icon, size }) => {
  const component: Record<string, JSX.Element> = {
    transportation: <EmojiTransportationOutlinedIcon fontSize={size} />,
    entertainment: <InterestsOutlinedIcon fontSize={size} />,
    supermarket: <ShoppingCartOutlinedIcon fontSize={size} />,
    shopping: <ShoppingBagOutlinedIcon fontSize={size} />,
    water: <WaterOutlinedIcon fontSize={size} />,
    electricity: <ElectricBoltOutlinedIcon fontSize={size} />,
    telecommunication: <LocalPhoneOutlinedIcon fontSize={size} />,
    education: <SchoolOutlinedIcon fontSize={size} />,
    beauty: <MoodOutlinedIcon fontSize={size} />,
    health: <HealthAndSafetyOutlinedIcon fontSize={size} />,
    gift: <CardGiftcardOutlinedIcon fontSize={size} />,
  };

  return component[icon] ? component[icon] : <ReceiptOutlinedIcon />;
};

export default CategoryIcon;
