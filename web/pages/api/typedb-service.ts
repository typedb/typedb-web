import { config } from "../config/config";

export function getTypeDBVersion() {
    return fetch(`${config.apiUrl}/typedb/version`)
        .then(res => res.json())
        .then(result => result.version as string)
        .catch(err => {
            console.error(err);
            throw err;
        });
}
