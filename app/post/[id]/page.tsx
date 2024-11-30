"use client";
import { postById } from "@/utils/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { removeTags } from "@/utils/functions";
import { log } from "console";

type PostByID = {
  id: number;
  title: { rendered: string };
  date: string;
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded: {
    "wp:featuredmedia": [
      {
        source_url: string;
      }
    ];
  };
};

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostByID | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!id) {
          throw new Error("Invalid post ID");
        }
        const postFetched = await postById(Number(id));
        setPost(postFetched);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  const { title, date, excerpt, content, _embedded } = post;

  return (
    <section id="banner">
      <div className="content">
        <header>
          <h1>{title.rendered}</h1>
          <p>
            {date &&
              formatDistanceToNow(new Date(date), {
                addSuffix: true,
              })}
          </p>
        </header>
        <p>{removeTags(excerpt.rendered)}</p>
        <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
      </div>
      <span className="image object">
        {_embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
          <img
            src={_embedded["wp:featuredmedia"][0].source_url}
            alt={title.rendered}
          />
        ) : (
          <p>No image available</p>
        )}
      </span>
    </section>
  );
};

export default SinglePost;
