import Link from 'next/link';
import { formatDate, getBlogPosts } from 'app/lib/posts';

export const metadata = {
  title: 'Articles',
  description: 'Nextfolio Articles',
};

export default function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <section className="pt-16 pb-40 flex flex-col h-[calc(100vh-160px)]">
      <h1 className="mb-8 text-3xl font-medium tracking-tight font-syne">
        Articles
      </h1>
      <div>
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4 transition-opacity duration-200 hover:opacity-80"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <p className="text-black dark:text-white tracking-tight font-syne">
                  {post.metadata.title}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}