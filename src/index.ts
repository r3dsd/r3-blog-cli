#! /usr/bin/env bun

import { Command } from "commander";
import { NewCommand } from "./commands/new";
import figlet from 'figlet';

const program = new Command();

program
    .name("blog")
    .description("CLI for r3-blog management")
    .version("0.0.1")
    .action(() => {
        console.log(figlet.textSync("R3 Blog CLI"));
        program.help();
    });

program.addCommand(NewCommand);

program.parse(process.argv);