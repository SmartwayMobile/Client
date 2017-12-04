import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";

@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public input: any;

    public constructor(private router: RouterExtensions) {
        this.input = {
            email: "",
            password: ""
        }
    }

    public ngOnInit() {
        // I don't think I like this. This should probably use a "non-auth" guard instead???

        // if(ApplicationSettings.getBoolean("authenticated", false)) {
        //     this.router.navigate(["/secure"], { clearHistory: true });
        // }
    }

    public login() {
        if (this.input.email && this.input.password) {
            let account = JSON.parse(ApplicationSettings.getString("account", "{}"));
            if (this.input.email == account.email && this.input.password == account.password) {
                ApplicationSettings.setBoolean("authenticated", true);
                this.router.navigate(["/secure"], { clearHistory: true });
            } else {
                // (new SnackBar()).simple("Incorrect Credentials!");
            }
        } else {
            // (new SnackBar()).simple("All Fields Required!");
        }
    }

}