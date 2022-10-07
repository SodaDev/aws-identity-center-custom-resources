import { CloudFormationCustomResourceEvent, CloudFormationCustomResourceResponse, Context } from 'aws-lambda';
import { sendTs, SUCCESS, FAILED } from "./cfn";

export const lambdaHandler = async (event: CloudFormationCustomResourceEvent, context: Context): Promise<CloudFormationCustomResourceResponse> => {
    console.info("Got event", event)
    try {
        return sendTs(event, context, SUCCESS, {
            someKey: "someValue"
        }, "")
    } catch (err) {
        console.log(err);
        return sendTs(event, context, FAILED, {}, "")
    }

};
