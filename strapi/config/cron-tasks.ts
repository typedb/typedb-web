import { Storage } from "@google-cloud/storage";
import { exec } from "child_process";
import * as fs from "fs";

async function createLocalBackup(path: string, encryptionKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
        exec(`yarn strapi export --file ${path} --key ${encryptionKey}`, (error, _stdout, _stderr) => {
            if (error) reject(error);
            resolve();
        }).stdout.on("data", r => {
            process.stdout.write(r.replace(encryptionKey, "(hidden)"));
        });
    });
}

async function uploadToCloudStorage(localFilePath: string, gcsBucket: string): Promise<void> {
    try {
        const gcpCredentialsPath = ".backup/gcp/credentials.json";
        const storage = new Storage({ keyFilename: gcpCredentialsPath });
        const filename = `${localFilePath}.tar.gz.enc`;
        const [remoteFile, _metadata] = await storage.bucket(gcsBucket).upload(filename);
        console.log(`Backup '${remoteFile.name}' successfully uploaded to GCS bucket '${gcsBucket}'`);
    } catch (e: any) {
        console.error(`An error occurred uploading a backup to GCS bucket '${gcsBucket}': `, e);
    }
}

function currentDateTimeString(): string {
    const now = new Date();
    const [year, month, day] = [now.getFullYear(), (now.getMonth()+1).toString().padStart(2, "0"), now.getDate().toString().padStart(2, "0")];
    const [hours, minutes, seconds] = [now.getHours(), now.getMinutes(), now.getSeconds()].map(x => x.toString().padStart(2, "0"));
    return `${year}-${month}-${day}_${hours}${minutes}${seconds}`;
}

function sanitiseDockerTag(dockerImageTag: string): string {
    return dockerImageTag.replace("/", "_").replace(":", "_").replace(".", "_");
}

export default {
    dailyBackupJob: {
        task: async ({ strapi }) => {
            try {
                console.log("Running cron task 'dailyBackupJob'");
                const dockerImageTag = sanitiseDockerTag(fs.readFileSync("docker-image-tag.txt").toString());
                const localBackupFilePath = `.backup/${currentDateTimeString()}_${dockerImageTag}`;
                const encryptionKey = strapi.config.server.backup.encryptionKey;
                const gcsBucket = strapi.config.server.backup.gcsBucket;
                await createLocalBackup(localBackupFilePath, encryptionKey);
                if (strapi.config.environment === "production") {
                    await uploadToCloudStorage(localBackupFilePath, gcsBucket);
                } else {
                    console.log(`Remote backup to GCS is disabled, as this is a '${strapi.config.environment}' environment. It is only enabled in 'production'.`);
                }
            } catch (e: any) {
                console.error("An error occurred running cron task 'dailyBackupJob': ", e);
            }
        }, options: {
            rule: "30 * * * * *",
        },
    },
};
