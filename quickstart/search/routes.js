const axios = require('axios');

const OSDU_API_BASE_URL = process.env.OSDU_API_BASE_URL || '<your API base url here>';

/**
 * Get <Resource Type>: array of objects containing srn and filename
 * @param requestResult {Array}
 */
function getResponseFromSearchResult(requestResult) {
    let result = {};
    requestResult.forEach((entry) => {
        if (result[entry.resource_type] === undefined) {
            result[entry.resource_type] = [];
        }
        entry.files.map((fileEntry) => {
            // console.log(resourceType);
            result[entry.resource_type].push({
                srn: fileEntry.srn,
                filename: fileEntry.filename,
            })
        })
    });

    return result;
}

module.exports.search = async (req, res) => {
    const wellName = req.query.wellname;
    const searchResult = await axios.post(`${OSDU_API_BASE_URL}/indexSearch`, {
        fulltext: wellName,
        metadata: {
            resource_type: [
                'master-data/Well',
                'work-product-component/WellLog',
                'work-product-component/WellborePath'
            ]
        },
        facets: [
            'resource_type'
        ]
    });

    const result = getResponseFromSearchResult(searchResult.data.results);
    res.send(result);
};
