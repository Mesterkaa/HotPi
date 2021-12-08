import { logger } from "../config/logger";
import { createTestAccount, createTransport, getTestMessageUrl } from "nodemailer"
import { Setting } from "../models/setting";
import { SETTING } from "../lib/settings";

export class MailService {
    static async sendAlarmMail(message: string) {
        Setting.findOne({name: SETTING.ALARM_EMAIL}).then(async to => {
          if (to && to.value != "") {
            let testAccount = await createTestAccount();
      
            let transporter = createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
              },
            });
            
            
            let info = await transporter.sendMail({
              from: '"HotPi" <alarm@hotpi.info',
              to: to.value,
              subject: "En værdi er udenfor acceptabelt rækkevidde",
              text: message
            })
            logger.info("Sent mail to: " + getTestMessageUrl(info))
          } else {
            logger.warn("No warning mail sent, because no recipent set in setings")
          }
        })
      
      }
}