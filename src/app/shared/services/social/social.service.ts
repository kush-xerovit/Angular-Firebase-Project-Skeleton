import { Injectable } from '@angular/core'
import { SocialAuthService } from 'angularx-social-login'
import { FacebookLoginProvider } from 'angularx-social-login'

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  constructor(private auth: SocialAuthService) {}

  connectFacebook() {
    this.auth
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
