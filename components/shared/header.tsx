import Link from "next/link"
const Header = () => {
    return (
      <header id="header">
          <div className="logo">
            <strong>LAB 2 Project</strong>
          </div>
          <ul className="icons">
            <li>
              <Link href="#" className="icon brands fa-twitter">
                <span className="label">Twitter</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="icon brands fa-facebook-f">
                <span className="label">Facebook</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="icon brands fa-snapchat-ghost">
                <span className="label">Snapchat</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="icon brands fa-instagram">
                <span className="label">Instagram</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="icon brands fa-medium-m">
                <span className="label">Medium</span>
              </Link>
            </li>
          </ul>
        </header>
    )
  }
  
  export default Header