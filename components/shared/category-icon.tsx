import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import EmojiTransportationOutlinedIcon from '@mui/icons-material/EmojiTransportationOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';

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
    subscription: <RepeatOutlinedIcon fontSize={size} />,
    education: <SchoolOutlinedIcon fontSize={size} />,
    beauty: <MoodOutlinedIcon fontSize={size} />,
    health: <HealthAndSafetyOutlinedIcon fontSize={size} />,
    gift: <CardGiftcardOutlinedIcon fontSize={size} />,
  };

  return component[icon] ? component[icon] : <ReceiptOutlinedIcon fontSize={size} />;
};

export default CategoryIcon;
