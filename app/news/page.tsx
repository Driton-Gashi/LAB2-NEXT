"use client"
import { useState, useEffect } from "react";
import { fetchPosts } from "@/utils/api";
import Post from "@/components/shared/Post";
import { ArrayPostType } from "@/components/shared/Type";
const News = () => {
  const [posts, setPosts] = useState<ArrayPostType[]>([]);
  
  useEffect(() => {
    const loadContent = async ()=>{
        try {
            const response  = await fetchPosts();
            setPosts(response)
        } catch (error) {
            console.error(error)
        }
    }
    loadContent();
  }, []);

  return (
    <>
      <section id="banner">
        <div className="content">
          <header>
            <h1>
             Welcome to
              <br />
             Our News Page
            </h1>
            <p>Here are our daily news Created by us</p>
          </header>
          <p>
            Aenean ornare velit lacus, ac varius enim ullamcorper eu. Proin
            aliquam facilisis ante interdum congue. Integer mollis, nisl amet
            convallis, porttitor magna ullamcorper, amet egestas mauris. Ut
            magna finibus nisi nec lacinia. Nam maximus erat id euismod egestas.
            Pellentesque sapien ac quam. Lorem ipsum dolor sit nullam.
          </p>
          <ul className="actions">
            <li>
              <a href="#" className="button big">
                Learn More
              </a>
            </li>
          </ul>
        </div>
        <span className="image object">
          <img src="./ourNewsBanner.jpg" alt="" />
        </span>
      </section>
      <section>
        <header className="major">
          <h2>Our News</h2>
        </header>
        <div className="posts">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </section>
    </>
  );
};

export default News;
