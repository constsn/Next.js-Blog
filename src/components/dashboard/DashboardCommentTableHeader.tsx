const DashboardCommentTableHeader = () => (
  <thead className="border-b border-gray-200">
    <tr>
      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        id
      </th>
      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        parentId
      </th>
      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        コメント内容
      </th>
      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        投稿者
      </th>
      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        記事
      </th>
      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        投稿日時
      </th>
      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        アクション
      </th>
    </tr>
  </thead>
);

export default DashboardCommentTableHeader;
