import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";

// Lazy initialization - only load emoji dependencies when first needed
let markdownInitialized = false;
let md: MarkdownIt;
const pendingMarkdownCalls: Array<{
  text: string;
  resolve: (value: string) => void;
}> = [];

const initializeMarkdown = async () => {
  if (markdownInitialized) {
    return;
  }

  // Initialize markdown-it
  md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  // Lazy load markdown-it-emoji and twemoji together
  const [markdownitEmojiModule, twemojiModule] = await Promise.all([
    import("markdown-it-emoji"),
    import("twemoji")
  ]);

  // Setup emoji plugin
  md.use(markdownitEmojiModule.default);

  // Setup emoji renderer with twemoji
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  md.renderer.rules.emoji = (token: Token, idx: Number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return twemojiModule.default.parse(token[idx].content, {
      base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/"
    });
  };

  markdownInitialized = true;

  // Process any pending markdown calls
  pendingMarkdownCalls.forEach(({ text, resolve }) => {
    resolve(md.renderInline(text));
  });
  pendingMarkdownCalls.length = 0;
};

// Full markdown rendering with emoji parsing (for when content is displayed)
export const markdown = (text: string): string | Promise<string> => {
  if (markdownInitialized) {
    return md.renderInline(text);
  }

  // Return a promise that resolves when markdown is initialized
  return new Promise((resolve) => {
    pendingMarkdownCalls.push({ text, resolve });
    // Start initialization if not already started
    if (!markdownInitialized && pendingMarkdownCalls.length === 1) {
      initializeMarkdown();
    }
  });
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
