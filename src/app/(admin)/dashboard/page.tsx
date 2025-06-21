import DashboardNav from '@/components/dashboard/DashboardNav';
import { getComments } from '@/lib/db/comment';
import { getAllPosts } from '@/lib/db/post';
import { FileText, Globe, Lock, MessageSquare } from 'lucide-react';

const DashBoardPage = async () => {
  const posts = await getAllPosts();
  const comments = await getComments();

  const draftPosts = posts.filter(post => !post.published);
  const publishedPosts = posts.filter(post => post.published);

  return (
    <DashboardNav isActive="dashboard" label="ダッシュボード">
      <div className="px-30 mt-12">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総記事数</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {posts.length}
                </p>
              </div>
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  総コメント数
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {comments.length}
                </p>
              </div>
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">下書き</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {draftPosts.length}
                </p>
              </div>
              <Lock className="w-6 h-6 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">公開済み</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {publishedPosts.length}
                </p>
              </div>
              <Globe className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </DashboardNav>
  );
};

export default DashBoardPage;
