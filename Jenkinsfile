pipeline {
    agent any

    environment {
        ENV = 'prod'
		IMAGE_NAME = "qp-scs-public-frontend-${ENV}"
		CLOUD_SERVER_IP = 'sup.qingprint.sg'
		SSH_USER = 'root'
		// WORKSPACE ='C:/Users/silver.guo/jenkins/jenkins_home/workspace/qp_public_frontend'
    }

    stages {
	
       stage('Build') {
            steps {
                script {
                    if (env.ENV == 'prod') {
                        sh 'npm ci && npm run build-production'
                    } else {
                        sh "npm ci && npm run build-${env.ENV}"
                    }
                }
            }
        }

		
		stage('Replace nginx.conf') {
            steps {
                script {
                    echo "INFO: replacing nginx.conf with nginx-${env.ENV}.conf"
                    sh "cp nginx/nginx-${env.ENV}.conf nginx/nginx.conf"
                }
            }
        }
		
		stage('Build Docker Image') {
            steps {
			    sh "sudo docker rm -f ${env.IMAGE_NAME}"
			    sh "sudo docker rmi -f ${env.IMAGE_NAME}:latest"
                sh "sudo docker build -t ${env.IMAGE_NAME}:latest ."
            }
        }
		
		stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_TOKEN')]) {
                        sh "sudo docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_TOKEN}"
                        sh "sudo docker tag ${env.IMAGE_NAME}:latest ${DOCKER_HUB_USERNAME}/${env.IMAGE_NAME}:latest"
                        sh "sudo docker push ${DOCKER_HUB_USERNAME}/${env.IMAGE_NAME}:latest"
                    }
                }
            }
        }
		
		 stage('Deploy to Cloud Server') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'cloud-server-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                        sh "scp -i ${SSH_KEY} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null deploy.sh ${SSH_USER}@${CLOUD_SERVER_IP}:/tmp/frontend/"
                        sh "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${SSH_USER}@${CLOUD_SERVER_IP} 'bash /tmp/frontend/deploy.sh'"
                    }
                }
            }
        }
	   
    }

    post {
        success {
            echo 'Build completed successfully.'
        }
        failure {
            echo 'Build failed.'
        }
        always {
            echo 'Cleaning up...'
            // Add any cleanup steps if necessary
        }
    }
}