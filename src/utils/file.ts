import path from "node:path";
import fs from "node:fs";
import { CommanderError } from "commander";
import { PostAlreadyExist } from "../common/error";

const baseDir = path.resolve(process.cwd(), "_pages");

export const checkPagesFolder = () => {
    return fs.existsSync(baseDir);
};

export const getCategoryPath = (categories: string[]) => {
    return path.join(baseDir, ...categories);
}

export const existPath = (path: string) => {
    return fs.existsSync(path);
}

export const readCategories = (): string[] => {
    const baseDir = path.resolve(process.cwd(), "_pages");

    const categoryPaths: string[] = [];

    const traverseDirectory = (currentPath: string, relativePath: string = "") => {
        const items = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const item of items) {
            if (item.isDirectory()) {
                const newRelativePath = path.join(relativePath, item.name);
                const fullPath = path.join(currentPath, item.name);

                // Save the relative path
                categoryPaths.push(newRelativePath);

                // Recursively traverse subdirectories
                traverseDirectory(fullPath, newRelativePath);
            }
        }
    };

    traverseDirectory(baseDir);

    return categoryPaths;
};

export const createCategory = (categories: string[]) => {
    let currentPath = baseDir;

    categories.forEach((category) => {
        currentPath = path.join(currentPath, category);

        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath, { recursive: true });
        }

        const indexFilePath = path.join(currentPath, "index.md");
        if (!fs.existsSync(indexFilePath)) {
            fs.writeFileSync(indexFilePath, "---\n---");
        }
    });
};

export const createPost = (category_path: string, post_name: string, template: string) => {
    const post_path = path.join(baseDir, category_path, post_name + ".md");

    if (fs.existsSync(post_path)) {
        throw new PostAlreadyExist(post_name, category_path);
    }

    fs.writeFileSync(post_path, template);
}