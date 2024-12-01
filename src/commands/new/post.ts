import inquirer from "inquirer";
import { SubCommand } from "..";
import { Logger } from "../../utils/logger";
import { createPost } from "../../utils/file";
import { BlogError } from "../../common/error";
import { Option } from "commander";
import { InquirerUtil } from "../../utils/inquirer";
import { PostTemplate } from "../../lib/PostTemplate";

export const NewPostCommand = SubCommand("post")
    .description("Create a new post")
    .argument("<name...>", "Name of the post")
    .addOption(new Option("-t, --template <type>", "template type (song)").default("normal").choices(["normal", "song"]))
    .action(async (name) => {
        try {
            await handlePostCommand(name);
        } catch (err) {
            if (err instanceof BlogError)
                NewPostCommand.error(err.message);
            throw err;
        }
    });

export async function handlePostCommand(name: string[]) {
    const postName = name.join("-");

    const { template } = NewPostCommand.opts();

    const categoryChoices = InquirerUtil.makeCategoryChoice();

    const { selectedCategory } = await inquirer.prompt([
        {
            type: "list",
            name: "selectedCategory",
            message: "Select a category for the new post:",
            choices: categoryChoices,
        },
    ]);

    createPost(selectedCategory, postName, PostTemplate.get(template));
    Logger.info(`Post '${postName}.md' created successfully in ${selectedCategory}`);
};

