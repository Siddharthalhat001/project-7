pipeline {
   
    agent any
  
    stages {
        stage('CHECKOUT THE SOURCE CODE'){
            steps {
                git branch:'master',                
                url:'https://github.com/Siddharthalhat001/project-7.git'
                
                }
            }              

        stage('BUILDING DOCKER IMAGE') {
            steps {
                echo 'Building the Application .....'               
                sh 'docker-compose build'
                echo 'Application Image Built Successfully !!!'
            }
        }     
                          
//         stage('Push Images to Doker hub ') {
//             steps {
//                 sh 'docker login'
//                 echo 'Successfully Log in  .....'                
//                 sh "docker push siddharthalhat001/proj7-backend:1"
//                 sh "docker push siddharthalhat001/proj7-frontend:1"              
//                 echo 'Application down Successfully !!!'
//             }
//         }       
        stage('Docker Compose Down') {
            steps {
                echo 'Taking down the Application .....'                
                sh "docker-compose down"
                echo 'Application down Successfully !!!'
            }
        }
        stage('DEPLOY') {
            steps {
                echo 'Deploying the Application .....'
                sh 'docker-compose up -d'
                echo 'Application Running Successfully !!!'
            }
        }
    }
}
