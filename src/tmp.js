const res = `Sure, here is an example of a login form using HTML styled similar to Discord and designed to be mobile-friendly:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
        <title>Login Form</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
                body {
                        background-color: #36393f;
                        font-family: Arial, sans-serif;
                        color: #fff;
                }

                .container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-top: 50px;
                }

                .logo {
                        margin-bottom: 30px;
                        width: 100px;
                        height: 100px;
                        background-image: url("https://i.imgur.com/3qpwfAy.png");
                        background-repeat: no-repeat;
                        background-size: contain;
                }

                form {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 80%;
                        max-width: 400px;
                        background-color: #40444b;
                        border-radius: 5px;
                        padding: 30px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                }

                input[type="text"],
                input[type="password"] {
                        width: 100%;
                        padding: 10px;
                        border: none;
                        background-color: #484d54;
                        border-radius: 3px;
                        margin-bottom: 20px;
                        color: #fff;
                        font-size: 16px;
                }

                input[type="submit"] {
                        width: 100%;
                        padding: 10px;
                        border: none;
                        background-color: #7289da;
                        border-radius: 3px;
                        color: #fff;
                        font-size: 16px;
                        cursor: pointer;
                }

                input[type="submit"]:hover {
                        background-color: #677bc4;
                }

                p {
                        margin-top: 20px;
                        font-size: 14px;
                        color: #b9bbbe;
                        text-align: center;
                }

                a {
                        color: #fff;
                        font-weight: bold;
                        text-decoration: none;
                }
        </style>
</head>
<body>
        <div class="container">
                <div class="logo"></div>
                <form action="#">
                        <input type="text" placeholder="Email or Phone Number">
                        <input type="password" placeholder="Password">
                        <input type="submit" value="Login">
                </form>
                <p>Forgot your password? <a href="#">Reset it here</a>.</p>
        </div>
</body>
</html>
\`\`\`

This form includes a container with a logo, a form with inputs for an email or phone number and a password, and a submit button. It is styled using CSS with a mobile-first approach and has a similar color scheme to Discord. The form is also designed to be responsive and work well on mobile devices.`;

export { res };
