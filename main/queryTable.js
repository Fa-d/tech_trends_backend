import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import 'dotenv/config';
import AWS from "aws-sdk";

var awsConfig = {
    region: `${process.env.DYNAMO_DB_REGION}`,
    credentials: {
        accessKeyId: `${process.env.ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`
    }
}
var paramsListFeed = new QueryCommand({
    TableName: 'list_feed',
    KeyConditionExpression: "urls = :key AND sort = :sort",
    ExpressionAttributeValues: {
        ":key": { "S": "pk" },
        ":sort": { "S": "sk" }
    }
})

var formattedResponse = {};
async function dynamicRes() {
    const response = await new DynamoDBClient(awsConfig).send(paramsListFeed);
    return AWS.DynamoDB.Converter.unmarshall(response.Items[0])
}

async function getCategories() {
    formattedResponse = await dynamicRes()
    if (!formattedResponse || !formattedResponse.categories) {
        formattedResponse = await dynamicRes();
    }
    return formattedResponse.categories;
}

async function getChildArticles() {
    formattedResponse = await dynamicRes()
    if (!formattedResponse || !formattedResponse.childArticles) {
        formattedResponse = await dynamicRes();
    }
    return formattedResponse.childArticles;
}

async function getMotherArticles() {
    formattedResponse = await dynamicRes()
    if (!formattedResponse || !formattedResponse.motherArticles) {
        formattedResponse = await dynamicRes();
    }
    return formattedResponse.motherArticles;
}

export { getCategories, getChildArticles, getMotherArticles };

//the response is of structure:
// {
//     urls: 'pk',
//     sort: 'sk',
//     childArticles: [], categories: [],  motherArticles: []
// }

