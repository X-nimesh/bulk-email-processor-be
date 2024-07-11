export const MAIL_TEMPLATE = [
  {
    mailTemplateTitle: 'Welcome to our platform',
    mailTemplateSubject: 'Welcome to our platform',
    mailTemplateBody: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome Email</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .email-header, .email-footer {
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }
                .email-footer {
                    border-radius: 0 0 10px 10px;
                    margin-top: 20px;
                }
                .email-content {
                    padding: 20px;
                }
                .email-content p {
                    margin: 10px 0;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h2>Welcome to Our Platform!</h2>
                </div>
                <div class="email-content">
                    <p>Dear [name],</p>
                    <p>Welcome to our platform. We are excited to have you on board.</p>
                    <p>Best regards,</p>
                    <p>Team</p>
                </div>
                <div class="email-footer">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`,
  },
  {
    mailTemplateTitle: 'Promotion',
    mailTemplateSubject: 'Promotion',
    mailTemplateBody: `<p>Dear [name],</p>
        <p>We are excited to announce that we are running a promotion.</p>
        <p>Best regards,</p>
        <p>Team</p>
        `,
  },
  {
    mailTemplateTitle: 'Checkout my github profile',
    mailTemplateSubject: 'Checkout my github profile',
    mailTemplateBody: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .email-header, .email-footer {
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }
                .email-footer {
                    border-radius: 0 0 10px 10px;
                    margin-top: 20px;
                }
                .email-content {
                    padding: 20px;
                }
                .email-content p {
                    margin: 10px 0;
                }
                .email-content a {
                    color: #007bff;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h2>Welcome to Our Community!</h2>
                </div>
                <div class="email-content">
                    <p>Dear [name],</p>
                    <p>Check out my GitHub profile: <a href="https://www.github.com/x-nimesh" target="_blank">www.github.com/x-nimesh</a></p>
                    <p>Best regards,</p>
                    <p>Team</p>
                </div>
                <div class="email-footer">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`,
  },
];
