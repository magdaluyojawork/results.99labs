using results_99lab.Models;

namespace results_99lab.Services
{
    public interface ILabResultViewService
    {
        public BatchNoResult GetLabResult(string BatchNo);
        public bool UpdateResultSearched(DtoBatchNoResult result, int BatchNoResultID);
        //public bool SendGiftCodes(string Email, string Name, string GiftCode);
        //public void UpdateClaimedGifts(string OrderNo, string GiftCode);
    }
}
