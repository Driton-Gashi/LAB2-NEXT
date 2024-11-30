export type LatestPost = {
  id: number,
  title: { rendered: string },
  date: string,
  excerpt: { rendered: string },
  _embedded?: {
    'wp:featuredmedia': [
      {
        source_url: string;
      }
    ];
  };
}

export type User = {
  id: number,
  avatar_urls: { [key: string]: string };
  name: string,
  description: string
}

export type PostType = {
  post: {
    id?: number,
    title: { rendered: string },
    link: string,
    author: string,
    excerpt: { rendered: string },
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url: string;
        }
      ];
    };
  }
}

export type ArrayPostType = {
    id?: number,
    title: { rendered: string },
    link: string,
    author: string,
    excerpt: { rendered: string },
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url: string;
        }
      ];
    };
}