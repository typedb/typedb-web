const https = require('https');

const accessKey = "a26b1324-0e13-4479-a6e5-13c139e4044b#in";
const secretKey = "abe08ca3-6d67-4524-9723-0acd4f7c53bc";

const options = {
    method: "POST",
    headers: {
        "X-Airmeet-Access-Key": accessKey,
        "X-Airmeet-Secret-Key": secretKey,
    }
}

const req = https.request("https://api-gateway.airmeet.com/prod/auth", options, res => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res.on('data', chunk => {
        data.push(chunk);
    });

    res.on('end', () => {
        console.log('Response ended: ');
        const resp = JSON.parse(Buffer.concat(data).toString());

        console.log(resp);
    });
}).on('error', err => {
    console.log('Error: ', err.message);
});

req.on('error', (e) => {
    console.error(e);
});

req.end();
