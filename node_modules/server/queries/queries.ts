export const queries = {
    insertPost: 'insertPost',
    getAllPosts: 'getAllPosts',
    deletePost: 'deletePost',
    updatePost: 'updatePost',
    signPost: 'signPost',
    loginGet: 'loginGet',
    checkGet: 'checkGet',
} as const;

export type QueryNames = keyof typeof queries;
