#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MyPipelineStack } from '../lib/my-pipeline-stack';

const app = new cdk.App();
new MyPipelineStack(app, 'PipelineStack', {
  env: {
    account: '274327307511',
    region: 'eu-west-1',
  }
});

app.synth();

