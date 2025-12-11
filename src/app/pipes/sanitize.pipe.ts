import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl, SafeStyle, SafeScript } from "@angular/platform-browser";

@Pipe({
  name: "sanitizer",
  standalone: true,
})
export class SanitizerPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | unknown, type: string): string | SafeHtml | SafeUrl | SafeResourceUrl | SafeStyle | SafeScript {
    if (!value) return "";

    const randomValue = new Date().getMilliseconds();

    switch (type) {
      case "image":
        return `${value}?timer=${randomValue}`;
      case "html":
        return this.sanitizer.bypassSecurityTrustHtml(value as string) || "";
      case "url":
        return this.sanitizer.bypassSecurityTrustUrl(value as string) || "";
      case "resourceUrl":
        return this.sanitizer.bypassSecurityTrustResourceUrl(value as string) || "";
      case "style":
        return this.sanitizer.bypassSecurityTrustStyle(value as string) || "";
      case "script":
        return this.sanitizer.bypassSecurityTrustScript(value as string) || "";
      default:
        return value as string;
    }
  }
}
