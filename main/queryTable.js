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

var params = {
    TableName: 'list_feed',
    KeyConditionExpression: "urls = :key AND sort = :sort",
    ExpressionAttributeValues: {
        ":key": { "S": "pk" },
        ":sort": { "S": "sk" }
    }
};

var tableQuery = function () {
    dynamodb.query(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            data.Items[0].url_list.L.forEach(printItem);
            console.log(data.Items[0].url_list.L)
        }
    });
}

function printItem(item, index, arr) {
    console.log(arr[index])
}
export { tableQuery };