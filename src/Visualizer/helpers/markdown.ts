import twemoji from "twemoji";

import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import markdownitEmoji from "markdown-it-emoji";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

md.use(markdownitEmoji);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
md.renderer.rules.emoji = (token: Token, idx: Number) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return twemoji.parse(token[idx].content, {
    base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/"
  });
};

// Full markdown rendering with emoji parsing (for when content is displayed)
export const markdown = (text: string) => {
  return md.renderInline(text);
};

// Optimized markdown rendering without emoji parsing (deferred)
// This is faster for initial render when descriptions aren't visible
export const markdownWithoutEmoji = (text: string) => {
  // Simple markdown parsing without emoji conversion
  // Just handle basic markdown like bold, italic, and links
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
};
