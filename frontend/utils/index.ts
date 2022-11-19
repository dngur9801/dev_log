export const reg = {
  removeTag(string: string) {
    const regExp = /<[^>]*>?/g;
    return string.replace(regExp, '');
  },

  isId(string: string) {
    const regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    return regExp.test(string);
  },
};
