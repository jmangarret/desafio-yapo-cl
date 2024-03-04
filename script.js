import axios from 'axios';

async function getData(paramId) {
    const API_URL = 'https://graph.infocasas.com.uy/graphql';
    const query = await axios.post(API_URL, {
        query: "query ResultsGird_v2($rows: Int!, $params: SearchParamsInput!, $page: Int, $source: Int) {searchFast(params: $params, first: $rows, page: $page, source: $source)\n}\n",
        operationName: "ResultsGird_v2",
        variables: {
            "rows": 2500,
            "params": {
                "estate_id": 10,
                "neighborhood_id": [13],
                "operation_type_id": 1,
                "property_type_id": [
                    1, 2
                ],
            }
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'x-origin': 'www.infocasas.com.uy'
        }
    });
    const notFound = 'price not found for id ' + paramId;
    const results = query.data?.data?.searchFast.data;
    if (results) {
        const item = results.find(item => item.id == paramId);
        if (item) {
            console.log('U$S ' + item.price);
        } else {
            console.log(notFound);
        }
    } else {
        console.log(notFound);
    }
}

const args = process.argv;
getData(args[2]);