import {  DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import 'dotenv/config';

var awsConfig = {
    region: `${process.env.DYNAMO_DB_REGION}`,
    credentials: {
        accessKeyId: `${process.env.ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`
    }
}

const command = new PutCommand({
    TableName: "list_feed",
    Item: {
        urls: "pk",
        sort: "sk",
        url_list: [
            {
                articleCount: 22,
                urlAdress: "http://www.abc929.com"
            },
            {
                articleCount: 21,
                urlAdress: "http://www.abc929.com"
            },
            {
                articleCount: 23,
                urlAdress: "http://www.abc929.com"
            }
        ]
    }

});


var putDataToTable = (async () => {
    const client = new DynamoDBClient(awsConfig);
    const response = await client.send(command);
    console.log(response);
    return response;
})();

export { putDataToTable };


