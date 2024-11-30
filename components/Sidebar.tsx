import { useState, useEffect } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import Footer from "./Footer";
import { getCategories } from "../utils/api";

type SidebarProps = {
  changeCategoryName: (categoryId: number) => void; // Adjusted return type to `void`
};

type CategoryType = {
  id: number;
  name: string;
};

const Sidebar = ({ changeCategoryName }: SidebarProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [isFirstSubmenuActive, setIsFirstSubmenuActive] = useState(false);
  const [isSecondSubmenuActive, setIsSecondSubmenuActive] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const categoriesFetched = await getCategories();
        setCategories(categoriesFetched);
      } catch (error) {
        console.error("Error loading content:", error);
      }
    };

    loadContent();
  }, []);

  const toggleSidebar = () => setSidebarActive(!sidebarActive);
  const toggleFirstMenu = () => setIsFirstSubmenuActive(!isFirstSubmenuActive);
  const toggleSecondMenu = () => setIsSecondSubmenuActive(!isSecondSubmenuActive);

  return (
    <div id="sidebar" className={sidebarActive ? "" : "inactive"}>
      <div className="inner">
        <section id="search" className="alt">
          <form method="post" action="#">
            <input type="text" name="query" id="query" placeholder="Search" />
          </form>
        </section>

        <nav id="menu">
          <header className="major">
            <h2>Menu</h2>
          </header>
          <ul>
            <li>
              <NavLink href="/" activeClassName="active">Homepage</NavLink>
            </li>
            <li>
              <NavLink href="our-news" activeClassName="active">Our News</NavLink>
            </li>
            <li>
              <span
                className={`opener ${isFirstSubmenuActive ? "active" : ""}`}
                onClick={toggleFirstMenu}
              >
                Sipas Kategorive
              </span>
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>
                    <NavLink
                      href={`/news-by-category/${category.id}`}
                      onClick={() => changeCategoryName(category.id)} // Adjusted to pass category id
                      activeClassName="active"
                    >
                      {category.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <span
                className={`opener ${isSecondSubmenuActive ? "active" : ""}`}
                onClick={toggleSecondMenu}
              >
                Another Submenu
              </span>
              <ul>
                <li>
                  <a href="#">Lorem Dolor</a>
                </li>
                <li>
                  <a href="#">Ipsum Adipiscing</a>
                </li>
                <li>
                  <a href="#">Tempus Magna</a>
                </li>
                <li>
                  <a href="#">Feugiat Veroeros</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <section>
          <header className="major">
            <h2>Ante interdum</h2>
          </header>
          <div className="mini-posts">
            <article>
              <a href="#" className="image">
                <img src="images/pic07.jpg" alt="" />
              </a>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam.
              </p>
            </article>
            <article>
              <a href="#" className="image">
                <img src="images/pic08.jpg" alt="" />
              </a>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam.
              </p>
            </article>
            <article>
              <a href="#" className="image">
                <img src="images/pic09.jpg" alt="" />
              </a>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam.
              </p>
            </article>
          </div>
        </section>

        <section>
          <header className="major">
            <h2>Get in touch</h2>
          </header>
          <p>
            Sed varius enim lorem ullamcorper dolore aliquam aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin sed aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.
          </p>
          <ul className="contact">
            <li className="icon solid fa-envelope">
              <a href="#">information@untitled.tld</a>
            </li>
            <li className="icon solid fa-phone">(000) 000-0000</li>
            <li className="icon solid fa-home">
              1234 Somewhere Road #8254
              <br />
              Nashville, TN 00000-0000
            </li>
          </ul>
        </section>

        <Footer />
      </div>

      <NavLink href="#" className="toggle" activeClassName="active">
        Toggle
      </NavLink>
    </div>
  );
};

export default Sidebar;
