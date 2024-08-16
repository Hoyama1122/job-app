import logo from "../assets/images/logo.svg";
import PropTypes from "prop-types";

const Logo = ({ className }) => {
  return <img src={logo} alt="LogoMain" className={className} />;
};

Logo.propTypes = {
  className: PropTypes.string
};

export default Logo;
