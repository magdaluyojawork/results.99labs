using results_99lab.Models;
using System.Net;
using Humanizer;
using MimeKit;
using Org.BouncyCastle.Asn1.Pkcs;

using MailKit.Net.Smtp;
using MailKit;
using System.Linq;

namespace results_99lab.Services
{
    public class LabResultViewService:ILabResultViewService
    {
        private readonly Results99LabDBContext _appDBContext;
        private readonly AppSettingModel _appSettingModel;

        public LabResultViewService(Results99LabDBContext appDBContext, AppSettingModel appSettingModel) {
            _appDBContext = appDBContext;
            _appSettingModel = appSettingModel;
        }
        public BatchNoResult GetLabResult(string BatchNo)
        {
            var batchNoResult = _appDBContext.BatchNoResult.Where(x => x.BatchNo== BatchNo).FirstOrDefault();
            return batchNoResult;
        }
        public bool UpdateResultSearched(DtoBatchNoResult result, int BatchNoResultID)
        {
            try {
                ResultSearched resultSearched = new ResultSearched();
                resultSearched.Name = result.Name;
                resultSearched.Email = result.Email;
                resultSearched.BatchNoResultID = BatchNoResultID;
                resultSearched.DateSearched = DateTime.Now;
                _appDBContext.Add(resultSearched);
                _appDBContext.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                string m = ex.Message.ToString();
                return false;
            }
        }
        //public bool SendGiftCodes(string Email, string Name, string GiftCode)
        //{
        //    try
        //    {
        //        var message = new MimeMessage();
        //        message.From.Add(new MailboxAddress(_appSettingModel.Smtp.SenderName, _appSettingModel.Smtp.SenderEmail));
        //        message.To.Add(new MailboxAddress(Name, Email));
        //        message.Subject = "Results99Lab Free Gift";
        //        string emailBody = $"Hi there {Name}, <br><br>";
        //        //emailBody = emailBody + $"Thank you for sharing your feedback with others. Your claim has been approved. To view your gift please click <a href='https://starbucks.cashstar.com/gift-card/view/{GiftCode}' target='_blank'>here</a> or visit: https://starbucks.cashstar.com/gift-card/view/{GiftCode} <br><br>";
        //        emailBody = emailBody + $"Thank you for sharing your feedback with others. Your claim has been approved. To view your gift please click <a href='{GiftCode}' target='_blank'>here</a> or visit: {GiftCode} <br><br>";
        //        emailBody = emailBody + $"Kind regards.";
        //        message.Body = new TextPart("html")
        //        {

        //            Text = emailBody
        //        };

        //        using (var client = new SmtpClient())
        //        {
        //            client.Connect(_appSettingModel.Smtp.Server, _appSettingModel.Smtp.Port, _appSettingModel.Smtp.SSL);

        //            // Note: only needed if the SMTP server requires authentication
        //            client.Authenticate(_appSettingModel.Smtp.Username, _appSettingModel.Smtp.Password);

        //            client.Send(message);
        //            client.Disconnect(true);
        //        }
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        // Exception Details
        //        return false;
        //    }
        //}
    }
}
