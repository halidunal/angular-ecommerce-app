import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { Observable, map, tap } from "rxjs";
import { AuthorizationService } from "../services/authorization.service";

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate{
    constructor(private authenticationService: AuthenticationService, private authorizationService: AuthorizationService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authenticationService.user.pipe(
            map(user => {
                return !!user;
            }),
            tap(isAdmin => {
                if(!isAdmin) this.router.navigate(["/unauthorized"])
            })
        )
    }
}