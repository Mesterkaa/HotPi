import { logger } from "../config/logger";
import { createTransport, getTestMessageUrl } from "nodemailer"
import { Setting } from "../models/setting";
import { SETTING } from "../lib/settings";
import { MAIL_USER, MAIL_PASS, MAIL_HOST, ON_EDUROAM } from "../config/secrets";

export class MailService {
  static async sendAlarmMail(message: string) {
    Setting.findOne({name: SETTING.ALARM_EMAIL}).then(async to => {
      
      if (to && to.value != "") {
        if (ON_EDUROAM == "FALSE") {
          let transporter = createTransport({
            host: MAIL_HOST,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: MAIL_USER, // generated ethereal user
              pass: MAIL_PASS, // generated ethereal password
            },
          });
          
          
          let info = await transporter.sendMail({
            from: MAIL_USER,
            to: to.value,
            subject: "En værdi er udenfor acceptabelt rækkevidde",
            text: message
          })
          const TestUrl = getTestMessageUrl(info);
          logger.info(`Sent mail to: ${TestUrl ? TestUrl : info.envelope.to}`);
        } else {
          logger.warn(`Mails should have been sent to: ${to.value}, with message: ${message}`)
        }
        
      } else {
        logger.warn("No warning mail sent, because no recipent set in setings")
      }
    })
    
  }
}