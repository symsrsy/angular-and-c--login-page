using deepworkapi.Data;
using deepworkapi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace deepworkapi.Services
{
    public class ContextSeedService
    {
        private readonly Context _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public ContextSeedService(Context context,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager) 
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public async Task InitializeContextAsync()
        {
            if(_context.Database.GetPendingMigrationsAsync().GetAwaiter().GetResult().Count() > 0) {
                //applies any peding migration into our database
                await _context.Database.MigrateAsync();
            }
            if (! _roleManager.Roles.Any())
            {
                await _roleManager.CreateAsync(new IdentityRole { Name = SD.AdminRole });
                await _roleManager.CreateAsync(new IdentityRole { Name = SD.ManagerRole });
                await _roleManager.CreateAsync(new IdentityRole { Name = SD.PersonnelRole });
            }
            if(! _userManager.Users.AnyAsync().GetAwaiter().GetResult())
            {
                var admin = new User
                {
                    FirstName = "admin",
                    LastName = "work",
                    UserName = SD.AdminUserName,
                    Email = SD.AdminUserName,
                    EmailConfirmed = true
                };
                await _userManager.CreateAsync(admin, "123456");
                await _userManager.AddToRoleAsync(admin, SD.AdminRole);
                await _userManager.AddClaimsAsync(admin, new Claim[]
                {
                  new Claim(ClaimTypes.Email, admin.Email),
                  new Claim(ClaimTypes.Surname, admin.LastName)
                });

                var manager = new User
                {
                    FirstName = "manager",
                    LastName = "work",
                    UserName = "manager@example.com",
                    Email = "manager@example.com",
                    EmailConfirmed = true
                };
                await _userManager.CreateAsync(manager, "123456");
                await _userManager.AddToRoleAsync(manager, SD.ManagerRole);
                await _userManager.AddClaimsAsync(manager, new Claim[]
                {
                  new Claim(ClaimTypes.Email, manager.Email),
                  new Claim(ClaimTypes.Surname, manager.LastName)
                });

                var personnel = new User
                {
                    FirstName = "personnel",
                    LastName = "work",
                    UserName = "personnel@example.com",
                    Email = "personnel@example.com",
                    EmailConfirmed = true
                };
                await _userManager.CreateAsync(personnel, "123456");
                await _userManager.AddToRoleAsync(personnel, SD.PersonnelRole);
                await _userManager.AddClaimsAsync(personnel, new Claim[]
                {
                  new Claim(ClaimTypes.Email, personnel.Email),
                  new Claim(ClaimTypes.Surname, personnel.LastName)
                });

                var vippersonnel = new User
                {
                    FirstName = "vippersonnel",
                    LastName = "vipwork",
                    UserName = "vippersonnel@example.com",
                    Email = "vippersonnel@example.com",
                    EmailConfirmed = true
                };
                await _userManager.CreateAsync(vippersonnel, "123456");
                await _userManager.AddToRoleAsync(vippersonnel, SD.PersonnelRole);
                await _userManager.AddClaimsAsync(vippersonnel, new Claim[]
                {
                  new Claim(ClaimTypes.Email, vippersonnel.Email),
                  new Claim(ClaimTypes.Surname, vippersonnel.LastName)
                });

            }
        }
      
    }
}
