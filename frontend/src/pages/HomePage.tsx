
import { SiteHeader } from "../components/site-header";
import { NavBar } from "../components/nav-bar";
import { SocialLinks } from "../components/social-links";
import { ContentGrid } from "../components/content-grid";
import { RetroMediaPlayer } from "../components/retro-media-player";
import { Footer } from "@/components/footer";
import SamplePosts from "@/components/sample-posts";
function HomePage() {
  return (
    <main className="min-h-screen max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex  flex-col md:flex-row justify-center items-center space-x-4 mb-4">
        <img src="n1.gif" alt=""/>
        <img src="t2.gif" alt="" />
        <img src="t3.gif" alt="" />
       
      </div>
      <SiteHeader />

      <div className="text-center font-['VT323'] text-neon-pink bg-black/50 p-2 rounded border border-neon-pink animate-border-pulse text-2xl">
        Welcome to <span className="text-neon-green">90's Blogs</span>, a website dedicated to developer blogs. Here you can find articles, tutorials, and insights from developers around the world. Join us to share your knowledge and learn from others.
      </div>

      <NavBar />

      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-4">
        <aside className="space-y-4">
          <SocialLinks />
          <ContentGrid />
          <RetroMediaPlayer />
        </aside>

        <SamplePosts />
      </div>
        <Footer />
    </main>
  );
}

export default HomePage;
