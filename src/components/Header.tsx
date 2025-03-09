const Header = ({ type, title, subtext, userFirstName }: Header) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === 'greeting' && <span className="text-bankGradient">&nbsp; {userFirstName}</span>}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default Header;
