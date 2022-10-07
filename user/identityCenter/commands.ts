import {
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent
} from "aws-lambda";
import {CreateUserCommand, DeleteUserCommand, UpdateUserCommand} from "@aws-sdk/client-identitystore";
import {AttributeOperation, UpdateUserRequest} from "@aws-sdk/client-identitystore/dist-types/models/models_0";
import * as _ from "lodash";

export function buildCreateUserCommand(event: CloudFormationCustomResourceCreateEvent): CreateUserCommand {
    return new CreateUserCommand({
        IdentityStoreId: event.ResourceProperties["IdentityStoreId"],
        UserName: event.ResourceProperties["UserName"],
        Name: event.ResourceProperties["Name"],
        DisplayName: event.ResourceProperties["DisplayName"],
        NickName: event.ResourceProperties["NickName"],
        ProfileUrl: event.ResourceProperties["ProfileUrl"],
        Emails: event.ResourceProperties["Emails"],
        Addresses: event.ResourceProperties["Addresses"],
        PhoneNumbers: event.ResourceProperties["PhoneNumbers"],
        UserType: event.ResourceProperties["UserType"],
        Title: event.ResourceProperties["Title"],
        PreferredLanguage: event.ResourceProperties["PreferredLanguage"],
        Locale: event.ResourceProperties["Locale"],
        Timezone: event.ResourceProperties["Timezone"],
    });
}

export function buildDeleteUserCommand(event: CloudFormationCustomResourceDeleteEvent): DeleteUserCommand {
    return new DeleteUserCommand({
        IdentityStoreId: event.ResourceProperties["IdentityStoreId"],
        UserId: event.PhysicalResourceId,
    });
}

export function buildUpdateUserCommand(event: CloudFormationCustomResourceUpdateEvent): UpdateUserCommand {
    let operations: AttributeOperation[] = []
    operations.push(...buildUpdateOperations(event));
    operations.push(...buildDeleteOperations(event));

    let parameters: UpdateUserRequest = {
        IdentityStoreId: event.ResourceProperties["IdentityStoreId"],
        UserId: event.PhysicalResourceId,
        Operations: operations
    };
    return new UpdateUserCommand(parameters);
}

function buildUpdateOperations(event: CloudFormationCustomResourceUpdateEvent): AttributeOperation[] {
    let operations: AttributeOperation[] = []
    for (let resourcePropertiesKey in event.ResourceProperties) {
        if (resourcePropertiesKey === "ServiceToken") {
            continue
        }
        if (_.isEqual(event.ResourceProperties[resourcePropertiesKey], event.OldResourceProperties[resourcePropertiesKey])) {
            continue
        }
        const key = _.camelCase(resourcePropertiesKey)

        if (key === "emails" || key === "addresses" || key === "phoneNumbers") {
            // Weird handling of booleans in primary field
            for (let resourcePropertyElement of event.ResourceProperties[resourcePropertiesKey]) {
                if ("Primary" in resourcePropertyElement) {
                    resourcePropertyElement["Primary"] = _.toLower(resourcePropertyElement["Primary"]) === "true"
                }
            }
        }

        operations.push({
            AttributePath: key,
            AttributeValue: event.ResourceProperties[resourcePropertiesKey]
        })
    }
    return operations
}

function buildDeleteOperations(event: CloudFormationCustomResourceUpdateEvent): AttributeOperation[] {
    let operations: AttributeOperation[] = []
    for (let resourcePropertiesKey in event.OldResourceProperties) {
        if (!event.ResourceProperties[resourcePropertiesKey]) {
            operations.push({
                AttributePath: _.camelCase(resourcePropertiesKey),
                AttributeValue: null
            })
        }
    }
    return operations
}
