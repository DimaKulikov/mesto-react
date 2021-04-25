import logo from '../images/logo.svg'

export const Header = () => (
  <header className="header page__header">
    <img
      className="logo"
      src={logo}
      alt="логотип Место"
    />
  </header>
)