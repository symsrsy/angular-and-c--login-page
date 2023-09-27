import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { SharedService } from '../shared.service';
import jwt_decode from 'jwt-decode';
import { User } from '../models/account/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

constructor(private accountService: AccountService,
  private sharedService: SharedService,
  private router: Router){
    
  }

  canActivate(): Observable<boolean>{
  return this.accountService.user$.pipe(
    map((user: User | null) => {
      if (user) {
        const decodedToken: any = jwt_decode(user.jwt);
        if(decodedToken.role.includes('Admin')) {
          return true;
        }
      }
      
      this.sharedService.showNotification(false, 'Admin Area', 'Leave now!');
      this.router.navigateByUrl('/');

      return false;
    })
  )
  }
  
}


