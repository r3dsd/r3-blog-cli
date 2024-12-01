import { checkPagesFolder, readCategories } from "../utils/file";

export class CategoryTree {
    private categoryMap: Map<string, string>;

    constructor() {
        this.categoryMap = new Map();
        this.initialize();
    }

    private initialize() {
        if (!checkPagesFolder()) {
            throw new Error("Base directory does not exist.");
        }

        const category_paths = readCategories();
        category_paths.forEach((path) => {
            const segments = path.split("/");
            const categoryName = segments[segments.length - 1];
            this.categoryMap.set(categoryName, path);
        });
    }

    public get(categoryName: string): string | undefined {
        return this.categoryMap.get(categoryName);
    }

    public getAllCategories() {
        return Array.from(this.categoryMap.keys());
    }

    public getAllCategoriesPaths() {
        return Array.from(this.categoryMap.values());
    }
}

const tree = new CategoryTree();