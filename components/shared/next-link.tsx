import MuiLink from '@mui/material/Link';
import Link, { LinkProps } from 'next/link';

type NextLinkProps = {
  href: LinkProps['href'];
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const NextLink: React.FC<NextLinkProps> = ({ href, children, ...props }) => {
  return (
    <Link href={href} passHref>
      <MuiLink {...props}>{children}</MuiLink>
    </Link>
  );
};

export default NextLink;
