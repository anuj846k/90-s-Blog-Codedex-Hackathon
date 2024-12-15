export interface Post {
  _id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  authorMetadata: {
    name: string;
    email: string;
  };
  createdAt: string;
}
