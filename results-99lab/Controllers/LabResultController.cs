using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using results_99lab.Models;
using results_99lab.Services;

namespace results_99lab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabResultController : ControllerBase
    {
        private readonly ILabResultViewService _labResultViewService;
        public LabResultController(ILabResultViewService labResultViewService)
        {
            _labResultViewService = labResultViewService;
        }
        [HttpPost]
        public DtoBatchNoResult Post(DtoBatchNoResult send)
        {
            var result = _labResultViewService.GetLabResult(send.BatchNo);
            if (result!= null)
            {
                send.LabResultFilename = result.LabResultFilename;
                bool isSuccess = _labResultViewService.UpdateResultSearched(send,result.BatchNoResultID);
                send.IsSuccess= isSuccess;
            }
            else
            {
                send.IsSuccess = false;
            }
            return send;
        }
    }
}
