import { FileManager } from './fileman';
import { IFileSpec } from './object';

export class U7Object {
    constructor(private spec: IFileSpec, private index?: number) {
    }
    public read(): Promise<Buffer> {
        return FileManager.instance.getFileObject(this.spec).then(file => {
            return Promise.resolve(file ? file.read(this.index) : new Buffer(''));
        });
    }
}
