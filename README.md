# AWS Identity Store user custom resource
This repository contains code for deployment of custom resource that can used for creation of AWS Identity Store (SSO) users.

## Why?
As of today it's still not supported in Cloudformation, only in SDK and CLI

## How to deploy it?
Just run `make deploy` in root folder. It will build application using SAM and will deploy it to your AWS account. By default it will create S3 bucket for storing artifacts. If you already have s3 bucket for artifacts just remove `--resolve-s3` parameter and pass your own s3 bucket according to SAM documentation.

## What will be deployed?
It will deploy Lambda function that will be responsible for managing your user resource. It exposes it's arn under `SsoUserFunction::Arn` 

## How can I use it?
You can create your identity center (sso) user with snippet like this:

```yaml
  DevopsUser:
    Type: Custom::IAMIdentityCenterUser
    Properties:
      ServiceToken:
        Fn::ImportValue: SsoUserFunction::Arn
      IdentityStoreId: !Ref IdentityStoreId
      UserName: "devops"
      DisplayName: "some devops user"
      Emails:
        - Value: mail@domain.com
          Primary: True
          Type: Official
      Name:
        GivenName: "Devops name"
        FamilyName: "Devops surname"
        MiddleName: "SomeMiddleName"
        HonorificPrefix: "Xyz."
        HonorificSuffix: "Q.W.E"
      NickName: "devops guru"
      ProfileUrl: https://some-portalcom/devops
      Addresses:
        - Primary: true
          Type: "Office"
          Country: "XX"
          StreetAddress: "SomeStreet 1"
          Region: "SomeRegion"
          PostalCode: "00-666"
          Locality: "xx-yy"
      PhoneNumbers:
        - Primary: true
          Type: "Mobile"
          Value: "+1 (800) 123-4567"
      UserType: "manager"
      Title: "Maestro"
      PreferredLanguage: "en-us"
      Locale: "en-en"
      Timezone: "GMT+2"
```

### Properties
It supports creation, updates and deletes of users.
All operations work according to:
- https://docs.aws.amazon.com/cli/latest/reference/identitystore/create-user.html
- https://docs.aws.amazon.com/cli/latest/reference/identitystore/update-user.html
- https://docs.aws.amazon.com/cli/latest/reference/identitystore/delete-user.html

### Return values

#### Fn::GetAtt
##### UserId
Identity store UserId might be used like `!GetAtt UserResource.UserId`