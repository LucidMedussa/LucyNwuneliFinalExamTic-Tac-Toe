pipeline {
    agent { label 'aws' }
    environment {
        TOKENAWS = credentials('controller-ssh-key')
        TEST_RESULT_FILE = 'test_result.txt'
    }
    stages {
        stage('Deploy to Testing') {
            steps {
                sh '''
                    ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@54.242.202.176 << EOF
                        sudo dnf update -y
                        sudo dnf install -y git httpd
                        sudo systemctl start httpd
                        sudo rm -Rf /var/www/html
                        sudo git clone https://github.com/LucidMedussa/LucyNwuneliFinalExamTic-Tac-Toe /var/www/html
                        cd /var/www/html
                        npm install selenium-webdriver
                    EOF
                '''
                script {
                    try {
                        // Run the test and capture the output
                        def output = sh(script: 'node /var/www/html/scripts/testscript.js', returnStdout: true).trim()
                        
                        // Debugging: Print the output
                        echo "Test Output: ${output}"
                        
                        // Write the result to a file
                        if (output.contains('Test Success')) {
                            writeFile file: env.TEST_RESULT_FILE, text: 'true'
                        } else {
                            writeFile file: env.TEST_RESULT_FILE, text: 'false'
                        }
                    } catch (Exception e) {
                        echo "Test failed: ${e.message}"
                        writeFile file: env.TEST_RESULT_FILE, text: 'false'
                    }
                }
            }
        }
        stage('Deploy to Staging') {
            when {
                expression {
                    // Read the test result from the file; if true, continue
                    def testResult = readFile(env.TEST_RESULT_FILE).trim()
                    return testResult == 'true'
                }
            }
            steps {
                sh '''
                    ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@34.230.76.252 << EOF
                        sudo dnf update -y
                        sudo dnf install -y git httpd
                        sudo systemctl start httpd
                        sudo rm -Rf /var/www/html
                        sudo git clone https://github.com/LucidMedussa/LucyNwuneliFinalExamTic-Tac-Toe /var/www/html
                    EOF
                '''
            }
        }
        stage('Deploy to CCTB-ProductionEnv1') {
            steps {
                sh '''
                    ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@35.172.114.208 << EOF
                        sudo dnf update -y
                        sudo dnf install -y git httpd
                        sudo systemctl start httpd
                        sudo rm -Rf /var/www/html
                        sudo git clone https://github.com/LucidMedussa/LucyNwuneliFinalExamTic-Tac-Toe /var/www/html
                    EOF
                '''
            }
        }
        stage('Deploy to CCTB-ProductionEnv2') {
            steps {
                sh '''
                    ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@54.227.108.80 << EOF
                        sudo dnf update -y
                        sudo dnf install -y git httpd
                        sudo systemctl start httpd
                        sudo rm -Rf /var/www/html
                        sudo git clone https://github.com/LucidMedussa/LucyNwuneliFinalExamTic-Tac-Toe /var/www/html
                    EOF
                '''
            }
        }
    }
}
