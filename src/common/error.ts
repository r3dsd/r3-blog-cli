export abstract class BlogError extends Error {
    constructor(
        public message: string, 
        public exitCode: number = 1
    ) {
        super(message);
    }
}

export class PostAlreadyExist extends BlogError {
    constructor(postname: string, path: string) {
        super(`A post with the name '${postname}' already exists at '${path}'`);
    }
}