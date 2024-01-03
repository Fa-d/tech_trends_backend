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
        ":key": { "S": "pk" }, ":sort": { "S": "sk" }
    }
})


var dynamicRes = (async () => {
    const client = new DynamoDBClient(awsConfig);
    const response = await client.send(paramsListFeed);
    var formattedResponse = AWS.DynamoDB.Converter.unmarshall(response.Items[0])
    return formattedResponse.articleData;
})();

export { dynamicRes };

