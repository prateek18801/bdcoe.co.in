const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: process.env.SENDGRID_API_KEY
    }
})
);

exports.sendContactConformation = (user) => {

    const mail = {
        to: `${user.name} <${user.email}>`,
        from: "Big Data Centre of Excellence <bdcoe@akgec.ac.in>",
        subject: "Greetings from team BDCoE ✨",
        html: `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>no-reply@bdcoe.co.in</title> <style>*{margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;}</style> </head> <body> <div style="display: flex; justify-content: center; align-items: center;"> <div style="max-width: 700px;"> <header> <div style="text-align: center; background-color: #2e2e2e; color: white; padding: 10px; font-family: Arial, Helvetica, sans-serif; font-weight: 600;"> <div style="font-size: 22px; color: #4891f0; margin-right: 5px; font-weight: 700;"> <span><img src="https://drive.google.com/uc?export=view&id=1DNvR6ViejY9Puyd4hIW19ygtu9aCBawI" height="26" width="30" alt=""></span> BIG DATA </div><div style="font-size: 22px;">CENTRE OF EXCELLENCE</div></div></header> <main> <div style="margin: 10px;"> <div> <h2 style="color: black;">Hi ${user.name}👋,</h2> <div style="margin: 7px 0; color: black;"> <p>Thanks for getting in touch! This is an automatic response to let you know that we’ve received your message and are working on the same.</p><p>We'll reach out to you as soon as possible.</p></div><p> <div style="color: black;">Regards,</div><div style="font-weight: 600; color: black;">Team BDCoE</div></p></div><blockquote style="margin: 15px 30px; padding: 10px; border-left: 3px solid #ff9100; background-color: #ffe81691; font-size: 12px; color: black;"> "${user.message}" </blockquote> </div></main> <footer> <section style="text-align: center; background-color: #2e2e2e; color: white; padding: 10px; font-family: Arial, Helvetica, sans-serif;"> <p style="font-size: 14px;"> Big Data Centre of Excellence, 3rd floor, CS-IT block, Ajay Kumar Garg Engineering College, Ghaziabad </p><p style="font-size: 14px; font-family: monospace; color: white; margin-top: 5px;"><strong>Email: </strong> bdcoe@akgec.ac.in</p><table width="100%" cellspacing="0" cellpadding="0"> <tr> <td style="text-align: center;"> <div style="display: block; margin-top: 20px;"> <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;" target="_blank" href="mailto:bdcoe@akgec.ac.in"> <img src="https://drive.google.com/uc?export=view&id=1Fhj8Nl3ApCpAlej4C9vTou9rWmGZ7ibf" height="25" width="25" alt="mail"> </a> <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;" target="_blank" href="http://www.bdcoe.co.in"> <img src="https://drive.google.com/uc?export=view&id=1Zby_O1QOJN5GUl73ayeptYeY5kDD_0v3" height="25" width="25" alt="web"> </a> <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;" target="_blank" href="https://www.linkedin.com/school/big-data-centre-of-excellence/"> <img src="https://drive.google.com/uc?export=view&id=1Nn_7vqmz_DosriWFbTv_1ThTblXEw28r" height="25" width="25" alt="linkedin"> </a> <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;" target="_blank" href="https://www.instagram.com/bdcoe/"> <img src="https://drive.google.com/uc?export=view&id=1K_8oj5vPMCieVXVD3KhtSHSKX75PJSv4" height="25" width="25" alt="insta"> </a> </div></td></tr></table> </section> <div style="text-align: center; background-color: #0061e0; padding: 10px 0;"> <div style="font-weight: 600; color: white;">&copy; Big Data Centre of Excellence | AKGEC</div></div></footer> </div></div></body> </html>`
    }

    transporter.sendMail(mail).catch(err => console.log(err));
}

exports.sendInvite = (user) => {

    const mail = {
        to: `${user.name} <${user.email}>`,
        from: "Big Data Centre of Excellence <bdcoe@akgec.ac.in>",
        subject: "Greetings from team BDCoE ✨",
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>no-reply@bdcoe.co.in</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }
            </style>
        </head>
        
        <body>
            <div style="display: flex; justify-content: center; align-items: center;">
                <div style="max-width: 700px;">
                    <header>
                        <div
                            style="text-align: center; background-color: #2e2e2e; color: white; padding: 10px; font-family: Arial, Helvetica, sans-serif; font-weight: 600;">
                            <div style="font-size: 22px; color: #4891f0; margin-right: 5px; font-weight: 700;">
                                <span><img src="https://drive.google.com/uc?export=view&id=1DNvR6ViejY9Puyd4hIW19ygtu9aCBawI"
                                        height="26" width="30" alt="bdcoe"></span>
                                BIG DATA
                            </div>
                            <div style="font-size: 22px;">CENTRE OF EXCELLENCE</div>
                        </div>
                    </header>
                    <main>
                        <div style="margin: 10px;">
                            <div>
                                <table width="100%" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td style="text-align: center;">
                                            <img src="https://drive.google.com/uc?export=view&id=1TsQ05M98k1kRv5O4SDTY489kATPzwv6O"
                                                alt="Tech Knockdown" style="width: 70%;">
                                        </td>
                                    </tr>
                                </table>
                                &nbsp;
                                <hr>
                                &nbsp;
                                <h2 style="color: black;">Hey Name,</h2>
                                <div style="margin: 7px 0; color: black;">
                                    <p>Congratulations!🎉 We are delighted to have you as a participant in TechKnockDown.</p>
                                    &nbsp;
                                    <div><strong>Day 1: 29th January’22, 11:00 to 13:00 hrs - </strong> App Development using
                                        Flutter</div>
                                    <div><strong>Day 1: 29th January’22, 15:00 to 17:00 hrs - </strong> Web Development using
                                        Django</div>
                                    <div><strong>Day 2: 30th January’22, 11:00 to 12:00 hrs - </strong> Designing through Figma
                                        tools</div>
                                    <div><strong>Day 2: 30th January’22, 13:00 to 15:00 hrs - </strong> Designing through
                                        Photoshop</div>
                                    <div><strong>Day 2: 30th January’22, 16:00 to 17:00 hrs - </strong> Quiz</div>
                                    &nbsp;
                                    <p>The winners of the Quiz will be provided cash prizes worth Rs.3000 and Certificates will
                                        be provided to all the participants attending the workshop.
                                        Note that we have attached a WhatsApp group link to this email and you are supposed to
                                        join this Whatsapp group for any further updates. </p>
                                    <p>See you at the workshop!</p>
                                    &nbsp;
                                    <p><strong>WHATSAPP LINK:</strong> <a href="https://chat.whatsapp.com/CVL3mpzdZzp6jBNETq4tfZ">https://chat.whatsapp.com/CVL3mpzdZzp6jBNETq4tfZ</a></p>
                                </div>
                                <p>
                                <p style="color: black;">In case of query, contact:</p>
                                <div style="color: black;">Akshat Garg - 8193000749</div>
                                <div style="color: black;">Rohit Abhishek - 9116217407</div>
                                <div style="color: black;">Stay Tuned</div>
                                <div style="color: black;">Regards,</div>
                                <div style="font-weight: 600; color: black;">Team BDCoE</div>
                                </p>
                            </div>
                            &nbsp;
                            <hr>
                        </div>
                    </main>
                    <footer>
                        <section
                            style="text-align: center; background-color: #2e2e2e; color: white; padding: 10px; font-family: Arial, Helvetica, sans-serif;">
                            <p style="font-size: 14px;">
                                Big Data Centre of Excellence, 3rd floor, CS-IT block, Ajay Kumar Garg Engineering College,
                                Ghaziabad
                            </p>
                            <p style="font-size: 14px; font-family: monospace; color: white; margin-top: 5px;"><strong>Email:
                                </strong> bdcoe@akgec.ac.in</p>
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <div style="display: block; margin-top: 20px;">
                                            <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;"
                                                target="_blank" href="mailto:bdcoe@akgec.ac.in">
                                                <img src="https://drive.google.com/uc?export=view&id=1Fhj8Nl3ApCpAlej4C9vTou9rWmGZ7ibf"
                                                    height="25" width="25" alt="mail">
                                            </a>
                                            <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;"
                                                target="_blank" href="http://www.bdcoe.co.in">
                                                <img src="https://drive.google.com/uc?export=view&id=1Zby_O1QOJN5GUl73ayeptYeY5kDD_0v3"
                                                    height="25" width="25" alt="web">
                                            </a>
                                            <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;"
                                                target="_blank"
                                                href="https://www.linkedin.com/school/big-data-centre-of-excellence/">
                                                <img src="https://drive.google.com/uc?export=view&id=1Nn_7vqmz_DosriWFbTv_1ThTblXEw28r"
                                                    height="25" width="25" alt="linkedin">
                                            </a>
                                            <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;"
                                                target="_blank" href="https://www.instagram.com/bdcoe/">
                                                <img src="https://drive.google.com/uc?export=view&id=1K_8oj5vPMCieVXVD3KhtSHSKX75PJSv4"
                                                    height="25" width="25" alt="insta">
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </section>
                        <div style="text-align: center; background-color: #0061e0; padding: 10px 0;">
                            <div style="font-weight: 600; color: white;">&copy; Big Data Centre of Excellence | AKGEC</div>
                        </div>
                    </footer>
                </div>
            </div>
        </body>
        
        </html>`
    }

    transporter.sendMail(mail).then(console.log(`${user.name} ${user.email} sent`)).catch(err => console.log(err));
}

exports.sendEventConformation = (user) => {

    const mail = {
        to: `${user.name} <${user.email}>`,
        from: "Big Data Centre of Excellence <bdcoe@akgec.ac.in>",
        subject: "Registration Successful 🎉",
        html: `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>no-reply@bdcoe.co.in</title> <style>*{margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;}</style> </head> <body> <div style="display: flex; justify-content: center; align-items: center;"> <div style="max-width: 700px;"> <header> <div style="text-align: center; background-color: #2e2e2e; color: white; padding: 10px; font-family: Arial, Helvetica, sans-serif; font-weight: 600;"> <div style="font-size: 22px; color: #4891f0; margin-right: 5px; font-weight: 700;"> <span><img src="https://drive.google.com/uc?export=view&id=1DNvR6ViejY9Puyd4hIW19ygtu9aCBawI" height="26" width="30" alt="bdcoe"></span> BIG DATA </div><div style="font-size: 22px;">CENTRE OF EXCELLENCE</div></div></header> <main> <div style="margin: 10px;"> <div> <h2 style="color: black">Hi ${user.name}👋,</h2> <div style="margin: 7px 0; color: black;"> <p>You have successfully registered for the event <strong>Tech Knockdown</strong>.</p>&nbsp; <div><strong>Date:</strong> 29 & 30 January</div><div><strong>Time:</strong> 11:00am - 1:00pm</div><div><strong>Venue:</strong> Google Meet</div><p style="color: black">Keep checking your mailbox for further details.</p></div><p> <div style="color: black">Regards,</div><div style="font-weight: 600; color:"black";">Team BDCoE</div></p></div>&nbsp; <hr> &nbsp; <table width="100%" cellspacing="0" cellpadding="0"> <tr> <td style="text-align: center;"> <img src="https://drive.google.com/uc?export=view&id=1pIcdQFpCts-lyypJHZOSGzD805jtp5kg" alt="Tech Knockdown" style="width: 80%;"> </td></tr></table> </div></main> <footer> <section style="text-align: center; background-color: #2e2e2e; color: white; padding: 10px; font-family: Arial, Helvetica, sans-serif;"> <p style="font-size: 14px;"> Big Data Centre of Excellence, 3rd floor, CS-IT block, Ajay Kumar Garg Engineering College, Ghaziabad </p><p style="font-size: 14px; font-family: monospace; color: white; margin-top: 5px;"><strong>Email: </strong> bdcoe@akgec.ac.in</p><table width="100%" cellspacing="0" cellpadding="0"> <tr> <td style="text-align: center;"> <div style="display: block; margin-top: 20px;"> <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;" target="_blank" href="mailto:bdcoe@akgec.ac.in"> <img src="https://drive.google.com/uc?export=view&id=1Fhj8Nl3ApCpAlej4C9vTou9rWmGZ7ibf" height="25" width="25" alt="mail"> </a> <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;" target="_blank" href="http://www.bdcoe.co.in"> <img src="https://drive.google.com/uc?export=view&id=1Zby_O1QOJN5GUl73ayeptYeY5kDD_0v3" height="25" width="25" alt="web"> </a> <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;" target="_blank" href="https://www.linkedin.com/school/big-data-centre-of-excellence/"> <img src="https://drive.google.com/uc?export=view&id=1Nn_7vqmz_DosriWFbTv_1ThTblXEw28r" height="25" width="25" alt="linkedin"> </a> <a style="text-decoration: none; margin: 10px 10px 0 10px; font-size: 22px;" target="_blank" href="https://www.instagram.com/bdcoe/"> <img src="https://drive.google.com/uc?export=view&id=1K_8oj5vPMCieVXVD3KhtSHSKX75PJSv4" height="25" width="25" alt="insta"> </a> </div></td></tr></table> </section> <div style="text-align: center; background-color: #0061e0; padding: 10px 0;"> <div style="font-weight: 600; color: white;">&copy; Big Data Centre of Excellence | AKGEC</div></div></footer> </div></div></body> </html>`
    }

    transporter.sendMail(mail).catch(err => console.log(err));
}