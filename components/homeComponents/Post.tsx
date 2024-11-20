import Link from "next/link";
// Utility function to shorten excerpts

type PostType = {
  post: {
    id: number,
  title: {rendered: string},
  author: string,
  // date: string ,
  excerpt: {rendered: string},
  _embedded?: {
    'wp:featuredmedia': [
      {
        source_url: string;
      }
    ];
  };

  }
}

const shortenExcerpt = (excerpt: string, wordLimit: number) => {
  const plainText = excerpt.replace(/<[^>]+>/g, ''); 
  const words = plainText.split(" ");
  if (words.length <= wordLimit) return plainText;
  return words.slice(0, wordLimit).join(" ") + "...";
};

const Post = ({ post }: PostType) => {
  const authors: {[key: string]: string} = {
    "1": "Driton Gashi",
  };

  const image = post?._embedded?.['wp:featuredmedia'][0].source_url;

  return (
    <article>
      <a href="#" className="image">
        <img src={image} alt="" />
      </a>
      <h3>{post.title.rendered}</h3>
      <p>{shortenExcerpt(post.excerpt.rendered, 40)}</p>
      <p>
        <strong>
          By <a href={`author/${post.author}`}>{authors[post.author]}</a>
        </strong>
      </p>
      <ul className="actions">
        <li>
          <Link href={`post/${post.id}`} className="button">
            Read More
          </Link>
        </li>
      </ul>
    </article>
  );
};

export default Post;
