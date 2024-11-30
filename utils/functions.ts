export const shortenExcerpt = (excerpt: string, wordLimit: number) => {
  const plainText = excerpt.replace(/<[^>]+>/g, '');
  const words = plainText.split(" ");
  if (words.length <= wordLimit) return plainText;
  return words.slice(0, wordLimit).join(" ") + "...";
};

export const removeTags = (text: string) => {
  return text ? text.replace(/<[^>]+>/g, '') : '';
};