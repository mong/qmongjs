/*
Problems with ReactMarkdown and Jest:
"Jest is not working since it does not fully support ESM yet"
This is a dirty fix of that problem taken from option 1 here:
https://github.com/remarkjs/react-markdown/issues/635#issuecomment-956158474
*/

const remarkGfm = (arnfinn) => arnfinn;

export default remarkGfm;
