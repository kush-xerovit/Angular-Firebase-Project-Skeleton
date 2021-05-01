import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class VimeoService {
  vimeoObsShare: Observable<string>
  vimeoResult: string

  private vimeoLink = new BehaviorSubject('')
  vimeoLinkObs = this.vimeoLink.asObservable()

  constructor(private http: HttpClient) {}

  create(options, fileSize): Observable<any> {
    console.log(options, fileSize)

    // CUSTOM HEADERS FOR A FIRST INIT CALL
    const initHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + options.token,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.vimeo.*+json;version=3.4',
    })
    // initHeaders.append('Content-Type', 'application/json');
    // initHeaders.append('Accept', 'application/vnd.vimeo.*+json;version=3.4');
    // CUSTOM INIT BODY
    const initBody = {
      upload: {
        approach: 'post',
        size: fileSize,
      },
      privacy: {
        embed: 'private', // public for public video
      },
      name: options.videoName,
      description: options.videoDescription,
    }
    if (this.vimeoResult) {
      return new Observable<any>((observer) => {
        observer.next(this.vimeoResult)
        observer.complete()
      })
    } else if (this.vimeoObsShare) {
      return this.vimeoObsShare
    } else {
      return this.http.post(options.url, initBody, { headers: initHeaders })
    }
  }

  upload(url, file: File): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Tus-Resumable': '1.0.0',
      'Upload-Offset': '0',
      'Content-Type': 'application/offset+octet-stream',
    })
    const params = new HttpParams()
    const options = {
      params,
      reportProgress: true,
      headers,
    }
    const req = new HttpRequest('PUT', url, file, options)
    return this.http.request(req)
  }
}
