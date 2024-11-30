type PostType = {
  post: {
  title: {rendered: string},
  link: string,
  excerpt: {rendered: string},
  _embedded: {
    'wp:featuredmedia': [
      {
        source_url: string;
      }
    ];
  };

  }
}

const Post = ({ post }: PostType) => {
    const image = post._embedded['wp:featuredmedia'][0].source_url;
    return (
      <article>
        <a href={post.link} className="image">
          <img src={image} alt="" />
        </a>
        <h3>{post.title.rendered}</h3>
        <p>
       {post.excerpt.rendered}
        </p>
        <ul className="actions">
          <li>
          <a href={post.link} className="button">
            More
          </a>
          </li>
        </ul>
      </article>
    );
  };
  
  export default Post;
  