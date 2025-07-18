import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useBlogStore } from '../../store/blogStore';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../utils/translations';
import Sidebar from '../../components/layout/Sidebar';
import PostCard from '../../components/blog/PostCard';
import Pagination from '../../components/ui/Pagination';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Home = () => {
  const { 
    posts,
    filteredPosts, 
    isLoading, 
    currentPage, 
    totalPages, 
    postsPerPage, 
    loadPosts,
    setCurrentPage 
  } = useBlogStore();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    console.log('Home: Loading posts...');
    loadPosts();
  }, [loadPosts]);


  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog & Portfolio - Maoto Mikami</title>
        <meta name="description" content={t.blogPortfolioDesc} />
      </Helmet>

      {/* Hero Image */}
      <div className="mb-8 relative h-96 md:h-[32rem] lg:h-[40rem]" style={{ marginTop: '-4rem' }}>
        <div 
          className="h-full bg-gradient-to-br from-primary-500 to-primary-600 bg-cover bg-center bg-no-repeat absolute left-0 right-0"
          style={{
            backgroundImage: `url('src/img/IMG_0865.jpg')`,
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            width: '100vw',
            top: '-4rem',
            height: 'calc(100% + 4rem)'
          }}
        >
          {/* 画像がない場合のフォールバック用グラデーション */}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* Main Content */}
        <div className="flex-1 order-2 lg:order-1">

          {currentPosts.length > 0 ? (
            <>
              <div className="grid gap-4">
                {currentPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                {filteredPosts.length === 0 && posts.length === 0 
                  ? t.noBlog
                  : "No posts found matching your filters."
                }
              </div>
              {filteredPosts.length !== posts.length && (
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  Reset filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-72 order-1 lg:order-2">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Home;