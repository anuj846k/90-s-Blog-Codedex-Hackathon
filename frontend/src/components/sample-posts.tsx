import { useState } from 'react'
import { Link } from "react-router-dom"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function SamplePosts() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 3
  const posts = [
    {
      "id": 3,
      "title": "How to fix bugs and improve UI",
      "date": "10th December 2024",
      "content": "In this post, I detail how I tackled some persistent bugs in my application. I walk you through the debugging process, the tools I used, and how I enhanced the user interface to make the app more intuitive. If you're struggling with UI glitches and bugs, this post might help you improve your process.",
      "img": "/p1.jpg"
    },
    {
      "id": 4,
      "title": "How to integrate third-party API",
      "date": "1st December 2024",
      "content": "Integrating third-party APIs can be challenging, but it brings amazing functionality to your app. In this post, I share my experience integrating a popular API into my project, the problems I faced during the integration, and how I resolved them. I also provide tips on handling rate limits and error handling for APIs.",
      "img": "/p2.jpeg"
    },
    {
      "id": 5,
      "title": "The Power of Version Control with Git",
      "date": "25th September 2024",
      "content": "Version control is the backbone of modern software development. In this post, I explain the basics of Git and how it has streamlined my development process. From branching to pull requests, I cover all the essential features of Git that every developer should know, along with some tips to avoid common mistakes.",
      "img": "/p6.jpeg"
    },
    {
      "id": 6,
      "title": "Optimizing Performance for Mobile Devices",
      "date": "20th October 2024",
      "content": "Performance optimization is critical for mobile users. In this post, I share the techniques I used to enhance the speed and responsiveness of my web app, such as lazy loading images, reducing HTTP requests, and implementing caching strategies. If you're working on mobile-first apps, these tips will come in handy.",
      "img": "/p4.jpeg"
    },
    {
      "id": 7,
      "title": "A Guide to Code Cleanup and Refactoring",
      "date": "5th October 2024",
      "content": "One of the most important aspects of long-term project maintenance is keeping your codebase clean. In this post, I share my approach to refactoring my code—removing redundant code, improving variable names, and enhancing readability. Code cleanup might seem tedious, but it's essential for keeping your project maintainable.",
      "img": "/p5.jpeg"
    },
    
    {
      "id": 8,
      "title": "How I Added Dark Mode to My App",
      "date": "15th November 2024",
      "content": "Dark mode is becoming a staple feature in modern apps. In this post, I explain how I implemented dark mode in my app using CSS variables and JavaScript. I also discuss the challenges of designing for both dark and light themes, and how to ensure your users have the best experience no matter their preference.",
      "img": "/p3.jpeg"
    },
    {
      "id": 9,
      "title": "Improving Documentation for Better Collaboration",
      "date": "12th September 2024",
      "content": "Clear and concise documentation is crucial for collaborative projects. In this post, I show how I revamped my project's documentation, making it easier for new contributors to get up to speed quickly. I also discuss best practices for writing documentation that helps others understand your code and its intended use.",
      "img": "/p7.jpeg"
    },
    {
      "id": 10,
      "title": "Unit Testing: A Developer's Best Friend",
      "date": "30th August 2024",
      "content": "In this post, I delve into the importance of unit testing in software development. I share how I set up unit tests for my project, the testing libraries I used, and the benefits of catching bugs early in the development cycle. If you're not using unit tests, this post will explain why you should start incorporating them into your workflow.",
      "img": "/p8.jpeg"
    }
  ]

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <section className="bg-transparent text-green-400 p-4 font-['VT323'] tracking-wider">
      <div className="flex flex-col md:flex-row space-x-2 mb-4">
        <img src="n3.gif" alt="" className="pixelated" />
        <img src="n2.gif" alt="" className="pixelated" />
      </div>
      
      {currentPosts.map((post) => (
        <Link 
          to={`/sample-post/${post.id}`} 
          key={post.id}
          className="block mb-6 group transform transition-all duration-300 hover:scale-102 hover:-translate-y-1"
        >
          <article className="
            relative
            border-2 border-neon-green 
            bg-black/80 
            rounded-lg
            overflow-hidden
            transition-all 
            duration-300 
            hover:border-neon-blue
            hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]
            before:content-['']
            before:absolute
            before:inset-0
            before:bg-gradient-to-r
            before:from-transparent
            before:via-neon-green/5
            before:to-transparent
            before:translate-x-[-200%]
            hover:before:translate-x-[200%]
            before:transition-transform
            before:duration-1000
          ">
            <header className="p-4 flex items-center space-x-4 border-b border-neon-green/30">
              <div className="w-20 h-20 relative overflow-hidden rounded-lg border-2 border-neon-green/50">
                <img
                  src={post.img}
                  alt={`${post.title} thumbnail`}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div>
                <h2 className="text-neon-green font-bold text-2xl uppercase tracking-wider group-hover:text-neon-blue transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-neon-pink">
                  {post.date}
                </time>
              </div>
            </header>
            <div className="p-4">
              <p className="text-green-300 text-lg leading-relaxed line-clamp-3">
                {post.content}
              </p>
            </div>
          </article>
        </Link>
      ))}
      
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      {/* CRT Screen Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
        <div className="absolute inset-0 bg-[rgba(0,255,0,0.1)] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' width='5' height='5'&gt;&lt;pattern id='p' width='5' height='5' patternUnits='userSpaceOnUse'&gt;&lt;rect width='1' height='1' fill='%23000'/&gt;&lt;/pattern&gt;&lt;rect width='5' height='5' fill='url(%23p)'/&gt;&lt;/svg&gt;&quot;)] opacity-20"></div>
      </div>
    </section>
  )
}

