using DZ_ASP_JWT_18_11.Models;
using Microsoft.EntityFrameworkCore;

namespace DZ_ASP_JWT_18_11.Data
{
    public class DbContextClass : DbContext
    {
        protected readonly IConfiguration Configuration;
        public DbContextClass(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Knife> Knifes { get; set; }
    }
}
