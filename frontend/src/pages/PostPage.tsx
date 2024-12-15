import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../context/AuthContext";
import { Post } from "../components/types/post";
import { NavBar } from "../components/nav-bar";
import { SocialLinks } from "../components/social-links";
import { ContentGrid } from "../components/content-grid";
import { RetroMediaPlayer } from "../components/retro-media-player";
import GuestBook from "../components/GuestBook";
import { ArrowLeftIcon } from "lucide-react";

export function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        if (response.data.status === "success") {
          setPost(response.data.data.post);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-green-400">Loading... Pls wait as the server is loading it may take 30s </div>;
  }

  if (!post) {
    return <div className="text-green-400">Post not found</div>;
  }

  return (
    <main className="min-h-screen max-w-6xl mx-auto p-4 space-y-4">
      {/* <SiteHeader /> */}

      <NavBar />

      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-4">
        <aside className="space-y-4">
          <SocialLinks />
          <ContentGrid />
          <RetroMediaPlayer />
        </aside>

        <article className="bg-black/50 rounded-lg overflow-hidden border-4 border-neon-blue animate-border-pulse">
          <header className={`p-4`}>
          <div className="flex items-center space-x-2">
              <button 
                onClick={() => navigate(-1)}
                className="text-neon-green hover:text-neon-yellow border-2 border-neon-green 
                         rounded-md p-1 transition-all duration-300 hover:border-neon-yellow"
              >
                <ArrowLeftIcon size={30} />
              </button>
              <h1 className="text-4xl font-bold text-neon-green">
                {post.title}
              </h1>
            </div>
            <time className="text-neon-yellow">{post.date}</time>
          </header>

          <div className="p-4 space-y-4">
            <img
              src={post.image}
              alt={post.title}
              className="mx-auto rounded-lg pixelated
    border-4 border-neon-blue/50
    shadow-[0_0_20px_rgba(0,255,255,0.3)]
    transition-transform duration-300 hover:scale-105
    filter brightness-95 contrast-110 saturate-110
    max-w-[400px] w-full h-auto aspect-video object-cover"
            />
            <p className="text-neon-green">{post.content}</p>

            <GuestBook />
          </div>
        </article>
      </div>

      <Link
        to="/"
        className="inline-block bg-neon-pink text-black px-4 py-2 rounded hover:bg-neon-yellow transition-colors"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
