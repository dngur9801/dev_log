export const reg = {
  removeTag(string: string) {
    return string.replace(/<[^>]*>?/g, '');
  },
};
