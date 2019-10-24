const axios = require('axios');
const azure = require('azure-storage');

const OSDU_API_BASE_URL = process.env.OSDU_API_BASE_URL || '<your API base url here>';


function getBlobData(resultData) {
    return {
        endpoint: resultData.EndPoint,
        bucket: resultData.Bucket,
        key: resultData.Key,
        sas: resultData.TemporaryCredentials.SAS,
    }
}

module.exports.fetch = async (req, res) => {
    const srn = req.query.srn;
    const resourcesResult = await axios.post(`${OSDU_API_BASE_URL}/GetResources`, {
        SRNS: [srn],
        TargetRegionId: '',
    });
    const blobData = getBlobData(resourcesResult.data.Result[0].FileLocation);
    const blobService = azure.createBlobServiceWithSas(blobData.endpoint, blobData.sas);
    blobService.getBlobToText(blobData.bucket, blobData.key, (_, data) => {
        res.send(data);
    })

};
