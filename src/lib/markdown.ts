import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const getMarkdownText = (content: string) => {
  const rawMarkup = String(marked.parse(content, { breaks: true }));
  const cleanMarkup = DOMPurify.sanitize(rawMarkup);
  return { __html: cleanMarkup };
};
