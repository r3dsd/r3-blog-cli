export const templateType = ['normal', 'kaf-song'] as const

type TemplateType = typeof templateType[number];

export class PostTemplate {
    static get(type: TemplateType): string {
        switch(type) {
            case "normal":
                return "It is Normal Template"
            case "kaf-song":
                return "Kaf-song Template"
        }
    }
}