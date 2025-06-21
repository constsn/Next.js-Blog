import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/stackoverflow-dark.css';

const renderer = new marked.Renderer();

renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
  const validLang = lang && hljs.getLanguage(lang);
  const highlighted = validLang
    ? hljs.highlight(text, { language: lang }).value
    : hljs.highlightAuto(text).value;

  const languageClass = lang ? `language-${lang}` : '';
  return `<pre><code class="hljs ${languageClass}">${highlighted}</code></pre>`;
};

marked.setOptions({
  renderer,
  breaks: true,
});

export const getMarkdownTextClient = (content: string) => {
  const rawMarkup = String(marked.parse(content, { breaks: true }));
  const cleanMarkup = DOMPurify.sanitize(rawMarkup);
  return { __html: cleanMarkup };
};

export const getMarkdownTextServer = (content: string) => {
  const rawMarkup = String(marked.parse(content, { breaks: true }));
  return { __html: rawMarkup };
};
