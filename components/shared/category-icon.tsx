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

const CategoryIcon: React.FC<{ icon: string }> = ({ icon }) => {
  const component: Record<string, JSX.Element> = {
    transportation: <EmojiTransportationOutlinedIcon />,
    entertainment: <InterestsOutlinedIcon />,
    supermarket: <ShoppingCartOutlinedIcon />,
    shopping: <ShoppingBagOutlinedIcon />,
    water: <WaterOutlinedIcon />,
    electricity: <ElectricBoltOutlinedIcon />,
    telecommunication: <LocalPhoneOutlinedIcon />,
    education: <SchoolOutlinedIcon />,
    beauty: <MoodOutlinedIcon />,
    health: <HealthAndSafetyOutlinedIcon />,
    gift: <CardGiftcardOutlinedIcon />,
  };

  return component[icon] ? component[icon] : <ReceiptOutlinedIcon />;
};

export default CategoryIcon;
