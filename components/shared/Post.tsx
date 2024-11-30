import Link from 'next/link';
import { shortenExcerpt } from '@/utils/functions';
import { PostType } from './Type';


const Post = ({ post }: PostType) => {
 const authors: { [key: string]: string } = {
  "1": "Driton Gashi",
};
  const image = post._embedded['wp:featuredmedia'][0].source_url;

  return (
    <article>
      <a href="#" className="image">
        <img src={image} alt="" />
      </a>
      <h3>{post.title.rendered}</h3>
      <p>{shortenExcerpt(post.excerpt.rendered, 40)}</p>
      <p>
        <strong>
          By <a href={`author/${post.author}`}>{authors[post.author] || "Unkown Author"}</a>
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
