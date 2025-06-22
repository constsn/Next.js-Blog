import Link from 'next/link';

type Props = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: Props) => (
  <div className="flex justify-center gap-2 mt-15">
    {Array.from({ length: totalPages }).map((_, i) => {
      if (i === 0) {
        return (
          <Link
            key={i}
            href="/"
            className="px-3 py-1 rounded pagination hover:border hover:text-white"
          >
            {i + 1}
          </Link>
        );
      }
      return i === currentPage - 1 ? (
        <span
          key={i}
          className="px-3 py-1 border text-white rounded font-bold bg-indigo-600"
        >
          {i + 1}
        </span>
      ) : (
        <Link
          key={i}
          href={`/pages/${i + 1}`}
          className="px-3 py-1 rounded pagination hover:border hover:text-white"
        >
          {i + 1}
        </Link>
      );
    })}
  </div>
);

export default Pagination;
