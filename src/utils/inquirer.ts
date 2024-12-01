import { CategoryTree } from "../lib/CategoryTree";

export class InquirerUtil {
    static makeCategoryChoice() {
        const categoryTree = new CategoryTree();
        const categories = categoryTree.getAllCategoriesPaths();
    
        const categoryChoices: { name: string; value: string }[] = [];
        const seenPaths = new Set<string>();
    
        categories.forEach((path) => {
            const parts = path.split("/");
            let currentPath = "";
    
            parts.forEach((part, index) => {
                currentPath = currentPath ? `${currentPath}/${part}` : part;
                if (!seenPaths.has(currentPath)) {
                    seenPaths.add(currentPath);
                    categoryChoices.push({
                        name: `${"  ".repeat(index)}${part}`,
                        value: currentPath,
                    });
                }
            });
        });
    
        return categoryChoices;
    }
    
}