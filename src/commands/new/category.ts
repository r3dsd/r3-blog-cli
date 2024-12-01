import { SubCommand } from "..";
import { Logger } from "../../utils/logger";
import { createCategory, existPath, getCategoryPath } from "../../utils/file";

export const NewCategoryCommand = SubCommand("category")
    .description("Create a new category")
    .argument("<category-path>", "Name of the category (up to 3 levels) ex. exam/ple/path")
    .usage("<category-path>")
    .action((name) => handleCategoryCommand(name));

const handleCategoryCommand = (categories: string) => {
    const category_path_array = categories.split("/");
    if (category_path_array.length > 3) {
        NewCategoryCommand.error("Error: Maximum 3 category levels are allowed.", { exitCode: 1 });
    }

    const categoryPath = getCategoryPath(category_path_array);

    if (!existPath(categoryPath)) {
        createCategory(category_path_array);
        Logger.success(`Category created: ${categoryPath}`);
    } else {
        Logger.warn(`Category already exists: ${categoryPath}`);
    }
};