import { Command } from "commander";
import { Logger } from "../utils/logger";

export function SubCommand(name: string) {
    return new Command(name).configureOutput({
        outputError: (str, _) => Logger.error(str.trim()),
    });
}