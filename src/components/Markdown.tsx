import { getMarkdownTextClient } from '@/lib/markdown';

const Markdown = ({ content }: { content: string }) => (
  <section className="w-full max-w-4xl my-3 border-1">
    <div
      id="preview"
      className="markdown-body prose border border-gray-700 max-w-none shadow-md w-full p-4"
      dangerouslySetInnerHTML={getMarkdownTextClient(content)}
    />
  </section>
);

export default Markdown;
