using Microsoft.EntityFrameworkCore;
using StudentApi.Models;



namespace StudentAPI.Data
{
    public class StudentContext(DbContextOptions<StudentContext> options) : DbContext(options)
    {
        public DbSet<Student> Students { get; set; }
    }
}