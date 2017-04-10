
import { U7File } from './file';
import { FlexFile } from './flex';
import { IFileSpec } from './object';
import { U7Object } from './u7object';
import { U7Open } from './utils';

export class FileManager {
    public getFileObject(spec: IFileSpec): Promise<U7File> {
        if (spec.index) {
            const obj = new U7Object({ name: spec.name });
            return obj.read().then(buffer =>
                new FlexFile(spec, buffer)
            );
        }
        else {
            
        }
    }
    public static get instance(): FileManager {
        const w = (window as any);
        return w.fileman = (w.fileman || new FileManager());
    }
}
