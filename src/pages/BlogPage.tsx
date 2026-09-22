import React, { useState, useMemo } from 'react';
import { Search, Clock, ArrowRight, X, BookOpen, CheckCircle, Share2, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '../data/pagesData';
import { BlogPost, NavPage } from '../types';

interface BlogPageProps {
  onNavigate: (page: NavPage) => void;
  onShopClick: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onShopClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState<string>('');
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  const categories = ['All', 'Microbiome Science', 'Clinical Studies', 'Daily Habits', 'Botanical Sourcing'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setSubscribedEmail('');
      }, 3500);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#fbf9f5] text-[#1c1f1d]">
      {/* 1. Header Banner */}
      <section className="px-5 sm:px-8 py-12 sm:py-20 max-w-6xl mx-auto text-center">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#254631] bg-[#254631]/10 px-3 py-1 rounded-full mb-3">
          The Nexwell Journal
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-[-0.03em] text-[#1c2e22] leading-tight">
          Science, Longevity &amp; Gut Ecology
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#5e584c] max-w-2xl mx-auto leading-relaxed font-normal">
          Peer-reviewed perspectives, clinical formulation audits, and practical chronobiology guides
          authored by our scientific advisory board.
        </p>

        {/* Search & Category Filter */}
        <div className="mt-10 max-w-3xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8a8477] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search scientific articles, topics, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#ded8cb] text-sm text-[#1c1f1d] placeholder-[#948e82] focus:outline-none focus:border-[#254631] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8a8477] hover:text-black"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1c2e22] text-white shadow-xs'
                    : 'bg-white border border-[#ded8cb] text-[#615b4f] hover:bg-[#ede9df]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Featured Lead Article (Only when not actively filtering by query) */}
      {!searchQuery && selectedCategory === 'All' && (
        <section className="px-5 sm:px-8 max-w-6xl mx-auto mb-16">
          <div
            onClick={() => setActiveArticle(featuredPost)}
            className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#ded8cb] shadow-lg hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 h-64 lg:h-auto relative overflow-hidden bg-[#0c1810]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1c2e22] text-white tracking-wide">
                  Featured Research
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-2 text-xs text-[#787265] mb-2 font-mono">
                  <span>{featuredPost.category}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1c1f1d] group-hover:text-[#254631] transition-colors leading-snug">
                  {featuredPost.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5d574b] mt-3 leading-relaxed font-normal">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#f0ece3] flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#ded8cb]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#1c1f1d]">{featuredPost.author.name}</p>
                    <p className="text-[11px] text-[#787265]">{featuredPost.date}</p>
                  </div>
                </div>

                <span className="inline-flex items-center space-x-1 text-xs font-semibold text-[#254631] group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Article Grid */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-medium tracking-tight text-[#1c1f1d]">
            {searchQuery ? `Search results for "${searchQuery}"` : `${selectedCategory} Articles`}
          </h3>
          <span className="text-xs text-[#7d776b] font-mono">{filteredPosts.length} Publications</span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#ded8cb] space-y-3">
            <BookOpen className="w-8 h-8 text-[#8c867a] mx-auto" />
            <p className="text-sm font-medium text-[#1c1f1d]">No research articles found</p>
            <p className="text-xs text-[#706a5e]">Try clearing your search term or select another category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 text-xs font-semibold text-[#254631] underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setActiveArticle(post)}
                className="group cursor-pointer rounded-2xl bg-white border border-[#ded8cb] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-[#0c1810] relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#1c2e22]/90 text-white backdrop-blur-xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center space-x-2 text-[11px] text-[#7d776b] font-mono">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h4 className="text-lg font-medium tracking-tight text-[#1c1f1d] group-hover:text-[#254631] transition-colors leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-xs text-[#635d52] line-clamp-3 leading-relaxed pt-1">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#f4efe5] mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs text-[#484339] font-medium">{post.author.name}</span>
                  </div>

                  <span className="text-xs font-semibold text-[#254631] group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. Weekly Research Digest Newsletter Box */}
      <section className="px-5 sm:px-8 max-w-4xl mx-auto mb-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0c1810] text-white text-center space-y-4 shadow-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Weekly Science Briefing
          </span>
          <h3 className="text-2xl sm:text-3xl font-normal tracking-tight">
            Distilled clinical research delivered to your inbox.
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
            No marketing fluff. Every Tuesday, our advisory team sends a single deep-dive analyzing recent
            microbiome papers, chronobiology trials, and botanical pharmacology.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto pt-2 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={subscribedEmail}
              onChange={(e) => setSubscribedEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0c1810] font-semibold text-xs transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </form>

          {newsletterSuccess && (
            <p className="text-xs text-emerald-400 font-medium">
              Thank you for subscribing! You’ll receive our next Tuesday briefing.
            </p>
          )}
        </div>
      </section>

      {/* 5. Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 bg-white rounded-3xl p-6 sm:p-10 text-[#1c1f1d] shadow-2xl border border-[#ded8cb] max-h-[90vh] overflow-y-auto">
            {/* Header controls */}
            <div className="flex items-center justify-between pb-4 border-b border-[#ece8df]">
              <button
                onClick={() => setActiveArticle(null)}
                className="inline-flex items-center space-x-1 text-xs font-semibold text-[#666053] hover:text-black cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Journal</span>
              </button>

              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-[#716a5d] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#254631] bg-[#254631]/10 px-3 py-0.5 rounded-full">
                  {activeArticle.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-[#1c2e22] leading-tight pt-2">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center space-x-3 text-xs text-[#7b7568] pt-1 font-mono">
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Author Strip */}
              <div className="flex items-center space-x-3 p-3 rounded-2xl bg-[#faf7f2] border border-[#eee9df]">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#ded8cb]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-xs font-bold text-[#1c1f1d]">{activeArticle.author.name}</p>
                  <p className="text-[11px] text-[#716b5e]">{activeArticle.author.role} • Nexwell Scientific Board</p>
                </div>
              </div>

              {/* Hero Image in Article */}
              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden bg-[#0c1810]">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Key Takeaways Callout */}
              <div className="p-5 rounded-2xl bg-[#f4efe4] border border-[#dcd6c7] space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#254631] font-mono">
                  Key Scientific Takeaways
                </h4>
                <ul className="space-y-1.5 text-xs text-[#484339]">
                  {activeArticle.takeaways.map((t, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#254631] flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body paragraphs */}
              <div className="space-y-4 text-sm text-[#484339] leading-relaxed">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Citations */}
              {activeArticle.citations && activeArticle.citations.length > 0 && (
                <div className="pt-4 border-t border-[#eee9df] text-xs text-[#716b5e] space-y-1">
                  <h5 className="font-semibold text-[#1c1f1d]">Peer-Reviewed References:</h5>
                  {activeArticle.citations.map((cite, idx) => (
                    <p key={idx} className="font-mono text-[11px]">{cite}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Modal CTA */}
            <div className="pt-4 border-t border-[#ece8df] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#716b5e]">Formulated for daily cellular health.</span>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onShopClick();
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-[#1c2e22] text-white text-xs font-semibold hover:bg-[#254631] cursor-pointer"
                >
                  Order Daily Synbiotic
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2.5 rounded-full border border-neutral-300 text-xs font-medium hover:bg-neutral-100 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
