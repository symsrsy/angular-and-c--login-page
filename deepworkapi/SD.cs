using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace deepworkapi
{
    public class SD
    {

        //Roles
        public const string AdminRole = "Admin";
        public const string ManagerRole = "Manager";
        public const string PersonnelRole = "Personnel";

        public const string AdminUserName = "admin@example.com";
        public const string SuperAdminChangeNotAllowed = "Super Admin change is not allowed";
        public const int MaximumLoginAttempts = 3;


        public static bool VIPPolicy(AuthorizationHandlerContext context)
        {
            if(context.User.IsInRole(PersonnelRole) && context.User.HasClaim(c => c.Type == ClaimTypes.Email && c.Value.Contains("vip")))
            {
                return true;
            }
            return false;
        }
    }
}
