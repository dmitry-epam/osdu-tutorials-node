const authClient = require('./client-factory');

module.exports.authEntry = async (req, res) => {
    const client = await authClient.clientFactory.getClient();
    res.redirect(client.authorizationUrl());
};

module.exports.authCallback = async (req, res) => {
    const client = await authClient.clientFactory.getClient();
    const params = client.callbackParams(req);
    const data = await client.callback(authClient.CALLBACK_URL, params, {});
    const accessToken = data.access_token;
    const userInfo = await client.userinfo(accessToken);
    res.send(userInfo);
};
