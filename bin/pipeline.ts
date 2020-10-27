import { Stack, StackProps, Construct, SecretValue } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
//import * as SecretValue from @aws-cdk/core.SecretValue

import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codestarconnections from '@aws-cdk/aws-codestarconnections';

export class MyPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();
    // const oauth = SecretValue.secretsManager('d5b3d8d183497ee466582326f4567bea2a427ef3');
    // new GitHubSource(this, 'GitHubAction', { oauthToken: oauth });
    const pipeline = new CdkPipeline(this, 'Pipeline', {
      pipelineName: 'MyAppPipeline',
      cloudAssemblyArtifact,
      
      sourceAction: new codepipeline_actions.BitBucketSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        // oauthToken: oauth,
        connectionArn: 'arn:aws:codestar-connections:us-east-1:274327307511:connection/a0214908-b207-407d-a2b3-47773f63cf72',
        // trigger: codepipeline_actions.GitHubTrigger.POLL,
        // Replace these with your actual GitHub project info
        owner: 'freek-sonal',
        repo: 'hey',
        branch: "master"
      }),

      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,

        // Use this if you need a build step (if you're not using ts-node
        // or if you have TypeScript Lambdas that need to be compiled).
        buildCommand: 'npm run build',
      }),
    });
  }
}