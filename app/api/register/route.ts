import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import sendMail from "@/lib/sendMail";
import { validEmail } from "@/lib/valid";
import { generateActiveToken } from "@/lib/generateToken";

export async function POST(req: Request) {
  try {
    
    const body = await req.json();
    const { email, name, password } = body;

    if (!name || !email || !password)
      return new Response("Missing Info", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);

    // const user = await db.user.create({
    //   data: {
    //     email,
    //     name,
    //     hashedPassword,
    //     image:
    //       "https://res.cloudinary.com/dzdqy3wfg/image/upload/v1701478265/discord-clone/tkvtbubm0fbiwnz5bqlr.jpg",
    //   },
    // });

    const active_token = generateActiveToken({
      user: {
        email,
        name,
        hashedPassword,
        image:
          "https://res.cloudinary.com/dzdqy3wfg/image/upload/v1701478265/discord-clone/tkvtbubm0fbiwnz5bqlr.jpg",
      },
    });

    const clientUrl = req.headers.get("origin")

    const url = `${clientUrl}/active/${active_token}`;
    const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;
    const txt = "Verify Your Email Address";
    const mailOptions = {
      from: `"SALES-SWIFTLY Email verification" <${SENDER_MAIL}>`,
      to: email,
      subject: "SALES-SWIFTLY",
      html: `<div style="max-width: 700px; margin:auto; border-top: 3px solid #d4dadf;border-bottom: 3px solid #d4dadf; padding: 50px 20px; font-size: 110%;font-family:'Cairo', sans-serif;border-radius:20px;">
            <!--  Font  -->
              <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900;1000&display=swap" rel="stylesheet">
            <!--  Font  -->
              
                          <h2 style="text-align: center; text-transform: uppercase;color: #1C99E8;">Welcome to the SALES-SWIFTLY Website.</h2>
              <p>Congratulations! You're almost set to start using <a href="${process.env.CLIENT_URL}" target="_blank" rel="noopener noreferrer">SALES-SWIFTLY.</a>
                              Just click the button below to activate your email address!
                          </p>
                          
                          <a href=${url} style="background: #CC0605;border-radius:10px; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: block;width: fit-content;margin-left: auto;margin-right: auto;">${txt}</a>
                      
                          <p>If the button doesn't work for any reason, you can also click on the link below:</p>
                      
                          <div>${url}</div>
                          </div>`,
    };

    if (!validEmail(email)) return new Response("Invalid Email!");
   const res = await sendMail(mailOptions);
    console.log("done",res);
    

    return new Response("OK");
  } catch (error) {
    console.log("REGISTRATION_ERROR");
    return new Response("Internal Error", { status: 500 });
  }
}