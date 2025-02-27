export interface Entity {
    id: string,
    [id: string]: string | number | boolean | ComponentFramework.LookupValue
}