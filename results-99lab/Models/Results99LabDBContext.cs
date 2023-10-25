using results_99lab.Models;
using Microsoft.EntityFrameworkCore;

namespace results_99lab.Models
{
    public class Results99LabDBContext : DbContext
    {
        public Results99LabDBContext(DbContextOptions<Results99LabDBContext> options)
            : base(options)
        {
        }
        public DbSet<BatchNoResult> BatchNoResult { get; set; }
        public DbSet<ResultSearched> ResultSearched { get; set; }
    }
}
