import {CloudFormationCustomResourceEvent, CloudFormationCustomResourceResponse, Context} from "aws-lambda";

export const SUCCESS = "SUCCESS";
export const FAILED = "FAILED";
export type CloudformationStatus = "SUCCESS" | "FAILED"

/**
 *
 * @param event
 * @param context - lambda context
 * @param responseStatus - SUCCESS or FAILED
 * @param responseData
 * @param physicalResourceId - when returned value will be different it will replace items
 * @param noEcho
 */
export function sendTs(event: CloudFormationCustomResourceEvent,
                       context: Context,
                       responseStatus: CloudformationStatus,
                       responseData: any,
                       physicalResourceId: string,
                       noEcho: boolean = false): Promise<CloudFormationCustomResourceResponse> {
    const responseBody = {
        Status: responseStatus,
        Reason: "See the details in CloudWatch Log Stream: " + context.logStreamName,
        PhysicalResourceId: physicalResourceId || context.logStreamName,
        StackId: event.StackId,
        RequestId: event.RequestId,
        LogicalResourceId: event.LogicalResourceId,
        NoEcho: noEcho,
        Data: responseData
    };

    return Promise.resolve(responseBody)
}