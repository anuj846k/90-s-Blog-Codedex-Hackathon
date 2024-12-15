import React, { useState } from 'react';
import { api } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { NavBar } from '@/components/nav-bar';
import { SocialLinks } from '@/components/social-links';
import { ContentGrid } from '@/components/content-grid';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';

interface PostFormData {
  title: string;
  content: string;
  tags: string[];
  isPublished: boolean;
  image?: string;
}

const predefinedTags = [
  { name: 'coding', icon: '⌨️' },
  { name: 'tech', icon: '🖥️' },
  { name: 'retro', icon: '👾' },
  { name: 'gaming', icon: '🎮' },
  { name: 'web', icon: '🌐' },
  { name: 'design', icon: '🎨' },
  { name: 'tutorial', icon: '📚' },
  { name: 'news', icon: '📰' }
];

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    tags: [],
    isPublished: true,
    image: ''
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setCustomTag(value);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleTagClick = (tagName: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName];
      setFormData(prev => ({ ...prev, tags: newTags }));
      return newTags;
    });
  };

  const handleAddCustomTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customTag.trim()) {
      e.preventDefault();
      const newTag = customTag.trim().toLowerCase();
      if (!selectedTags.includes(newTag)) {
        setSelectedTags(prev => {
          const newTags = [...prev, newTag];
          setFormData(prev => ({ ...prev, tags: newTags }));
          return newTags;
        });
      }
      setCustomTag('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/posts', {
        ...formData,
        name: user?.firstname + ' ' + user?.lastname,
        email: user?.username
      });

      if (response.data.status === 'success') {
        toast.success('Post created successfully!');
        navigate('/all-blogs');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  return (
    <main className="min-h-screen max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex flex-col md:flex-row justify-center items-center space-x-4 mb-4">
        <img src="n1.gif" alt=""/>
        <img src="t2.gif" alt="" />
        <img src="t3.gif" alt="" />
      </div>
      
      <SiteHeader />

      <div className="text-center font-['VT323'] text-neon-pink bg-black/50 p-2 rounded border border-neon-pink animate-border-pulse text-2xl">
        Create and Share Your Developer Stories
      </div>

      <NavBar />

      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-4">
        <aside className="space-y-4">
          <SocialLinks />
          <ContentGrid />
        </aside>

        <div className="bg-black/80 border-2 border-neon-green rounded-lg p-6 shadow-[0_0_15px_rgba(57,255,20,0.5)]">
          <h1 className="text-center text-neon-yellow text-4xl mb-8 font-['VT323'] animate-pulse">
            Create New Blog Post
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-neon-blue mb-2 font-['VT323']">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 bg-black/80 border border-neon-green text-neon-green font-['VT323'] text-lg 
                           focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(57,255,20,0.5)]
                           placeholder-neon-green/50"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-neon-blue mb-2 font-['VT323']">
                Content:
              </label>
              <textarea
                id="content"
                name="content"
                rows={8}
                value={formData.content}
                onChange={handleChange}
                required
                className="w-full p-3 bg-black/80 border border-neon-green text-neon-green font-['VT323'] text-lg 
                           focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(57,255,20,0.5)]"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-neon-blue mb-2 font-['VT323']">
                Image URL:
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full p-3 bg-black/80 border border-neon-green text-neon-green font-['VT323'] text-lg 
                           focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(57,255,20,0.5)]
                           placeholder-neon-green/50"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-neon-blue mb-2 font-['VT323']">
                Select Tags:
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {predefinedTags.map((tag) => (
                  <button
                    key={tag.name}
                    type="button"
                    onClick={() => handleTagClick(tag.name)}
                    className={`
                      p-2 font-['VT323'] text-lg border rounded-lg transition-all duration-300
                      ${selectedTags.includes(tag.name)
                        ? 'bg-neon-green/20 border-neon-green text-neon-green shadow-[0_0_10px_rgba(57,255,20,0.5)]'
                        : 'bg-black/40 border-neon-green/30 text-neon-green/70 hover:border-neon-green hover:text-neon-green'
                      }
                    `}
                  >
                    <span className="mr-2">{tag.icon}</span>
                    {tag.name}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  onKeyDown={handleAddCustomTag}
                  placeholder="Type custom tag and press Enter..."
                  className="w-full p-3 bg-black/80 border border-neon-green text-neon-green font-['VT323'] text-lg 
                           focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(57,255,20,0.5)]
                           placeholder-neon-green/50"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neon-green/50 text-sm">
                  Press Enter ↵
                </div>
              </div>

              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 p-3 bg-black/40 rounded-lg border border-neon-green/30">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-neon-green/20 text-neon-green border border-neon-green/50"
                    >
                      <span className="mr-1">#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleTagClick(tag)}
                        className="ml-2 hover:text-neon-red"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="isPublished" className="block text-neon-blue mb-2 font-['VT323']">
                Status:
              </label>
              <select
                id="isPublished"
                name="isPublished"
                value={formData.isPublished.toString()}
                onChange={(e) => setFormData({
                  ...formData,
                  isPublished: e.target.value === 'true'
                })}
                className="w-full p-3 bg-black/80 border border-neon-green text-neon-green font-['VT323'] text-lg 
                           focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(57,255,20,0.5)]"
              >
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-6 bg-neon-green text-black font-['VT323'] text-xl uppercase tracking-wider
                       hover:bg-neon-blue hover:shadow-[0_0_20px_rgba(0,255,255,0.7)] transition-all duration-300"
            >
              Submit Post
            </button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="mt-4 text-neon-orange hover:text-neon-yellow transition-colors duration-300 font-['VT323'] text-lg"
          >
            <span className="animate-pulse">←</span> Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CreatePost;