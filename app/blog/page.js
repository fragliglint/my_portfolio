// file: app/blog/page.js
"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FiCalendar, 
  FiClock, 
  FiTag, 
  FiArrowRight, 
  FiBookOpen,
  FiSearch,
  FiFilter
} from "react-icons/fi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with Next.js",
    excerpt: "Learn how to build production-ready React applications with Next.js, including SSR, API routes, and performance optimization techniques.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "Next.js", "Performance"],
    category: "Web Development",
    image: "/api/placeholder/600/400",
    featured: true,
    slug: "building-scalable-react-apps-nextjs"
  },
  {
    id: 2,
    title: "Machine Learning in Production: Best Practices",
    excerpt: "A comprehensive guide to deploying and maintaining machine learning models in production environments.",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["ML", "DevOps", "Python"],
    category: "Machine Learning",
    image: "/api/placeholder/600/400",
    featured: true,
    slug: "machine-learning-production-best-practices"
  },
  {
    id: 3,
    title: "The Future of Full Stack Development in 2024",
    excerpt: "Exploring emerging trends and technologies that are shaping the future of full stack development.",
    date: "2024-01-05",
    readTime: "6 min read",
    tags: ["Trends", "Technology", "Web"],
    category: "Web Development",
    image: "/api/placeholder/600/400",
    slug: "future-full-stack-development-2024"
  },
  {
    id: 4,
    title: "Building RESTful APIs with Node.js and Express",
    excerpt: "A practical guide to designing and building robust RESTful APIs using Node.js and Express framework.",
    date: "2024-01-02",
    readTime: "10 min read",
    tags: ["Node.js", "API", "Backend"],
    category: "Backend Development",
    image: "/api/placeholder/600/400",
    slug: "building-restful-apis-nodejs-express"
  },
  {
    id: 5,
    title: "Introduction to Computer Vision with Python",
    excerpt: "Getting started with computer vision using OpenCV and Python for image processing and analysis.",
    date: "2023-12-28",
    readTime: "15 min read",
    tags: ["Python", "OpenCV", "AI"],
    category: "Computer Vision",
    image: "/api/placeholder/600/400",
    slug: "introduction-computer-vision-python"
  },
  {
    id: 6,
    title: "Optimizing React Component Performance",
    excerpt: "Advanced techniques for optimizing React component performance and reducing re-renders.",
    date: "2023-12-20",
    readTime: "7 min read",
    tags: ["React", "Performance", "Optimization"],
    category: "Web Development",
    image: "/api/placeholder/600/400",
    slug: "optimizing-react-component-performance"
  }
];

const categories = [
  { name: "All", count: blogPosts.length },
  { name: "Web Development", count: blogPosts.filter(post => post.category === "Web Development").length },
  { name: "Machine Learning", count: blogPosts.filter(post => post.category === "Machine Learning").length },
  { name: "Backend Development", count: blogPosts.filter(post => post.category === "Backend Development").length },
  { name: "Computer Vision", count: blogPosts.filter(post => post.category === "Computer Vision").length }
];

const BlogCard = ({ post, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleReadMore = () => {
    // Navigate to blog post detail page
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-effect rounded-3xl overflow-hidden card-hover group h-full flex flex-col"
    >
      {/* Post Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {post.category}
          </span>
        </div>
        {post.featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
            <FiBookOpen className="mr-1" size={14} />
            Featured
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <div className="flex items-center mr-4">
            <FiCalendar className="mr-1" size={14} />
            {new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="flex items-center">
            <FiClock className="mr-1" size={14} />
            {post.readTime}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
            >
              <FiTag className="mr-1" size={10} />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* Read More */}
        <motion.button
          onClick={handleReadMore}
          className="flex items-center text-blue-600 font-semibold group/btn mt-auto"
          whileHover={{ x: 5 }}
        >
          Read More
          <FiArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </motion.article>
  );
};

const FeaturedPost = ({ post }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleReadMore = () => {
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="glass-effect rounded-3xl overflow-hidden card-hover group"
    >
      <div className="lg:flex">
        {/* Featured Image */}
        <div className="lg:w-2/5 relative">
          <div className="h-64 lg:h-full bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                Featured Post
              </span>
            </div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="lg:w-3/5 p-8">
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <div className="flex items-center mr-4">
              <FiCalendar className="mr-1" size={14} />
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center">
              <FiClock className="mr-1" size={14} />
              {post.readTime}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
            {post.title}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium"
              >
                <FiTag className="mr-1" size={10} />
                {tag}
              </span>
            ))}
          </div>

          <motion.button
            onClick={handleReadMore}
            className="btn btn-primary group/btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read Full Article
            <FiArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default function Blog() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.section
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center py-16 lg:py-20"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-6"
            >
              <FiBookOpen className="mr-2" />
              Blog & Articles
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold gradient-text mb-6"
            >
              Latest Insights
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Sharing knowledge, experiences, and thoughts on web development, 
              machine learning, and the latest technology trends.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-8 text-center"
            >
              <div>
                <div className="text-2xl font-bold text-gray-800">{blogPosts.length}+</div>
                <div className="text-gray-600">Articles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{categories.length}+</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">2024</div>
                <div className="text-gray-600">Started Writing</div>
              </div>
            </motion.div>
          </motion.section>

          {/* Search and Filter Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md w-full">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none bg-white/80"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                      selectedCategory === category.name
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white/80 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <FiFilter className="mr-2" size={14} />
                    {category.name}
                    <span className="ml-2 px-2 py-1 rounded-full text-xs bg-white/20">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <motion.section
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-16"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-bold text-gray-800 mb-8"
              >
                Featured Posts
              </motion.h2>
              <div className="space-y-8">
                {featuredPosts.map((post) => (
                  <FeaturedPost key={post.id} post={post} />
                ))}
              </div>
            </motion.section>
          )}

          {/* All Posts */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="flex justify-between items-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
              </h2>
              <div className="text-gray-600">
                Showing {regularPosts.length} of {filteredPosts.length} articles
              </div>
            </motion.div>

            {regularPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </motion.section>

          {/* Newsletter CTA */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl p-8 lg:p-12 text-center mt-16"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Get notified when I publish new articles about web development, 
              machine learning, and technology.
            </p>
            <div className="flex max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none bg-white/80 flex-1"
              />
              <button className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
}