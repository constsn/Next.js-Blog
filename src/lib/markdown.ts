import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const getMarkdownTextClient = (content: string) => {
  const rawMarkup = String(marked.parse(content, { breaks: true }));
  const cleanMarkup = DOMPurify.sanitize(rawMarkup);
  return { __html: cleanMarkup };
};

export const getMarkdownTextServer = (content: string) => {
  const rawMarkup = String(marked.parse(content, { breaks: true }));
  return { __html: rawMarkup };
};
