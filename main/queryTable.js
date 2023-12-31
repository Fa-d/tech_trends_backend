import AWS from "aws-sdk";
import 'dotenv/config';
var awsConfig = {
    region: `${process.env.DYNAMO_DB_REGION}`,
    credentials: {
        accessKeyId: `${process.env.ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`
    }
}
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB(awsConfig);

var tableQuery = function (err, data) {
    if (err) {
        console.log("Error", err);
        return {}
    } else {
        return data.Items[0].url_list.L
    }
}

var dynamicRes2 = dynamodb.query({
    TableName: 'list_feed',
    KeyConditionExpression: "urls = :key AND sort = :sort",
    ExpressionAttributeValues: {
        ":key": { "S": "pk" },
        ":sort": { "S": "sk" }
    }
}, tableQuery)

export { dynamicRes2 };