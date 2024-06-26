import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private toast: ToastrService) { }

  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        this.router.navigate(['/lists']);
        this.toast.success("Login successful", "Success");
      } else {
        this.toast.error("Login failed", "Error");
      }
    });
  }

}
