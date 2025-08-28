// export default function getAccessToken(req){
//     const accessToken = req.cookies.access_token;
//     if (accessToken) {
//         return accessToken;
//     }
//     return null;
// }

export default function getAccessToken(req) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }

    return null;
}
