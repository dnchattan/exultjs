export interface IFileSpec {
    name: string;
    index?: number;
}

export class U7Object {
    public readonly count: number;
    protected index: number;

    constructor(protected identifier: IFileSpec) {

    }
    public read(): Promise<Buffer> {
        throw new Error('not implemented');
    }
}
