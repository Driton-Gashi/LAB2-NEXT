"use client"
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import Post from "@/components/shared/Post";
import { fetchLatestPost, fetchUsers, fetchPosts } from "@/utils/api";
import Link from "next/link";
import { LatestPost, User } from "@/components/shared/Type";
import { ArrayPostType } from "@/components/shared/Type";

const Home = () => {
  const [posts, setPosts] = useState<ArrayPostType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [latestPost, setLatestPost] = useState<LatestPost | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const latestPostData = await fetchLatestPost();
        setLatestPost(latestPostData);

        const usersData = await fetchUsers();
        setUsers(usersData);

        const postsData = await fetchPosts();
        setPosts(postsData);

      } catch (error) {
        console.error("Error loading content:", error);
      }
    };
    
    loadContent();
  }, []);

  // Utility function to shorten excerpts
const removeTags = (excerpt:string) => {
  const plainText = excerpt.replace(/<[^>]+>/g, ''); 
  return plainText.toString();
};

  return (
    <>
      <section id="banner">
        <div className="content">
          <header>
            <h1>
              {latestPost?.title?.rendered}
            </h1>
            <p>
              {latestPost &&
                formatDistanceToNow(new Date(latestPost.date), {
                  addSuffix: true,
                })}
            </p>
          </header>
          <p>
          {latestPost && removeTags(latestPost.excerpt.rendered)}
          </p>
          <ul className="actions">
            <li>
              <Link href={`post/${latestPost && latestPost.id}`} className="button big">
                Read More
              </Link>
            </li>
          </ul>
        </div>
        <span className="image object">
          <img src={latestPost ? latestPost?._embedded?.['wp:featuredmedia'][0].source_url : "./loading.gif"} alt="" />
        </span>
      </section>

      <section>
        <header className="major">
          <h2>Authors</h2>
        </header>
        <div className="features">
          {users.map((user) => (
            <article title="Click To Read All Posts from this Author" key={user.id}>
              <a style={{ border: "0" }} href={`/author/${user.id}`}>
                <span className="icon">
                  <img style={{ transform: "rotate(45deg)" }} src={user.avatar_urls["96"]} alt="" />
                </span>
              </a>
              <div className="content">
                <a href={`/author/${user.id}`}>
                  <h3>{user.name}</h3>
                </a>
                <p>
                  {user.description
                    ? user.description
                    : "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam."}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <header className="major">
          <h2>Latest News</h2>
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

export default Home;
