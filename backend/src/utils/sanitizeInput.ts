import sanitizeHtml from "sanitize-html";

export const sanitizeInput = (input: string): string => {
    // Escape potential XSS attempts
    return sanitizeHtml(input, {
      allowedTags: [], // No HTML tags allowed
      allowedAttributes: {}, // No attributes allowed
    });
  };