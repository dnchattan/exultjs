export class file_read_exception extends Error {
    constructor(name: string) { super(`Error reading from file ${name}`); }
}

export class wrong_file_type_exception extends Error {
    constructor(name: string, type: string) { super(`File ${name} is not of type ${type}`); }
}