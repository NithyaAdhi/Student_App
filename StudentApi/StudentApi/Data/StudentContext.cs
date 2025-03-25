using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentApi.Models;



namespace StudentAPI.Data
{
    public class StudentContext(DbContextOptions<StudentContext> options) : IdentityDbContext<AppUser>(options)
    {
        public DbSet<Student> Students { get; set; }
    }
}