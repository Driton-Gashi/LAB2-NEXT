export const fetchLatestPost = async () => {
    try {
      const response = await fetch(
        "https://ubt.dritongashi.com/wp-json/wp/v2/posts?orderby=date&order=desc&per_page=1&_embed"
      );
      if (!response.ok) throw new Error("Failed to fetch latest post");
      const data = await response.json();
      return data[0]; // Returning the latest post
    } catch (error) {
      console.error("Error fetching latest post:", error);
      throw error;
    }
  };
  
  export const fetchUsers = async () => {
    try {
      const response = await fetch("https://ubt.dritongashi.com/wp-json/wp/v2/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };
  
  export const fetchPosts = async () => {
    try {
      const response = await fetch("https://ubt.dritongashi.com/wp-json/wp/v2/posts?_embed");
      if (!response.ok) throw new Error("Failed to fetch posts");
      return await response.json();
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

  export const fetchPostsByAuthor = async (authorId: number) => {
    try {
      const response = await fetch(`https://ubt.dritongashi.com/wp-json/wp/v2/posts?author=${authorId}&_embed`);
      if (!response.ok) throw new Error("Failed to fetch posts by author");
      return await response.json();
    } catch (error) {
      console.error("Error fetching posts by author:", error);
      throw error;
    }
  };
  
  export const postById = async (postId: number) => {
    try {
      const response = await fetch(`https://ubt.dritongashi.com/wp-json/wp/v2/posts/${postId}?_embed`);
      if (!response.ok) throw new Error("Failed to fetch posts by id with this id "+ postId);
      return await response.json();
    } catch (error) {
      console.error("Error fetching posts by author:", error);
      throw error;
    }
  }

  export const getCategories = async () => {
    try {
      const response = await fetch("https://ubt.dritongashi.com/wp-json/wp/v2/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

export const searchPostsByText = async (string: string) =>{
  try{
    const response = await fetch(`https://ubt.dritongashi.com/wp-json/wp/v2/posts?search=${string}`);
    if(!response) throw new Error("Failed to search posts by search");
    return await response.json();
  }catch(error){
    console.error("error: "+error);
    throw error;
  }
}

export const postsByCategory = async (categoryId: number, pageNr:number) => {
  try {
    const response = await fetch(`https://ubt.dritongashi.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed&page=${pageNr}`);
    if (!response.ok) throw new Error("Failed to fetch posts by category");
    
    const data = await response.json();
    const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1");

    return { data, totalPages }; // Returning both data and totalPages
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


export const categoryById = async (categoryId: number)=>{
  try {
    const response = await fetch(`https://ubt.dritongashi.com/wp-json/wp/v2/categories/${categoryId}`)
    if (!response.ok) throw new Error("Failed to fetch category by id");
    return await response.json();

  } catch (error) {
    console.error("error: "+ error);
    throw error;
  }
}