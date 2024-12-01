import { NewPostCommand } from "./post";
import { checkPagesFolder } from "../../utils/file";
import { NewCategoryCommand } from "./category";
import { SubCommand } from "..";

export const NewCommand = SubCommand("new");

NewCommand
    .description("Create new category/post")
    .alias("n")
    .hook("preSubcommand", (_, __) => {
        if (!checkPagesFolder()) {
            NewCommand.error("Error: _pages folder does not exist.", { exitCode: 1, code: "not.blog.repo" })
        }
    })

// Add 'post' and 'category' as subcommands of 'new'
NewCommand.addCommand(NewPostCommand);
NewCommand.addCommand(NewCategoryCommand);

export default NewCommand;
