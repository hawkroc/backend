#!groovy

/**
  Jenkins build pipeline definition.

  Deployed at:
    https://jenkins.centrality.ai/jenkins/job/blockeeper/
    
*/
pipeline {
  agent {
    label 'linux'
  }

  environment {
    SERVICE_NAME = 'blockeeper'
    TENANT = 'ea23b9ad-a3ca-4936-8613-68446bd85dde'
    SERVICE_PRINCIPAL = credentials('SERVICE_PRINCIPAL')
    KUBERNETES_KEY = credentials('kubernetes-rsa')
  }

  stages {

    stage('Package application') {
      steps {
        // Bring up the packaging container to build the meteor application.
        sh 'docker-compose up packager'
      }
    }

    stage('Test application') {
      steps {
        sh 'docker-compose up testing'
      }
    }

    stage('Build deployment image') {
      steps {
        // Build the runtime service into a deployable image.
        sh 'docker-compose build runtime'
        // Tag the local image with the environment image name for automated publishing.
        sh 'docker tag blockeeper_runtime ${IMAGE_NAME}'
      }
    }

    stage('Publish image') {
      environment {
        ACR = credentials('AzureDockerRegistry')
      }
      steps {
        sh './centrality.deploy/publish.sh'
      }
    }

    stage('Dev deployment') {
      environment {
        TENANT = 'ea23b9ad-a3ca-4936-8613-68446bd85dde'
        SERVICE_PRINCIPAL = credentials('SERVICE_PRINCIPAL')
        SUBSCRIPTION_ID = '93a8e567-e173-4154-93fc-5b60248c8706'
        KUBERNETES_KEY = credentials('kubernetes-rsa')
        CLUSTER_URL = 'https://centrality-dev-master-0.australiasoutheast.cloudapp.azure.com'
        ENV = 'dev'
      }
      steps {
        sh './centrality.deploy/deploy.sh'
      }
    }

    stage('Clean docker') {
      steps {
          sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock zzrot/docker-clean'
      }
    }
  }
}