pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'my-backend'
        DOCKER_IMAGE_FRONTEND = 'my-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    echo 'Building Docker images...'
                    sh 'docker build -t my-backend ./backend'
                    sh 'docker build -t my-frontend ./frontend'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running backend tests...'
                    sh 'docker run --rm my-backend npm test'
                }
            }
        }

        stage('Deploy') {
            input {
                message "Deploy to production?"
                ok "Yes, deploy!"
            }
            steps {
                script {
                    echo 'Cleaning up old containers...'
                    sh 'docker stop frontend-app backend-app mysql-db || true'
                    sh 'docker rm frontend-app backend-app mysql-db || true'
                    sh 'docker network create app-network || true'

                    echo 'Deploying database...'
                    sh 'docker run -d --name mysql-db --network app-network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=taskdb -v ${WORKSPACE}/database:/docker-entrypoint-initdb.d mysql:8.0'

                    echo 'Deploying backend...'
                    sh 'docker run -d --name backend-app --network app-network -e DB_HOST=mysql-db -e DB_USER=root -e DB_PASSWORD=root -e DB_NAME=taskdb -e PORT=5000 -p 5000:5000 my-backend'

                    echo 'Deploying frontend...'
                    sh 'docker run -d --name frontend-app --network app-network -p 5173:5173 my-frontend'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed. Checking logs...'
            sh 'docker logs frontend-app || true'
            sh 'docker logs backend-app || true'
            sh 'docker logs mysql-db || true'
        }
    }
}
