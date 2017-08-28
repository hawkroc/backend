#!groovy
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
    stage('Build environment') {
      steps {
        // Build the meteor packaging environment.
        docker-compose up environment
      }
    }

    stage('Package application') {
      steps {
        // Bring up the packaging container to build the meteor application.
        docker-compose up -d packager
      }
    }

    stage('Build deployment image') {
      steps {
        // Build the runtime service into a deployable image.
        docker-compose build runtime
        // Bring down the packager container since we now have all the runtime artifacts.
        docker stop blockeeper_packager-artifacts
        // Tag the local image with the environment image name for automated publishing.
        docker tag blockeeper_runtime ${IMAGE_NAME}
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
        ENV = 'dev'
        SUBSCRIPTION_ID = '93a8e567-e173-4154-93fc-5b60248c8706'
        CLUSTER_URL = 'https://centrality-dev-master.australiasoutheast.cloudapp.azure.com'
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