import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import jwt_decode from 'jwt-decode';


@Directive({
  selector: '[appUserHasRole]'
})
export class UserHasRoleDirective implements OnInit {
  @Input() appUserHasRole: string[] = [];
  

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService) { }


  ngOnInit(): void {

// this.viewContainerRef.createEmbeddedView(this.templateRef);
// this.viewContainerRef.clear();

    this.accountService.user$.pipe((take(1))).subscribe({
      next: user => {
        if (user) {
          const decodedToken: any = jwt_decode(user.jwt);

          console.log(this.appUserHasRole)

          if(decodedToken.rolesome((role:any) => this.appUserHasRole.includes(role))){
            this.viewContainerRef.createEmbeddedView(this.templateRef);

          }else {
            this.viewContainerRef.clear();
          }
        }else{
          this.viewContainerRef.clear();
        }
      }
    })
  }

}


