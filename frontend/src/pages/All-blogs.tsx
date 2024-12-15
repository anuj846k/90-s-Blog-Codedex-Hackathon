import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { api } from '../context/AuthContext'
import { Post } from '../components/types/post';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { NavBar } from '@/components/nav-bar';

export function BlogPosts() {
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const postsPerPage = 6

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        if (response.data.status === 'success') {
          const formattedPosts = response.data.data.posts.map((post: Post) => ({
            ...post,
            id: post._id,
            date: new Date(post.createdAt).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            // Truncate content to ~150 words
            content: post.content.split(' ').slice(0, 150).join(' ') + '...'
          }));
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return <div className="text-green-400">Loading... Pls wait as the server is loading it may take 30s </div>
  }

  return (
    <section className="bg-transparent text-green-400 p-4 font-['VT323'] tracking-wider">
     
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-green-400 text-5xl font-bold mb-4">All Blogs</h1>
      </div>
      
      <NavBar />
      <div className="flex flex-col md:flex-row space-x-2 mb-4 items-center justify-center mt-3">
        <img src="n3.gif" alt="" className="pixelated" />
        <img src="n1.gif" alt="" className="pixelated" />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentPosts.map((post) => (
            <Link 
              to={`/post/${post._id}`} 
              key={post._id}
              className="block group hover:transform hover:scale-105 transition-all duration-300 h-full"
            >
              <div className="bg-black/40 border border-neon-green/30 rounded-lg overflow-hidden shadow-lg hover:shadow-neon-green/20 p-4 h-full flex flex-col">
                <div className="aspect-w-16 aspect-h-9 mb-4 flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-48 rounded"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-neon-green mb-2 group-hover:text-green-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  {/* Tags Section */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 text-xs 
                                   bg-neon-green/10 text-neon-green border border-neon-green/30 
                                   rounded-md font-['VT323'] tracking-wider
                                   group-hover:border-neon-green/50 group-hover:shadow-[0_0_5px_rgba(57,255,20,0.3)]
                                   transition-all duration-300"
                        >
                          <span className="mr-1">
                            {tag === 'coding' && '⌨️'}
                            {tag === 'tech' && '🖥️'}
                            {tag === 'retro' && '👾'}
                            {tag === 'gaming' && '🎮'}
                            {tag === 'web' && '🌐'}
                            {tag === 'design' && '🎨'}
                            {tag === 'tutorial' && '📚'}
                            {tag === 'news' && '📰'}
                          </span>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                    {post.content}
                  </p>
                  
                  <div className="flex flex-wrap justify-between items-center text-sm text-gray-400 mt-auto pt-3 border-t border-neon-green/20">
                    <span className="text-neon-purple">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-neon-green group-hover:text-green-400 flex items-center">
                      Read more 
                      <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination controls - if you have them */}
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`
                    ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    text-green-400 hover:text-green-300
                  `}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                    className={`
                      ${currentPage === index + 1 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'text-green-400 hover:bg-green-500/10'
                      }
                      border border-green-500/30
                    `}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`
                    ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    text-green-400 hover:text-green-300
                  `}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      
      {/* CRT Screen Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
        <div className="absolute inset-0 bg-[rgba(0,255,0,0.1)] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' width='5' height='5'&gt;&lt;pattern id='p' width='5' height='5' patternUnits='userSpaceOnUse'&gt;&lt;rect width='1' height='1' fill='%23000'/&gt;&lt;/pattern&gt;&lt;rect width='5' height='5' fill='url(%23p)'/&gt;&lt;/svg&gt;&quot;)] opacity-20"></div>
      </div>
    </section>
  )
}

