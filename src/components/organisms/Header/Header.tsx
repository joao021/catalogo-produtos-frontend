import { CartButton, Container, HeaderWrap } from "./Header.styles";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";

const Header: React.FC = ({}) => {
  return (
    <HeaderWrap>
      <Container>
        <Image width={50} height={30} src="/assets/allu-logo.png" alt="alluLogo" />
        <CartButton>
          <FaShoppingCart size={24} />
        </CartButton>
      </Container>
    </HeaderWrap>
  );
};

export default Header;
