import { CartButton, Container, HeaderWrap, Imagelogo } from "./Header.styles";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/router";

const Header: React.FC = ({}) => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/products");
  };

  return (
    <HeaderWrap>
      <Container>
        <Imagelogo
          onClick={handleLogoClick}
          width={50}
          height={30}
          src="/assets/allu-logo.png"
          alt="alluLogo"
        />
        <CartButton>
          <FaShoppingCart size={24} />
        </CartButton>
      </Container>
    </HeaderWrap>
  );
};

export default Header;
