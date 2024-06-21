 pipeline{
agent { label 'aws'}
environment{
TOKENAWS = credentials('controller-ssh-key')
}

    stages{
        stage('Deploy to Testing'){
            steps{
            sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@54.242.202.176 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html; sudo git clone https://github.com/LucidMedussa/LucyNwuneliFinalExamTic-Tac-Toe /var/www/html"'
            }
        }

         stage('Deploy to Staging'){
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