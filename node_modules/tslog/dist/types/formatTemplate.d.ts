import { ISettings } from "./interfaces.js";
export declare function formatTemplate<LogObj>(settings: ISettings<LogObj>, template: string, values: {
    [key: string]: string;
}, hideUnsetPlaceholder?: boolean): string;
