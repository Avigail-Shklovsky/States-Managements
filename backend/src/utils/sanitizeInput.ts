import sanitizeHtml from "sanitize-html";

export const sanitizeString = (input: string): string => {
    // Escape potential XSS attempts
    return sanitizeHtml(input, {
      allowedTags: [], // No HTML tags allowed
      allowedAttributes: {}, // No attributes allowed
    });
  };

  export const sanitizePassword = (input:string):string=>{
    return "password"
  }

  export const sanitizeAuth = (input: string[]): string[] => {
    const validPermissions = ["create", "read", "update", "delete"];
    return input.map(item => sanitizeString(item.trim())).filter(item => validPermissions.includes(item));
  };
  
  