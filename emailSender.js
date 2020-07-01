const nodemailer = require('nodemailer');
const readline = require('readline')

const clientEmail = 'nastya20001492@gmail.com';
const serverEmail = 'alexwsdaet@gmail.com';
console.log(`Start send messages to ${clientEmail}`);

async () => {
    try {
        let pass = '';
        
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: serverEmail,
                pass
            }
        })

        const mailOptions = {
            from: serverEmail,
            to: clientEmail,
            subject: 'Sending Email using NodeJS!',
            text: 'Do you like coffee?'
        }

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sended: ', info.response);
            }
        })
    } catch (error) {
        console.log(error);
    }
}





