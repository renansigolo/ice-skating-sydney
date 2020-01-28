import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ice-skating";
  imgPath: any = "";

  macquarieImgs = [
    "https://images.squarespace-cdn.com/content/v1/56282670e4b0177c9d35a3be/1577780022568-7DQ2G11HQZGJC7HEDWOB/ke17ZwdGBToddI8pDm48kCnaQsUSq_1BSYtcHbFTwm9Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIzXGXx0J8uhpH8YD0RKhtP99ZB_qBBNnXH4ipmhU27pY/school+term+session+times+2020.png",
    "https://images.squarespace-cdn.com/content/v1/56282670e4b0177c9d35a3be/1577780478570-65SE4ZYDBAWMEHW7IJ1N/ke17ZwdGBToddI8pDm48kFknNDlSSwdT2twHSkdUrOgUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcnlZnyIlJ5t513Rp9Q3m4FiG8HD8Fa8Zeu2DRoLOigYfUWC1OGWPGSJrkXzImDaDU/school+holiday+session+times+2020.png"
  ];

  constructor(private http: HttpClient, public domSanitizer: DomSanitizer) {}

  ngOnInit() {
    console.log("Hello");
    const url =
      "http://localhost:5000/ice-skating-schedule/us-central1/scrapeIce";
    this.http.post(url, {}).subscribe((res: any) => {
      console.log("TCL: AppComponent -> ngOnInit -> res", res);
      this.convertImage(res);
    });
  }

  private convertImage(res: any) {
    let TYPED_ARRAY = new Uint8Array(res.data);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, "");
    let base64String = btoa(STRING_CHAR);
    this.imgPath = this.domSanitizer.bypassSecurityTrustUrl(
      `data:image/jpg;base64,${base64String}`
    );
  }
}
