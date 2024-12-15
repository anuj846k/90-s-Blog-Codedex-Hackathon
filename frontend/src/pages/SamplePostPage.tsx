import { useParams, Link, useNavigate } from "react-router-dom";
import { SiteHeader } from "../components/site-header";
import { NavBar } from "../components/nav-bar";
import { SocialLinks } from "../components/social-links";
import { ContentGrid } from "../components/content-grid";
import { RetroMediaPlayer } from "../components/retro-media-player";
import GuestBook from "../components/GuestBook";
import { ArrowLeftIcon } from "lucide-react";

const posts = [
  {
    "id": 3,
    "title": "How to fix bugs and improve UI",
    "date": "10th December 2024",
    "content": `
Introduction
In this post, I detail how I tackled some persistent bugs in my application. I walk you through the debugging process, the tools I used, and how I enhanced the user interface to make the app more intuitive. If you're struggling with UI glitches and bugs, this post might help you improve your process.

Debugging Process
1. Identify the Bug: Use error logs and user reports to pinpoint the issue.
2. Reproduce the Bug: Try to recreate the bug in a controlled environment.
3. Use Debugging Tools: Utilize tools like Chrome DevTools, React DevTools, and breakpoints.
4. Fix the Bug: Apply the necessary code changes to resolve the issue.
5. Test the Fix: Ensure the bug is fixed and hasn't caused any new issues.

UI Improvements
1. Consistent Design: Ensure all UI elements follow a consistent design language.
2. Responsive Design: Make sure your UI works well on different screen sizes.
3. Accessibility: Improve accessibility by adding ARIA labels and keyboard navigation.
4. Performance: Optimize images and reduce the number of HTTP requests.

Conclusion
By following a systematic approach to debugging and focusing on UI improvements, you can create a more stable and user-friendly application. Remember to test thoroughly and gather user feedback to continuously improve your app.
    `,
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAafSAC1ke41DkBSE1rHRgHx0pEFMBYF1luQ&s"
  },
  {
    "id": 4,
    "title": "How to integrate third-party API",
    "date": "1st December 2024",
    "content": `
Introduction
Integrating third-party APIs can be challenging, but it brings amazing functionality to your app. In this post, I share my experience integrating a popular API into my project, the problems I faced during the integration, and how I resolved them. I also provide tips on handling rate limits and error handling for APIs.

Steps to Integrate API
1. Choose the Right API: Research and select an API that fits your needs.
2. Read the Documentation: Understand the API endpoints, authentication, and rate limits.
3. Set Up Authentication: Securely store API keys and tokens.
4. Make API Requests: Use fetch or axios to make API calls.
5. Handle Responses: Process the data returned by the API and handle errors gracefully.

Error Handling
1. Retry Logic: Implement retry logic for transient errors.
2. Rate Limiting: Respect the API's rate limits to avoid being blocked.
3. Graceful Degradation: Provide fallback content if the API call fails.

Code Example
\`\`\`javascript
// Example API integration
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}
\`\`\`

Conclusion
Integrating third-party APIs can enhance your app's functionality significantly. By following best practices and handling errors gracefully, you can ensure a smooth user experience.
    `,
    "img": "https://cyclr.com/nitropack_static/VuXxlbQNhqQgnktlfMtCedOWhlGohlKT/assets/images/optimized/rev-2e200f5/cyclr.com/wp-content/uploads/2022/01/Getting-ahead-in-the-API-Economy-API-Uses-1024x569.png"
  },
  {
    "id": 5,
    "title": "The Power of Version Control with Git",
    "date": "25th September 2024",
    "content": `
   The Power of Version Control with Git
  
   Introduction
  Version control is the backbone of modern software development. In this post, I explain the basics of Git and how it has streamlined my development process. From branching to pull requests, I cover all the essential features of Git that every developer should know, along with some tips to avoid common mistakes.
  
   Git Basics
  1. Initialization: Initialize a new Git repository with \`git init\`.
  2. Commit Changes: Stage and commit changes with \`git add\` and \`git commit\`.
  3. Branching: Create and switch branches with \`git branch\` and \`git checkout\`.
  4. Merging: Merge branches with \`git merge\`.
  
   Advanced Git Features
  1. Pull Requests: Collaborate with others using pull requests.
  2. Rebasing: Rebase branches to keep a clean commit history.
  3. Stashing: Temporarily save changes with \`git stash\`.
  
  Conclusion
  Git is an essential tool for any developer. By mastering its features, you can improve your workflow and collaborate more effectively with your team.
    `,
    "img": "data:image/png;base64,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"
  },
  {
    "id": 6,
    "title": "Optimizing Performance for Mobile Devices",
    "date": "20th October 2024",
    "content": `
  Optimizing Performance for Mobile Devices
  
  Introduction
  Performance optimization is critical for mobile users. In this post, I share the techniques I used to enhance the speed and responsiveness of my web app, such as lazy loading images, reducing HTTP requests, and implementing caching strategies. If you're working on mobile-first apps, these tips will come in handy.
  
  Techniques for Optimization
  1. Lazy Loading: Load images and components only when they are needed.
  2. Reduce HTTP Requests: Minimize the number of requests by combining files and using sprites.
  3. Caching: Implement caching strategies to reduce load times.
  4. Optimize Images: Compress images to reduce their size without losing quality.
  5. Minify CSS and JavaScript: Remove unnecessary characters from your code to reduce file size.
  
  Code Example
  \`\`\`javascript
  // Lazy Loading Images
  const lazyLoad = () => {
    const images = document.querySelectorAll('img[data-src]');
    const config = {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0
    };
  
    let observer = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          preloadImage(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, config);
  
    images.forEach(image => {
      observer.observe(image);
    });
  };
  
  const preloadImage = (img) => {
    const src = img.getAttribute('data-src');
    if (!src) {
      return;
    }
    img.src = src;
  };
  
  document.addEventListener('DOMContentLoaded', lazyLoad);
  \`\`\`
  
  Conclusion
  By implementing these optimization techniques, you can significantly improve the performance of your mobile web app, providing a better user experience for your audience.
    `,
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Yz80HNI8vStqaw-fRrySoMoWqhM-M5w9zA&s"
  },
  {
    "id": 7,
    "title": "A Guide to Code Cleanup and Refactoring",
    "date": "5th October 2024",
    "content": `
  # A Guide to Code Cleanup and Refactoring
  
    Introduction
  One of the most important aspects of long-term project maintenance is keeping your codebase clean. In this post, I share my approach to refactoring my code—removing redundant code, improving variable names, and enhancing readability. Code cleanup might seem tedious, but it’s essential for keeping your project maintainable.
  
  Steps for Code Cleanup
  1. Remove Redundant Code: Identify and remove code that is no longer needed.
  2. Improve Variable Names: Use meaningful and descriptive names for variables and functions.
  3. Enhance Readability: Break down complex functions into smaller, more manageable pieces.
  4. Consistent Formatting: Use a consistent code style and formatting throughout your project.
  
  Refactoring Techniques
  1. Extract Method: Move code into a separate method to improve readability.
  2. Rename Method: Rename methods to better reflect their purpose.
  3. Inline Method: Replace a method call with the method's content if it is only used once.
  
  Code Example
  \`\`\`javascript
  // Before Refactoring
  function processOrder(order) {
    let total = 0;
    for (let i = 0; i < order.items.length; i++) {
      total += order.items[i].price;
    }
    if (order.discount) {
      total -= order.discount;
    }
    return total;
  }
  
  // After Refactoring
  function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
  }
  
  function applyDiscount(total, discount) {
    return total - discount;
  }
  
  function processOrder(order) {
    let total = calculateTotal(order.items);
    if (order.discount) {
      total = applyDiscount(total, order.discount);
    }
    return total;
  }
  \`\`\`
  
  Conclusion
  Regular code cleanup and refactoring are essential for maintaining a healthy codebase. By following these steps and techniques, you can improve the readability, maintainability, and overall quality of your code.
    `,
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJo7ooIV8LGstl_bSWFezAMS8YXzzuUXCg_A&s"
  },

  {
    "id": 8,
    "title": "How I Added Dark Mode to My App",
    "date": "15th November 2024",
    "content": `
   How I Added Dark Mode to My App
  
  Introduction
  Dark mode is becoming a staple feature in modern apps. In this post, I explain how I implemented dark mode in my app using CSS variables and JavaScript. I also discuss the challenges of designing for both dark and light themes, and how to ensure your users have the best experience no matter their preference.
  
  Implementing Dark Mode
  1. CSS Variables: Define color variables for both light and dark themes.
  2. JavaScript Toggle: Add a toggle switch to switch between themes.
  3. Persisting User Preference: Save the user's theme preference in local storage.
  
  Code Example
  \`\`\`css
  /* Define CSS Variables */
  :root {
    --background-color: #ffffff;
    --text-color: #000000;
  }
  
  [data-theme="dark"] {
    --background-color: #000000;
    --text-color: #ffffff;
  }
  
  /* Apply Variables */
  body {
    background-color: var(--background-color);
    color: var(--text-color);
  }
  \`\`\`
  
  \`\`\`javascript
  // JavaScript Toggle
  const toggleSwitch = document.querySelector('#theme-switch');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  toggleSwitch.addEventListener('change', (e) => {
    const theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
  \`\`\`
  
  Conclusion
  Adding dark mode to your app can enhance the user experience, especially in low-light environments. By using CSS variables and JavaScript, you can easily implement and manage dark mode in your application.
    `,
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN7rgNI9VJb4ZvdxC5c3ogvvP_9UKsPDII4g&s"
  },
  {
    id: 9,
    title: "Improving Documentation for Better Collaboration",
    date: "12th September 2024",
    content: `
  Improving Documentation for Better Collaboration
  
  Introduction
  Clear and concise documentation is crucial for collaborative projects. In this post, I show how I revamped my project's documentation, making it easier for new contributors to get up to speed quickly. I also discuss best practices for writing documentation that helps others understand your code and its intended use.
  
  Why Documentation Matters
  1. Onboarding New Contributors: Good documentation helps new team members understand the project quickly.
  2. Consistency: Ensures that everyone follows the same guidelines and practices.
  3. Knowledge Sharing: Facilitates the sharing of knowledge and best practices within the team.

  Best Practices for Writing Documentation
  1. Use a Clear Structure: Organize your documentation into sections such as Introduction, Installation, Usage, and API Reference.
  2. Be Concise: Keep your documentation concise and to the point.
  3. Use Examples: Provide code examples to illustrate how to use your code.
  4. Keep It Updated: Regularly update your documentation to reflect changes in the codebase.

  Example Documentation Structure
  \`\`\`markdown
  # Project Name

  Introduction
  Brief description of the project.

  Installation
  Steps to install the project.

  Usage
  Examples of how to use the project.

  API Reference
  Detailed API documentation.
\`\`\`

  Tools for Documentation
  1. **Markdown**: Use Markdown for writing documentation.
  2. **Static Site Generators**: Tools like Docusaurus or Jekyll can generate static documentation sites.
  3. **Code Comments**: Use comments in your code to generate documentation with tools like JSDoc or Sphinx.

  Conclusion
  By improving your project's documentation, you can make it easier for new contributors to get started and ensure that everyone follows the same guidelines and practices.
    `,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6_snYy2ysYCl4utlA8oXGvc6uM32dMfWRuQ&s",
  },
  {
    id: 10,
    title: "Unit Testing: A Developer's Best Friend",
    date: "30th August 2024",
    content: `
  Unit Testing: A Developer's Best Friend
  
  Introduction
  In this post, I delve into the importance of unit testing in software development. I share how I set up unit tests for my project, the testing libraries I used, and the benefits of catching bugs early in the development cycle. If you're not using unit tests, this post will explain why you should start incorporating them into your workflow.
  
  Why Unit Testing Matters
  1. Catch Bugs Early: Unit tests help catch bugs early in the development process.
  2. Ensure Code Quality: Tests ensure that your code works as expected.
  3. Facilitate Refactoring: With a good test suite, you can refactor your code with confidence.
  4. Documentation: Tests can serve as documentation for your code.

  Setting Up Unit Tests
  1. Choose a Testing Library: Popular choices include Jest, Mocha, and Jasmine.
  2. Write Test Cases: Write test cases for your functions and components.
  3. Run Tests: Run your tests regularly to ensure that your code is working as expected.

  Example Test Case
  \`\`\`javascript
  // Example using Jest
  import { sum } from './math';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
\`\`\`

  Best Practices for Unit Testing
  1. Write Tests for Critical Code: Focus on testing critical parts of your codebase.
  2. Keep Tests Simple: Write simple and clear test cases.
  3. Use Mocks and Stubs: Use mocks and stubs to isolate the code being tested.
  4. Run Tests Automatically: Integrate tests into your CI/CD pipeline to run them automatically.

  Conclusion
  Unit testing is an essential part of software development. By writing and running tests regularly, you can catch bugs early, ensure code quality, and facilitate refactoring.
    `,
    img: "https://cdn.prod.website-files.com/5eb9845c0972c01cdaec8415/61b833d53613d17360092a7e_unit-testing.png",
  },
];

function SamplePostPage() {
  const navigate = useNavigate(); 
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === parseInt(id || "0"));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neon-green text-2xl">
        Post not found
      </div>
    );
  }

  return (
    <main className="min-h-screen max-w-6xl mx-auto p-4 space-y-4">
      <SiteHeader />
      <NavBar />

      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-4">
        <aside className="space-y-4">
          <SocialLinks />
          <ContentGrid />
          <RetroMediaPlayer />
        </aside>

        <article className="bg-black/50 rounded-lg overflow-hidden border-4 border-neon-blue animate-border-pulse">
          <header className="p-4">
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
            <time className="text-neon-yellow block mt-2">{post.date}</time>
          </header>

          <div className="p-6 space-y-6">
            <img
              src={post.img}
              alt={post.title}
              className="object-cover w-full h-64 rounded-lg border-4 border-green-500/30 
                       shadow-[0_0_8px_rgba(0,255,0,0.3)] 
                       transition-all duration-300 
                       hover:shadow-[0_0_15px_rgba(0,255,0,0.5)]
                       hover:border-green-400/50
                       pixelated filter brightness-90 contrast-110"
            />

            <div className="text-neon-green space-y-4 leading-relaxed text-lg whitespace-pre-line">
              {post.content}
            </div>

            <GuestBook />
          </div>
        </article>
      </div>

      <Link
        to="/"
        className="inline-block bg-neon-pink text-black px-6 py-3 rounded-lg 
                 hover:bg-neon-yellow transition-colors duration-300 
                 font-bold text-lg"
      >
        ← Back to Home
      </Link>
    </main>
  );
}

export default SamplePostPage;
