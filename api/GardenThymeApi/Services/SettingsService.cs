using System.Threading.Tasks;

namespace GardenThymeApi.Services
{
    public class SettingsService
    {
        private readonly IQueryService _queryService;

        public SettingsService(IQueryService queryService)
        {
            _queryService = queryService;
        }

        public async Task A()
        {
            await _queryService.Get<object>(TableNames.Settings, new
            {
                // _context.CurrentUser.InstitutionId,
                // _context.CurrentUser.Token,
                // CreatorId = _context.CurrentUser.AccountId
            });
        }
    }
}