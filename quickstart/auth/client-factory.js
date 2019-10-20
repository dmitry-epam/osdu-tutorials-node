const {Issuer} = require('openid-client');

const CALLBACK_URL = 'http://localhost:8080/auth/callback';
const AUTH_META_URL = process.env.AUTH_META_URL || 'http://<openid-meta-url>';
const AUTH_CLIENT_ID = process.env.AUTH_CLIENT_ID || '<client_id>';
const AUTH_CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET || '<client_secret>';


class AuthClientFactory {
    constructor(authMetaUrl = AUTH_META_URL, authClientId = AUTH_CLIENT_ID, authClientSecret = AUTH_CLIENT_SECRET) {
        this.authMetaUrl = authMetaUrl;
        this.authClientId = authClientId;
        this.authClientSecret = authClientSecret;
        this.client = null;
    }

    /***
     * returns Client promise with discovered routes
     * @returns {Promise<Client>}
     */
    async getClient() {
        if (this.client !== null) {
            return this.client;
        }

        const issuer = await Issuer.discover(this.authMetaUrl);
        this.client = new issuer.Client({
            client_id: this.authClientId,
            client_secret: this.authClientSecret,
            redirect_uris: [CALLBACK_URL],
            response_types: ['code'],
        });
        return this.client;
    }
}


module.exports.CALLBACK_URL = CALLBACK_URL;
module.exports.clientFactory = new AuthClientFactory();
