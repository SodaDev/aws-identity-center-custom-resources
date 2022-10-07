import {
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceEvent,
    CloudFormationCustomResourceResponse,
    CloudFormationCustomResourceUpdateEvent,
    Context
} from 'aws-lambda';
import {IdentitystoreClient} from "@aws-sdk/client-identitystore"
import {buildCreateUserCommand, buildDeleteUserCommand, buildUpdateUserCommand} from "./identityCenter/commands";
import {createLambdaHandler, CustomResourceResult} from "cfn-response-ts";

const identityStoreClient = new IdentitystoreClient({})
const handler = createLambdaHandler(onCreate, onUpdate, onDelete)

export const lambdaHandler = async (event: CloudFormationCustomResourceEvent, context: Context): Promise<CloudFormationCustomResourceResponse> => {
    console.info("Got event", JSON.stringify(event), 'Got context', context)

    return handler(event, context)
}

async function onCreate(event: CloudFormationCustomResourceCreateEvent, context: Context): Promise<CustomResourceResult> {
    const command = buildCreateUserCommand(event)
    const result = await identityStoreClient.send(command);
    return {
        PhysicalResourceId: result.UserId,
        Data: {
            UserId: result.UserId,
        },
        Status: "SUCCESS",
    }
}

async function onUpdate(event: CloudFormationCustomResourceUpdateEvent, context: Context): Promise<CustomResourceResult> {
    const command = buildUpdateUserCommand(event)
    await identityStoreClient.send(command)

    return {
        PhysicalResourceId: event.PhysicalResourceId,
        Data: {
            UserId: event.PhysicalResourceId,
        },
        Status: "SUCCESS",
    }
}

async function onDelete(event: CloudFormationCustomResourceDeleteEvent, context: Context): Promise<CustomResourceResult> {
    const command = buildDeleteUserCommand(event)
    await identityStoreClient.send(command)

    return {
        PhysicalResourceId: event.PhysicalResourceId,
        Data: {
            UserId: event.PhysicalResourceId,
        },
        Status: "SUCCESS",
    }
}
