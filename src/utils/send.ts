import qs from 'qs'
export function sendJson() { }


export function send(res: any, body: any) {
    let chunk: any = qs.stringify(body);
    if (chunk) {
        chunk = Buffer.from(chunk, 'utf-8');
        res.setHeader('Content-Length', chunk.length);
    }
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = api.statusCode;
    res.end(chunk, 'utf8');
}


export default (res: any) => ({
    send: (...rest: any[]) => send(res, ...rest)
})
