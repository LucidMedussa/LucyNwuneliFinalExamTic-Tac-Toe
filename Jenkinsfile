pipeline{
agent { label 'aws'}
environment{
TOKENAWS = credentials('controller-ssh-key')
}

    stages{
        stage('Deploy to Testing'){
            steps{
            sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@54.242.202.176 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html; sudo git clone https://github.com/LucidMedussa/LucyNwuneliFinalExamTic-Tac-Toe /var/www/html"'
            script{
                try{
                    //Install Selenium webdriver
                    sh 'npm install selenium-webdriver'
                    
                    //Run the test and capture the output
                    def output = sh(script: ' node scripts/testscript.js', returnStdout: true).trim()

                    //Debugging printing the output
                    echo "Test Output: ${output}"

                    //Ensure TEST_RESULT_FILE is not null
                    if (!env.TEST_RESULT_FILE){
                        error("TEST_RESULT_FILE is not defined")
                    }

                    //Write the result to a file

                    if(output.contains('Test Success')){
                        writeFile file: env.TEST_RESULT_FILE, text: 'true'
                    }else{
                        writeFile file: env.TEST_RESULT_FILE, text: 'false'
                    }
                }catch (Exception e) {
                    echo "Test failed: ${e.message}"
                    writeFile file: env.TEST_RESULT_FILE, text: 'false'
                }
            }
             }
           
            }
        
        

         stage('Deploy to Staging'){
            when{
               expression {
                 // Read the test result from the file id true continue
                def testResult = readFile(env.TEST_RESULT_FILE).trim()
                return testResult == 'true'
                }           
             }
            steps{
            sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@34.230.76.252 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html; sudo git clone https://github.com/LucidMedussa/LucyNwuneliFinalExamTic-Tac-Toe /var/www/html"'
            }
        }

         stage('Deploy to CCTB-ProductionEnv1'){
            steps{
            sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@35.172.114.208 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html; sudo git clone https://github.com/LucidMedussa/LucyNwuneliFinalExamTic-Tac-Toe /var/www/html"'
            }
        }

        stage('Deploy to CCTB-ProductionEnv2'){
            steps{
            sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@54.227.108.80 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html; sudo git clone https://github.com/LucidMedussa/LucyNwuneliFinalExamTic-Tac-Toe /var/www/html"'
            }
        }
    }
 }