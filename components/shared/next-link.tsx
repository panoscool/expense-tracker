import Link, { LinkProps } from 'next/link';
import MuiLink from '@mui/material/Link';
import Button from '@mui/material/Button';

type NextLinkProps = {
  href: LinkProps['href'];
  children: React.ReactNode;
  type?: 'button';
  style?: React.CSSProperties;
};

const NextLink: React.FC<NextLinkProps> = ({ type, href, children, ...props }) => {
  if (type === 'button') {
    <Link href={href} passHref>
      <Button {...props}>{children}</Button>
    </Link>;
  }

  return (
    <Link href={href} passHref>
      <MuiLink {...props}>{children}</MuiLink>
    </Link>
  );
};

export default NextLink;
