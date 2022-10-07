import {buildCreateUserCommand, buildDeleteUserCommand, buildUpdateUserCommand} from "../../identityCenter/commands";
import {CloudFormationCustomResourceCreateEvent} from "aws-lambda/trigger/cloudformation-custom-resource";
import {CreateUserCommandInput, DeleteUserCommandInput, UpdateUserCommand} from "@aws-sdk/client-identitystore";
import {CloudFormationCustomResourceDeleteEvent, CloudFormationCustomResourceUpdateEvent} from "aws-lambda";
import {UpdateUserRequest} from "@aws-sdk/client-identitystore/dist-types/models/models_0";

describe('Unit test for building sso user create', () => {

    it("Should create user command out of minimum Cloudformation event", () => {
        // GIVEN
        const input: CloudFormationCustomResourceCreateEvent = {
            RequestType: "Create",
            ServiceToken: "",
            ResponseURL: "https://cloudformation-custom-resource-response-euwest1.s3-eu-west-1.amazonaws.com/...",
            StackId: "...",
            RequestId: "...",
            LogicalResourceId: "CreateUserResource",
            ResourceType: "Custom::IAMIdentityCenterUser",
            ResourceProperties: {
                ServiceToken: "...",
                SomeAnotherKey: "anything",
                IdentityStoreId: "some-identity-store-id",
                UserName: "iaac"
            }
        }

        // WHEN
        const result = buildCreateUserCommand(input)
        const expected: CreateUserCommandInput = {
            IdentityStoreId: "some-identity-store-id",
            UserName: "iaac"
        }

        // THEN
        expect(result.input).toEqual(expected)
    })

    it("Should create user command out of Cloudformation event", () => {
        // GIVEN
        const input: CloudFormationCustomResourceCreateEvent = {
            RequestType: "Create",
            ServiceToken: "",
            ResponseURL: "https://cloudformation-custom-resource-response-euwest1.s3-eu-west-1.amazonaws.com/...",
            StackId: "...",
            RequestId: "...",
            LogicalResourceId: "CreateUserResource",
            ResourceType: "Custom::IAMIdentityCenterUser",
            ResourceProperties: {
                ServiceToken: "...",
                SomeAnotherKey: "anything",
                IdentityStoreId: "some-identity-store-id",
                UserName: "iaac",
                DisplayName: "iaac display name",
                Emails: [
                    {
                        Primary: true,
                        Value: "iaacek@company.com",
                        Type: "Work"
                    },
                    {
                        Primary: false,
                        Value: "iaacek@domain.com",
                        Type: "Private"
                    }
                ],
                Name: {
                    FamilyName: "Iaackowski",
                    GivenName: "Iaacek",
                    MiddleName: "SomeMiddleName",
                    HonorificPrefix: "Xyz.",
                    HonorificSuffix: "Q.W.E"
                },
                NickName: "iaaca",
                ProfileUrl: "https://some-portal.com/iaaca",
                Addresses: [
                    {
                        Primary: true,
                        Type: "Home",
                        Country: "xx",
                        StreetAddress: "SomeStreet 12",
                        Region: "SomeRegion",
                        PostalCode: "00-000",
                        Locality: "SomeLocality",
                        Formatted: "SomeStreet 12, SomeRegion, 00-000 xx"
                    },
                    {
                        Primary: true,
                        Type: "Workshop",
                        Country: "xx",
                        StreetAddress: "AnotherStreet 21",
                        Region: "AnotherRegion",
                        PostalCode: "00-666",
                        Locality: "AnotherLocality"
                    }
                ],
                PhoneNumbers: [
                    {
                        Primary: false,
                        Type: "Office",
                        Value: "123-456-789"
                    },
                    {
                        Primary: true,
                        Type: "Mobile",
                        Value: "+1 (800) 123-4567"
                    }
                ],
                UserType: "manager",
                Title: "Maestro",
                PreferredLanguage: "en-us",
                Locale: "en-en",
                Timezone: "GMT+2"
            }
        }

        // WHEN
        const result = buildCreateUserCommand(input)
        const expected: CreateUserCommandInput = {
            IdentityStoreId: "some-identity-store-id",
            UserName: "iaac",
            Name: {
                FamilyName: "Iaackowski",
                GivenName: "Iaacek",
                MiddleName: "SomeMiddleName",
                HonorificPrefix: "Xyz.",
                HonorificSuffix: "Q.W.E"
            },
            DisplayName: "iaac display name",
            NickName: "iaaca",
            ProfileUrl: "https://some-portal.com/iaaca",
            Emails: [
                {
                    Primary: true,
                    Value: "iaacek@company.com",
                    Type: "Work"
                },
                {
                    Primary: false,
                    Value: "iaacek@domain.com",
                    Type: "Private"
                }
            ],
            Addresses: [
                {
                    Primary: true,
                    Type: "Home",
                    Country: "xx",
                    StreetAddress: "SomeStreet 12",
                    Region: "SomeRegion",
                    PostalCode: "00-000",
                    Locality: "SomeLocality",
                    Formatted: "SomeStreet 12, SomeRegion, 00-000 xx"
                },
                {
                    Primary: true,
                    Type: "Workshop",
                    Country: "xx",
                    StreetAddress: "AnotherStreet 21",
                    Region: "AnotherRegion",
                    PostalCode: "00-666",
                    Locality: "AnotherLocality"
                }
            ],
            PhoneNumbers: [
                {
                    Primary: false,
                    Type: "Office",
                    Value: "123-456-789"
                },
                {
                    Primary: true,
                    Type: "Mobile",
                    Value: "+1 (800) 123-4567"
                }
            ],
            UserType: "manager",
            Title: "Maestro",
            PreferredLanguage: "en-us",
            Locale: "en-en",
            Timezone: "GMT+2"
        }

        // THEN
        expect(result.input).toEqual(expected)
    })

});

describe('Unit test for building sso user delete', () => {
    it("Should create delete command out of Cloudformation event", () => {
        // GIVEN
        const input: CloudFormationCustomResourceDeleteEvent = {
            RequestType: "Delete",
            ServiceToken: "",
            ResponseURL: "https://cloudformation-custom-resource-response-euwest1.s3-eu-west-1.amazonaws.com/...",
            StackId: "...",
            RequestId: "...",
            LogicalResourceId: "CreateUserResource",
            PhysicalResourceId: "some-resource-id",
            ResourceType: "Custom::IAMIdentityCenterUser",
            ResourceProperties: {
                ServiceToken: "...",
                SomeAnotherKey: "anything",
                IdentityStoreId: "some-identity-store-id",
                UserName: "iaac",
                DisplayName: "iaac display name",
                Emails: [
                    {
                        Primary: true,
                        Value: "iaacek@company.com",
                        Type: "Work"
                    },
                    {
                        Primary: false,
                        Value: "iaacek@domain.com",
                        Type: "Private"
                    }
                ],
                Name: {
                    FamilyName: "Iaackowski",
                    GivenName: "Iaacek",
                    MiddleName: "SomeMiddleName",
                    HonorificPrefix: "Xyz.",
                    HonorificSuffix: "Q.W.E"
                },
                NickName: "iaaca",
                ProfileUrl: "https://some-portal.com/iaaca",
                Addresses: [
                    {
                        Primary: true,
                        Type: "Home",
                        Country: "xx",
                        StreetAddress: "SomeStreet 12",
                        Region: "SomeRegion",
                        PostalCode: "00-000",
                        Locality: "SomeLocality",
                        Formatted: "SomeStreet 12, SomeRegion, 00-000 xx"
                    },
                    {
                        Primary: true,
                        Type: "Workshop",
                        Country: "xx",
                        StreetAddress: "AnotherStreet 21",
                        Region: "AnotherRegion",
                        PostalCode: "00-666",
                        Locality: "AnotherLocality"
                    }
                ],
                PhoneNumbers: [
                    {
                        Primary: false,
                        Type: "Office",
                        Value: "123-456-789"
                    },
                    {
                        Primary: true,
                        Type: "Mobile",
                        Value: "+1 (800) 123-4567"
                    }
                ],
                UserType: "manager",
                Title: "Maestro",
                PreferredLanguage: "en-us",
                Locale: "en-en",
                Timezone: "GMT+2"
            }
        }

        // WHEN
        const result = buildDeleteUserCommand(input)
        const expected: DeleteUserCommandInput = {
            IdentityStoreId: "some-identity-store-id",
            UserId: "some-resource-id"
        }

        // THEN
        expect(result.input).toEqual(expected)
    })
})

describe('Unit test for building sso user update', () => {

    it("Should create update command out of mixed operations event", () => {
        // GIVEN
        const input: CloudFormationCustomResourceUpdateEvent = {
            RequestType: "Update",
            ServiceToken: "...",
            ResponseURL: "...",
            StackId: "...",
            RequestId: "...",
            LogicalResourceId: "DevopsUser",
            PhysicalResourceId: "user-id",
            ResourceType: "Custom::IAMIdentityCenterUser",
            ResourceProperties: {
                ServiceToken: "some-service-token",
                Locale: "en-en",
                Timezone: "GMT+2",
                UserName: "devops",
                Title: "Maestro",
                IdentityStoreId: "some-identity-store-id",
                Name: {
                    FamilyName: "Devops surname",
                    GivenName: "Devops name",
                    MiddleName: "SomeMiddleName",
                },
                DisplayName: "some devops user",
                PreferredLanguage: "en-us",
                Emails: [
                    {
                        Primary: "false",
                        Value: "iaacek@company.com"
                    }
                ],
                UserType: "manager",
                ProfileUrl: "https://some-portalcom/devops"
            },
            OldResourceProperties: {
                ServiceToken: "some-service-token",
                Locale: "en-en",
                Timezone: "GMT+2",
                UserName: "devops",
                IdentityStoreId: "some-identity-store-id",
                NickName: "devops guru",
                Name: {
                    HonorificSuffix: "Q.W.E",
                    FamilyName: "Devops surname",
                    GivenName: "Devops name",
                    MiddleName: "SomeMiddleName",
                    HonorificPrefix: "Xyz."
                },
                DisplayName: "some devops user",
                PreferredLanguage: "en-us",
                Emails: [
                    {
                        Primary: "true",
                        Value: "iaacek@company.com"
                    }
                ],
                UserType: "manager",
                ProfileUrl: "https://some-portalcom/devops"
            }
        }


        // WHEN
        const result = buildUpdateUserCommand(input)
        const expected: UpdateUserRequest = {
            IdentityStoreId: "some-identity-store-id",
            UserId: "user-id",
            Operations: [
                {
                    AttributePath: "title",
                    AttributeValue: "Maestro"
                },
                {
                    AttributePath: "name",
                    AttributeValue: {
                        "FamilyName": "Devops surname",
                        "GivenName": "Devops name",
                        "MiddleName": "SomeMiddleName"
                    }
                },
                {
                    AttributePath: "emails",
                    AttributeValue: [
                        {
                            "Primary": false,
                            "Value": "iaacek@company.com"
                        }
                    ]
                },
                {
                    AttributePath: "nickName",
                    AttributeValue: null
                }
            ],
        }

        // THEN
        expect(result.input).toEqual(expected)
    })

    it("Should create update command for e-mail 'primary' update", () => {
        // GIVEN
        const input: CloudFormationCustomResourceUpdateEvent = {
            "RequestType": "Update",
            "ServiceToken": "...",
            "ResponseURL": "...",
            "StackId": "...",
            "RequestId": "...",
            "LogicalResourceId": "DevopsUser",
            "PhysicalResourceId": "user-id",
            "ResourceType": "Custom::IAMIdentityCenterUser",
            "ResourceProperties": {
                "ServiceToken": "...",
                "Locale": "en-en",
                "Timezone": "GMT+2",
                "UserName": "devops",
                "Title": "Maestro",
                "IdentityStoreId": "some-identity-store-id",
                "NickName": "devops guru",
                "Name": {
                    "HonorificSuffix": "Q.W.E",
                    "FamilyName": "Devops surname",
                    "GivenName": "Devops name",
                    "MiddleName": "SomeMiddleName",
                    "HonorificPrefix": "Xyz."
                },
                "DisplayName": "some devops user",
                "PreferredLanguage": "en-us",
                "Emails": [
                    {
                        "Primary": "false",
                        "Value": "iaacek@company.com"
                    }
                ],
                "UserType": "manager",
                "ProfileUrl": "https://some-portalcom/devops"
            },
            "OldResourceProperties": {
                "ServiceToken": "...",
                "Locale": "en-en",
                "Timezone": "GMT+2",
                "UserName": "devops",
                "Title": "Maestro",
                "IdentityStoreId": "some-identity-store-id",
                "NickName": "devops guru",
                "Name": {
                    "HonorificSuffix": "Q.W.E",
                    "FamilyName": "Devops surname",
                    "GivenName": "Devops name",
                    "MiddleName": "SomeMiddleName",
                    "HonorificPrefix": "Xyz."
                },
                "DisplayName": "some devops user",
                "PreferredLanguage": "en-us",
                "Emails": [
                    {
                        "Primary": "true",
                        "Value": "iaacek@company.com"
                    }
                ],
                "UserType": "manager",
                "ProfileUrl": "https://some-portalcom/devops"
            }
        }

        // WHEN
        const result = buildUpdateUserCommand(input)
        const expected: UpdateUserRequest = {
            IdentityStoreId: "some-identity-store-id",
            UserId: "user-id",
            Operations: [{
                AttributePath: "emails",
                AttributeValue: [{
                    Primary: false,
                    Value: "iaacek@company.com",
                }]
            }]
        }

        // THEN
        expect(result.input).toEqual(expected)
    })

    it("Should create delete attribute action on simple attribute removal", () => {
        // GIVEN
        const input: CloudFormationCustomResourceUpdateEvent = {
            "RequestType": "Update",
            "ServiceToken": "...",
            "ResponseURL": "...",
            "StackId": "...",
            "RequestId": "...",
            "LogicalResourceId": "DevopsUser",
            "PhysicalResourceId": "user-id",
            "ResourceType": "Custom::IAMIdentityCenterUser",
            "ResourceProperties": {
                "ServiceToken": "...",
                "Locale": "en-en",
                "Timezone": "GMT+2",
                "UserName": "devops",
                "IdentityStoreId": "some-identity-store-id",
                "NickName": "devops guru",
                "Name": {
                    "HonorificSuffix": "Q.W.E",
                    "FamilyName": "Devops surname",
                    "GivenName": "Devops name",
                    "MiddleName": "SomeMiddleName",
                    "HonorificPrefix": "Xyz."
                },
                "DisplayName": "some devops user",
                "PreferredLanguage": "en-us",
                "Emails": [
                    {
                        "Primary": "false",
                        "Value": "iaacek@company.com"
                    }
                ],
                "UserType": "manager",
                "ProfileUrl": "https://some-portalcom/devops"
            },
            "OldResourceProperties": {
                "ServiceToken": "...",
                "Locale": "en-en",
                "Timezone": "GMT+2",
                "UserName": "devops",
                "Title": "Maestro",
                "IdentityStoreId": "some-identity-store-id",
                "NickName": "devops guru",
                "Name": {
                    "HonorificSuffix": "Q.W.E",
                    "FamilyName": "Devops surname",
                    "GivenName": "Devops name",
                    "MiddleName": "SomeMiddleName",
                    "HonorificPrefix": "Xyz."
                },
                "DisplayName": "some devops user",
                "PreferredLanguage": "en-us",
                "Emails": [
                    {
                        "Primary": "false",
                        "Value": "iaacek@company.com"
                    }
                ],
                "UserType": "manager",
                "ProfileUrl": "https://some-portalcom/devops"
            }
        }

        // WHEN
        const result = buildUpdateUserCommand(input)
        const expected: UpdateUserRequest = {
            IdentityStoreId: "some-identity-store-id",
            UserId: "user-id",
            Operations: [{
                AttributePath: "title",
                AttributeValue: null
            }]
        }

        // THEN
        expect(result.input).toEqual(expected)
    })

    it("Should create override attribute action on simple attribute update", () => {
        // GIVEN
        const input: CloudFormationCustomResourceUpdateEvent = {
            "RequestType": "Update",
            "ServiceToken": "...",
            "ResponseURL": "...",
            "StackId": "...",
            "RequestId": "...",
            "LogicalResourceId": "DevopsUser",
            "PhysicalResourceId": "user-id",
            "ResourceType": "Custom::IAMIdentityCenterUser",
            "ResourceProperties": {
                "ServiceToken": "...",
                "Locale": "en-en",
                "Timezone": "GMT+2",
                "UserName": "devops",
                "Title": "Master",
                "IdentityStoreId": "some-identity-store-id",
                "NickName": "devops guru",
                "Name": {
                    "HonorificSuffix": "Q.W.E",
                    "FamilyName": "Devops surname",
                    "GivenName": "Devops name",
                    "MiddleName": "SomeMiddleName",
                    "HonorificPrefix": "Xyz."
                },
                "DisplayName": "some devops user",
                "PreferredLanguage": "en-us",
                "Emails": [
                    {
                        "Primary": "false",
                        "Value": "iaacek@company.com"
                    }
                ],
                "UserType": "manager",
                "ProfileUrl": "https://some-portalcom/devops"
            },
            "OldResourceProperties": {
                "ServiceToken": "...",
                "Locale": "en-en",
                "Timezone": "GMT+2",
                "UserName": "devops",
                "Title": "Maestro",
                "IdentityStoreId": "some-identity-store-id",
                "NickName": "devops guru",
                "Name": {
                    "HonorificSuffix": "Q.W.E",
                    "FamilyName": "Devops surname",
                    "GivenName": "Devops name",
                    "MiddleName": "SomeMiddleName",
                    "HonorificPrefix": "Xyz."
                },
                "DisplayName": "some devops user",
                "PreferredLanguage": "en-us",
                "Emails": [
                    {
                        "Primary": "false",
                        "Value": "iaacek@company.com"
                    }
                ],
                "UserType": "manager",
                "ProfileUrl": "https://some-portalcom/devops"
            }
        }

        // WHEN
        const result = buildUpdateUserCommand(input)
        const expected: UpdateUserRequest = {
            IdentityStoreId: "some-identity-store-id",
            UserId: "user-id",
            Operations: [{
                AttributePath: "title",
                AttributeValue: "Master"
            }]
        }

        // THEN
        expect(result.input).toEqual(expected)
    })
})
