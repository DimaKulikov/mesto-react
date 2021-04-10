import logo from '../images/logo.svg'

function Header() {
  return (
    <header className="header page__header">
      <img
        className="logo"
        src={logo}
        alt="логотип Место"
      />
    </header>
  )
}

export default Header