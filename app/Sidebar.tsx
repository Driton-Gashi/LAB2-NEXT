"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import NavLink from "../components/shared/NavLink";
import Footer from "../components/shared/Footer";
import { getCategories } from "../utils/api";
import { useCategory } from "@/context/CategoryContext"; // Import the context hook

type CategoryType = {
  id: number;
  name: string;
};

const Sidebar: React.FC = () => {
  const { setCategory } = useCategory(); // Access the setCategory function from context
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

  const handleCategoryChange = (categoryId: number) => {
    setCategory(categoryId); // Update the category in context
  };

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
              <NavLink href="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink href="news" activeClassName="active">
                News
              </NavLink>
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
                      onClick={() => handleCategoryChange(category.id)} // Use context-based function
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
                <img src="./pic07.jpg" alt="" />
              </a>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                dolore aliquam.
              </p>
            </article>
            <article>
              <a href="#" className="image">
                <img src="./pic08.jpg" alt="" />
              </a>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                dolore aliquam.
              </p>
            </article>
            <article>
              <a href="#" className="image">
                <img src="./pic09.jpg" alt="" />
              </a>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                dolore aliquam.
              </p>
            </article>
          </div>
        </section>

        <section>
          <header className="major">
            <h2>Get in touch</h2>
          </header>
          <p>
            Sed varius enim lorem ullamcorper dolore aliquam aenean ornare velit
            lacus, ac varius enim lorem ullamcorper dolore. Proin sed aliquam
            facilisis ante interdum. Sed nulla amet lorem feugiat tempus
            aliquam.
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

      <div onClick={toggleSidebar}  className="toggle"></div>
    </div>
  );
};

export default Sidebar;
