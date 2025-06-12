import Link from 'next/link';

type Props = {
  query: string;
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ query, currentPage, totalPages }: Props) => (
  <div className="flex justify-center gap-2 mt-8">
    {Array.from({ length: totalPages }).map((_, i) => {
      if (i === 0) {
        return (
          <Link
            key={i}
            href={query ? `/?search=${encodeURIComponent(query)}` : '/'}
            className="px-3 py-1 border rounded"
          >
            {i + 1}
          </Link>
        );
      }
      return i === currentPage - 1 ? (
        <span
          key={i}
          className="px-3 py-1 border rounded font-bold bg-gray-200"
        >
          {i + 1}
        </span>
      ) : (
        <Link
          key={i}
          href={
            query
              ? `/page/${i + 1}/?search=${encodeURIComponent(query)}`
              : `/page/${i + 1}`
          }
          className="px-3 py-1 border rounded"
        >
          {i + 1}
        </Link>
      );
    })}
  </div>
);

export default Pagination;
