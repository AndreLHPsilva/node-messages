import fs from "fs";
import path from "path";

export const deleteFile = async (filename: string) => {


    try {
        const stat = await fs.promises.stat(filename);
    } catch {
        return;
    }

    await fs.promises.unlink(filename);

};