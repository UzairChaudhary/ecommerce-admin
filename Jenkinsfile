pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                docker.build ('uzairch30/ecommerce-admin', ".")
            }
        }
    }
}
