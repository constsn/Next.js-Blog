import DashboardCommentTableHeader from './DashboardCommentTableHeader';
import DashboardCommentTableRow from './DashboardCommentTableRow';

type Comment = {
  id: number;
  author: string;
  content: string;
};

interface Prop {
  paginatedComments: {
    id: number;
    parentId?: number | null;
    content: string;
    author: string;
    authorEmail?: string | null;
    createdAt: Date;
    replies: Comment[] | [];
    post: {
      title: string;
      slug: string;
      published: boolean;
    };
  }[];
}

const DashboardCommentTable = async ({ paginatedComments }: Prop) => {
  return (
    <div className="px-6 py-6 bg-white rounded shadow-sm border border-gray-200">
      <table className="w-full">
        <DashboardCommentTableHeader />
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedComments.map(comment => {
            return (
              <DashboardCommentTableRow key={comment.id} comment={comment} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardCommentTable;
