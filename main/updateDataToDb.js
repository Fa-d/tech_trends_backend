import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import 'dotenv/config';
import { readFileSync } from 'fs';

var awsConfig = {
    region: `${process.env.DYNAMO_DB_REGION}`,
    credentials: {
        accessKeyId: `${process.env.ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`
    }
}

var categories = JSON.parse(readFileSync('/Users/faddy/MyLab/webDir/asw_rss_backend/main/fileBuckets/categories.json', 'utf8'));
var childArticles = JSON.parse(readFileSync('/Users/faddy/MyLab/webDir/asw_rss_backend/main/fileBuckets/childArticles.json', 'utf8'));
var motherArticles = JSON.parse(readFileSync('/Users/faddy/MyLab/webDir/asw_rss_backend/main/fileBuckets/motherArticles.json', 'utf8'));



async function insertCatagoryDataInChunks(categories) {
    const client = new DynamoDBClient(awsConfig);
    const chunkSize = 600;

    for (let i = 0; i < categories.length; i += chunkSize) {

        const chunk = categories.slice(i, i + chunkSize);
        const params = {
            TableName: 'list_feed',
            Key: { urls: "pk", sort: "sk" },
            UpdateExpression: "SET #categories = :val",
            ExpressionAttributeNames: {
                "#categories": "categories",
            },
            ExpressionAttributeValues:
            {
                ":val": chunk
            },
        };

        try {
            await client.send(new UpdateCommand(params));
            console.log(`Inserted ${chunk.length} items into DynamoDB`);
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Pause for 3 seconds
        } catch (error) {
            console.error(`Error inserting data into DynamoDB: ${error}`);
        }
    }
}



async function insertMotherArticlesDataInChunks(categories) {
    const client = new DynamoDBClient(awsConfig);
    const chunkSize = 100;

    for (let i = 0; i < categories.slice(200, categories.length).length; i += chunkSize) {

        const chunk = categories.slice(i, i + chunkSize);
        const params = {
            TableName: 'list_feed',
            Key: { urls: "pk", sort: "sk" },
            UpdateExpression: "SET #motherArticles = :val",
            ExpressionAttributeNames: {
                "#motherArticles": "motherArticles",
            },
            ExpressionAttributeValues: {
                ":val": chunk
            }
        };

        try {
            await client.send(new UpdateCommand(params));
            console.log(`Inserted motherArticles ${chunk.length} items into DynamoDB`);
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Pause for 3 seconds
        } catch (error) {
            console.error(`Error inserting data into DynamoDB: ${error}`);
        }
    }
}



async function insertChildArticlesDataInChunks(childArticles) {
    const client = new DynamoDBClient(awsConfig);
    const chunkSize = 10;

    for (let i = 0; i < childArticles.slice(800, childArticles.length).length; i += chunkSize) {

        const chunk = childArticles.slice(i, i + chunkSize);
        const params = {
            TableName: 'list_feed',
            Key: { urls: "pk", sort: "sk" },
            UpdateExpression: "SET #childArticles = :val",
            ExpressionAttributeNames: {
                "#childArticles": "childArticles",
            },
            ExpressionAttributeValues: {
                ":val": chunk
            },
        };

        try {
            await client.send(new UpdateCommand(params));
            console.log(`Inserted childArticles ${chunk.length} items into DynamoDB`);

            const randomTime = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000;
            await new Promise((resolve) => setTimeout(resolve, randomTime));
        } catch (error) {
            console.error(`Error inserting data into DynamoDB: ${error}`);
        }
    }
}


insertCatagoryDataInChunks(categories);
//insertChildArticlesDataInChunks(childArticles);
//insertMotherArticlesDataInChunks(motherArticles);


