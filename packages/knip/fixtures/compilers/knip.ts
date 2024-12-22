import '@mdx-js/mdx';

export default {
  compilers: {
    md: (text, path) => {
      if (!path) throw new Error('Path not passed to compiler');
      return '';
    },
    json: (content, fileName) => {
      if (fileName.includes('compiled')) {
        return `export default ${content}`;
      }
      return content;
    },
    css: async (text: string) => {
      return [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n');
    },
  },
};
