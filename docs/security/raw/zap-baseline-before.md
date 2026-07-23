# ZAP Scanning Report

ZAP by [Checkmarx](https://checkmarx.com/).


## Summary of Alerts

| Risk Level | Number of Alerts |
| --- | --- |
| High | 0 |
| Medium | 2 |
| Low | 7 |
| Informational | 6 |




## Insights

| Level | Reason | Site | Description | Statistic |
| --- | --- | --- | --- | --- |
| Low | Warning |  | ZAP warnings logged - see the zap.log file for details | 1    |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of responses with status code 2xx | 30 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of responses with status code 3xx | 1 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of responses with status code 4xx | 68 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of endpoints with content type application/javascript | 12 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of endpoints with content type application/xml | 1 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of endpoints with content type font/woff2 | 1 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of endpoints with content type image/png | 2 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of endpoints with content type image/x-icon | 1 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of endpoints with content type text/css | 1 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of endpoints with content type text/html | 80 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of endpoints with content type text/plain | 1 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of endpoints with method GET | 100 % |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Count of total endpoints | 140    |
| Info | Informational | https://agrofort.64.181.178.125.nip.io | Percentage of slow responses | 9 % |







## Alerts

| Name | Risk Level | Number of Instances |
| --- | --- | --- |
| CSP: script-src unsafe-inline | Medium | 5 |
| CSP: style-src unsafe-inline | Medium | 5 |
| Cross-Origin-Embedder-Policy Header Missing or Invalid | Low | 3 |
| Cross-Origin-Opener-Policy Header Missing or Invalid | Low | 3 |
| Cross-Origin-Resource-Policy Header Missing or Invalid | Low | 4 |
| Permissions Policy Header Not Set | Low | Systemic |
| Server Leaks Version Information via "Server" HTTP Response Header Field | Low | Systemic |
| Strict-Transport-Security Header Not Set | Low | Systemic |
| X-Content-Type-Options Header Missing | Low | Systemic |
| Content-Type Header Missing | Informational | 1 |
| Non-Storable Content | Informational | 1 |
| Re-examine Cache-control Directives | Informational | Systemic |
| Storable and Cacheable Content | Informational | Systemic |
| Storable but Non-Cacheable Content | Informational | 2 |
| User Controllable HTML Element Attribute (Potential XSS) | Informational | 1 |




## Alert Detail



### [ CSP: script-src unsafe-inline ](https://www.zaproxy.org/docs/alerts/10055/)



##### Medium (High)

### Description

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks. Including (but not limited to) Cross Site Scripting (XSS), and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.

* URL: https://agrofort.64.181.178.125.nip.io
  * Node Name: `https://agrofort.64.181.178.125.nip.io`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`
  * Other Info: `script-src includes unsafe-inline.`
* URL: https://agrofort.64.181.178.125.nip.io/
  * Node Name: `https://agrofort.64.181.178.125.nip.io/`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`
  * Other Info: `script-src includes unsafe-inline.`
* URL: https://agrofort.64.181.178.125.nip.io/catalogo
  * Node Name: `https://agrofort.64.181.178.125.nip.io/catalogo`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`
  * Other Info: `script-src includes unsafe-inline.`
* URL: https://agrofort.64.181.178.125.nip.io/contato
  * Node Name: `https://agrofort.64.181.178.125.nip.io/contato`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`
  * Other Info: `script-src includes unsafe-inline.`
* URL: https://agrofort.64.181.178.125.nip.io/premiacoes
  * Node Name: `https://agrofort.64.181.178.125.nip.io/premiacoes`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`
  * Other Info: `script-src includes unsafe-inline.`


Instances: 5

### Solution

Ensure that your web server, application server, load balancer, etc. is properly configured to set the Content-Security-Policy header.

### Reference


* [ https://www.w3.org/TR/CSP/ ](https://www.w3.org/TR/CSP/)
* [ https://caniuse.com/#search=content+security+policy ](https://caniuse.com/#search=content+security+policy)
* [ https://content-security-policy.com/ ](https://content-security-policy.com/)
* [ https://github.com/HtmlUnit/htmlunit-csp ](https://github.com/HtmlUnit/htmlunit-csp)
* [ https://web.dev/articles/csp#resource-options ](https://web.dev/articles/csp#resource-options)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 15

#### Source ID: 3

### [ CSP: style-src unsafe-inline ](https://www.zaproxy.org/docs/alerts/10055/)



##### Medium (High)

### Description

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks. Including (but not limited to) Cross Site Scripting (XSS), and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.

* URL: https://agrofort.64.181.178.125.nip.io
  * Node Name: `https://agrofort.64.181.178.125.nip.io`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`
  * Other Info: `style-src includes unsafe-inline.`
* URL: https://agrofort.64.181.178.125.nip.io/
  * Node Name: `https://agrofort.64.181.178.125.nip.io/`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`
  * Other Info: `style-src includes unsafe-inline.`
* URL: https://agrofort.64.181.178.125.nip.io/catalogo
  * Node Name: `https://agrofort.64.181.178.125.nip.io/catalogo`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`
  * Other Info: `style-src includes unsafe-inline.`
* URL: https://agrofort.64.181.178.125.nip.io/contato
  * Node Name: `https://agrofort.64.181.178.125.nip.io/contato`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`
  * Other Info: `style-src includes unsafe-inline.`
* URL: https://agrofort.64.181.178.125.nip.io/premiacoes
  * Node Name: `https://agrofort.64.181.178.125.nip.io/premiacoes`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`
  * Other Info: `style-src includes unsafe-inline.`


Instances: 5

### Solution

Ensure that your web server, application server, load balancer, etc. is properly configured to set the Content-Security-Policy header.

### Reference


* [ https://www.w3.org/TR/CSP/ ](https://www.w3.org/TR/CSP/)
* [ https://caniuse.com/#search=content+security+policy ](https://caniuse.com/#search=content+security+policy)
* [ https://content-security-policy.com/ ](https://content-security-policy.com/)
* [ https://github.com/HtmlUnit/htmlunit-csp ](https://github.com/HtmlUnit/htmlunit-csp)
* [ https://web.dev/articles/csp#resource-options ](https://web.dev/articles/csp#resource-options)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 15

#### Source ID: 3

### [ Cross-Origin-Embedder-Policy Header Missing or Invalid ](https://www.zaproxy.org/docs/alerts/90004/)



##### Low (Medium)

### Description

Cross-Origin-Embedder-Policy header is a response header that prevents a document from loading any cross-origin resources that don't explicitly grant the document permission (using CORP or CORS).

* URL: https://agrofort.64.181.178.125.nip.io
  * Node Name: `https://agrofort.64.181.178.125.nip.io`
  * Method: `GET`
  * Parameter: `Cross-Origin-Embedder-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/
  * Node Name: `https://agrofort.64.181.178.125.nip.io/`
  * Method: `GET`
  * Parameter: `Cross-Origin-Embedder-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/sitemap.xml
  * Node Name: `https://agrofort.64.181.178.125.nip.io/sitemap.xml`
  * Method: `GET`
  * Parameter: `Cross-Origin-Embedder-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``


Instances: 3

### Solution

Ensure that the application/web server sets the Cross-Origin-Embedder-Policy header appropriately, and that it sets the Cross-Origin-Embedder-Policy header to 'require-corp' for documents.
If possible, ensure that the end user uses a standards-compliant and modern web browser that supports the Cross-Origin-Embedder-Policy header (https://caniuse.com/mdn-http_headers_cross-origin-embedder-policy).

### Reference


* [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 14

#### Source ID: 3

### [ Cross-Origin-Opener-Policy Header Missing or Invalid ](https://www.zaproxy.org/docs/alerts/90004/)



##### Low (Medium)

### Description

Cross-Origin-Opener-Policy header is a response header that allows a site to control if others included documents share the same browsing context. Sharing the same browsing context with untrusted documents might lead to data leak.

* URL: https://agrofort.64.181.178.125.nip.io
  * Node Name: `https://agrofort.64.181.178.125.nip.io`
  * Method: `GET`
  * Parameter: `Cross-Origin-Opener-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/
  * Node Name: `https://agrofort.64.181.178.125.nip.io/`
  * Method: `GET`
  * Parameter: `Cross-Origin-Opener-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/sitemap.xml
  * Node Name: `https://agrofort.64.181.178.125.nip.io/sitemap.xml`
  * Method: `GET`
  * Parameter: `Cross-Origin-Opener-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``


Instances: 3

### Solution

Ensure that the application/web server sets the Cross-Origin-Opener-Policy header appropriately, and that it sets the Cross-Origin-Opener-Policy header to 'same-origin' for documents.
'same-origin-allow-popups' is considered as less secured and should be avoided.
If possible, ensure that the end user uses a standards-compliant and modern web browser that supports the Cross-Origin-Opener-Policy header (https://caniuse.com/mdn-http_headers_cross-origin-opener-policy).

### Reference


* [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 14

#### Source ID: 3

### [ Cross-Origin-Resource-Policy Header Missing or Invalid ](https://www.zaproxy.org/docs/alerts/90004/)



##### Low (Medium)

### Description

Cross-Origin-Resource-Policy header is an opt-in header designed to counter side-channels attacks like Spectre. Resource should be specifically set as shareable amongst different origins.

* URL: https://agrofort.64.181.178.125.nip.io
  * Node Name: `https://agrofort.64.181.178.125.nip.io`
  * Method: `GET`
  * Parameter: `Cross-Origin-Resource-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/
  * Node Name: `https://agrofort.64.181.178.125.nip.io/`
  * Method: `GET`
  * Parameter: `Cross-Origin-Resource-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/robots.txt
  * Node Name: `https://agrofort.64.181.178.125.nip.io/robots.txt`
  * Method: `GET`
  * Parameter: `Cross-Origin-Resource-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/sitemap.xml
  * Node Name: `https://agrofort.64.181.178.125.nip.io/sitemap.xml`
  * Method: `GET`
  * Parameter: `Cross-Origin-Resource-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``


Instances: 4

### Solution

Ensure that the application/web server sets the Cross-Origin-Resource-Policy header appropriately, and that it sets the Cross-Origin-Resource-Policy header to 'same-origin' for all web pages.
'same-site' is considered as less secured and should be avoided.
If resources must be shared, set the header to 'cross-origin'.
If possible, ensure that the end user uses a standards-compliant and modern web browser that supports the Cross-Origin-Resource-Policy header (https://caniuse.com/mdn-http_headers_cross-origin-resource-policy).

### Reference


* [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 14

#### Source ID: 3

### [ Permissions Policy Header Not Set ](https://www.zaproxy.org/docs/alerts/10063/)



##### Low (Medium)

### Description

Permissions Policy Header is an added layer of security that helps to restrict from unauthorized access or usage of browser/client features by web resources. This policy ensures the user privacy by limiting or specifying the features of the browsers can be used by the web resources. Permissions Policy provides a set of standard HTTP headers that allow website owners to limit which features of browsers can be used by the page such as camera, microphone, location, full screen etc.

* URL: https://agrofort.64.181.178.125.nip.io/_next/static/chunks/14podnilsu8gn.js
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/chunks/14podnilsu8gn.js`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/chunks/1rsn1dago3cd5.js
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/chunks/1rsn1dago3cd5.js`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/chunks/27f16r8f_43as.js
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/chunks/27f16r8f_43as.js`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/chunks/41fxceb65js0k.js
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/chunks/41fxceb65js0k.js`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/chunks/turbopack-2_bbiemji23pk.js
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/chunks/turbopack-2_bbiemji23pk.js`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``

Instances: Systemic


### Solution

Ensure that your web server, application server, load balancer, etc. is configured to set the Permissions-Policy header.

### Reference


* [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy)
* [ https://developer.chrome.com/blog/feature-policy/ ](https://developer.chrome.com/blog/feature-policy/)
* [ https://scotthelme.co.uk/a-new-security-header-feature-policy/ ](https://scotthelme.co.uk/a-new-security-header-feature-policy/)
* [ https://w3c.github.io/webappsec-feature-policy/ ](https://w3c.github.io/webappsec-feature-policy/)
* [ https://www.smashingmagazine.com/2018/12/feature-policy/ ](https://www.smashingmagazine.com/2018/12/feature-policy/)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 15

#### Source ID: 3

### [ Server Leaks Version Information via "Server" HTTP Response Header Field ](https://www.zaproxy.org/docs/alerts/10036/)



##### Low (High)

### Description

The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.

* URL: https://agrofort.64.181.178.125.nip.io
  * Node Name: `https://agrofort.64.181.178.125.nip.io`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `nginx/1.20.1`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/
  * Node Name: `https://agrofort.64.181.178.125.nip.io/`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `nginx/1.20.1`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/api/
  * Node Name: `https://agrofort.64.181.178.125.nip.io/api/`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `nginx/1.20.1`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/robots.txt
  * Node Name: `https://agrofort.64.181.178.125.nip.io/robots.txt`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `nginx/1.20.1`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/sitemap.xml
  * Node Name: `https://agrofort.64.181.178.125.nip.io/sitemap.xml`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `nginx/1.20.1`
  * Other Info: ``

Instances: Systemic


### Solution

Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.

### Reference


* [ https://httpd.apache.org/docs/current/mod/core.html#servertokens ](https://httpd.apache.org/docs/current/mod/core.html#servertokens)
* [ https://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10) ](https://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10))
* [ https://www.troyhunt.com/shhh-dont-let-your-response-headers/ ](https://www.troyhunt.com/shhh-dont-let-your-response-headers/)


#### CWE Id: [ 497 ](https://cwe.mitre.org/data/definitions/497.html)


#### WASC Id: 13

#### Source ID: 3

### [ Strict-Transport-Security Header Not Set ](https://www.zaproxy.org/docs/alerts/10035/)



##### Low (High)

### Description

HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.

* URL: https://agrofort.64.181.178.125.nip.io/_next/static/chunks/0r_zuhrn2jmbx.css
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/chunks/0r_zuhrn2jmbx.css`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/chunks/1rsn1dago3cd5.js
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/chunks/1rsn1dago3cd5.js`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/chunks/27f16r8f_43as.js
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/chunks/27f16r8f_43as.js`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/media/03bda585a99c6450-s.p.32sris142tqlb.woff2
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/media/03bda585a99c6450-s.p.32sris142tqlb.woff2`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/media/a343f882a40d2cc9-s.p.1sj6eobyi31rd.woff2
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/media/a343f882a40d2cc9-s.p.1sj6eobyi31rd.woff2`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``

Instances: Systemic


### Solution

Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.

### Reference


* [ https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html ](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html)
* [ https://owasp.org/www-community/Security_Headers ](https://owasp.org/www-community/Security_Headers)
* [ https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)
* [ https://caniuse.com/stricttransportsecurity ](https://caniuse.com/stricttransportsecurity)
* [ https://datatracker.ietf.org/doc/html/rfc6797 ](https://datatracker.ietf.org/doc/html/rfc6797)


#### CWE Id: [ 319 ](https://cwe.mitre.org/data/definitions/319.html)


#### WASC Id: 15

#### Source ID: 3

### [ X-Content-Type-Options Header Missing ](https://www.zaproxy.org/docs/alerts/10021/)



##### Low (Medium)

### Description

The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.

* URL: https://agrofort.64.181.178.125.nip.io/_next/static/chunks/0r_zuhrn2jmbx.css
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/chunks/0r_zuhrn2jmbx.css`
  * Method: `GET`
  * Parameter: `x-content-type-options`
  * Attack: ``
  * Evidence: ``
  * Other Info: `This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.
At "High" threshold this scan rule will not alert on client or server error responses.`
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/chunks/1rsn1dago3cd5.js
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/chunks/1rsn1dago3cd5.js`
  * Method: `GET`
  * Parameter: `x-content-type-options`
  * Attack: ``
  * Evidence: ``
  * Other Info: `This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.
At "High" threshold this scan rule will not alert on client or server error responses.`
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/chunks/27f16r8f_43as.js
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/chunks/27f16r8f_43as.js`
  * Method: `GET`
  * Parameter: `x-content-type-options`
  * Attack: ``
  * Evidence: ``
  * Other Info: `This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.
At "High" threshold this scan rule will not alert on client or server error responses.`
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/media/03bda585a99c6450-s.p.32sris142tqlb.woff2
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/media/03bda585a99c6450-s.p.32sris142tqlb.woff2`
  * Method: `GET`
  * Parameter: `x-content-type-options`
  * Attack: ``
  * Evidence: ``
  * Other Info: `This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.
At "High" threshold this scan rule will not alert on client or server error responses.`
* URL: https://agrofort.64.181.178.125.nip.io/_next/static/media/a343f882a40d2cc9-s.p.1sj6eobyi31rd.woff2
  * Node Name: `https://agrofort.64.181.178.125.nip.io/_next/static/media/a343f882a40d2cc9-s.p.1sj6eobyi31rd.woff2`
  * Method: `GET`
  * Parameter: `x-content-type-options`
  * Attack: ``
  * Evidence: ``
  * Other Info: `This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.
At "High" threshold this scan rule will not alert on client or server error responses.`

Instances: Systemic


### Solution

Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.
If possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.

### Reference


* [ https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85) ](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85))
* [ https://owasp.org/www-community/Security_Headers ](https://owasp.org/www-community/Security_Headers)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 15

#### Source ID: 3

### [ Content-Type Header Missing ](https://www.zaproxy.org/docs/alerts/10019/)



##### Informational (Medium)

### Description

The Content-Type header was either missing or empty.

* URL: https://agrofort.64.181.178.125.nip.io/api/
  * Node Name: `https://agrofort.64.181.178.125.nip.io/api/`
  * Method: `GET`
  * Parameter: `content-type`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``


Instances: 1

### Solution

Ensure each page is setting the specific and appropriate content-type value for the content being delivered.

### Reference


* [ https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85) ](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85))


#### CWE Id: [ 345 ](https://cwe.mitre.org/data/definitions/345.html)


#### WASC Id: 12

#### Source ID: 3

### [ Non-Storable Content ](https://www.zaproxy.org/docs/alerts/10049/)



##### Informational (Medium)

### Description

The response contents are not storable by caching components such as proxy servers. If the response does not contain sensitive, personal or user-specific information, it may benefit from being stored and cached, to improve performance.

* URL: https://agrofort.64.181.178.125.nip.io/api/
  * Node Name: `https://agrofort.64.181.178.125.nip.io/api/`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `308`
  * Other Info: ``


Instances: 1

### Solution

The content may be marked as storable by ensuring that the following conditions are satisfied:
The request method must be understood by the cache and defined as being cacheable ("GET", "HEAD", and "POST" are currently defined as cacheable)
The response status code must be understood by the cache (one of the 1XX, 2XX, 3XX, 4XX, or 5XX response classes are generally understood)
The "no-store" cache directive must not appear in the request or response header fields
For caching by "shared" caches such as "proxy" caches, the "private" response directive must not appear in the response
For caching by "shared" caches such as "proxy" caches, the "Authorization" header field must not appear in the request, unless the response explicitly allows it (using one of the "must-revalidate", "public", or "s-maxage" Cache-Control response directives)
In addition to the conditions above, at least one of the following conditions must also be satisfied by the response:
It must contain an "Expires" header field
It must contain a "max-age" response directive
For "shared" caches such as "proxy" caches, it must contain a "s-maxage" response directive
It must contain a "Cache Control Extension" that allows it to be cached
It must have a status code that is defined as cacheable by default (200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 501).

### Reference


* [ https://datatracker.ietf.org/doc/html/rfc7234 ](https://datatracker.ietf.org/doc/html/rfc7234)
* [ https://datatracker.ietf.org/doc/html/rfc7231 ](https://datatracker.ietf.org/doc/html/rfc7231)
* [ https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html ](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html)


#### CWE Id: [ 524 ](https://cwe.mitre.org/data/definitions/524.html)


#### WASC Id: 13

#### Source ID: 3

### [ Re-examine Cache-control Directives ](https://www.zaproxy.org/docs/alerts/10015/)



##### Informational (Low)

### Description

The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.

* URL: https://agrofort.64.181.178.125.nip.io
  * Node Name: `https://agrofort.64.181.178.125.nip.io`
  * Method: `GET`
  * Parameter: `cache-control`
  * Attack: ``
  * Evidence: `s-maxage=31536000`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/
  * Node Name: `https://agrofort.64.181.178.125.nip.io/`
  * Method: `GET`
  * Parameter: `cache-control`
  * Attack: ``
  * Evidence: `s-maxage=31536000`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/catalogo
  * Node Name: `https://agrofort.64.181.178.125.nip.io/catalogo`
  * Method: `GET`
  * Parameter: `cache-control`
  * Attack: ``
  * Evidence: `s-maxage=31536000`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/robots.txt
  * Node Name: `https://agrofort.64.181.178.125.nip.io/robots.txt`
  * Method: `GET`
  * Parameter: `cache-control`
  * Attack: ``
  * Evidence: `public, max-age=0, must-revalidate`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/sitemap.xml
  * Node Name: `https://agrofort.64.181.178.125.nip.io/sitemap.xml`
  * Method: `GET`
  * Parameter: `cache-control`
  * Attack: ``
  * Evidence: `public, max-age=0, must-revalidate`
  * Other Info: ``

Instances: Systemic


### Solution

For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".

### Reference


* [ https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching ](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching)
* [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control)
* [ https://grayduck.mn/2021/09/13/cache-control-recommendations/ ](https://grayduck.mn/2021/09/13/cache-control-recommendations/)


#### CWE Id: [ 525 ](https://cwe.mitre.org/data/definitions/525.html)


#### WASC Id: 13

#### Source ID: 3

### [ Storable and Cacheable Content ](https://www.zaproxy.org/docs/alerts/10049/)



##### Informational (Medium)

### Description

The response contents are storable by caching components such as proxy servers, and may be retrieved directly from the cache, rather than from the origin server by the caching servers, in response to similar requests from other users. If the response data is sensitive, personal or user-specific, this may result in sensitive information being leaked. In some cases, this may even result in a user gaining complete control of the session of another user, depending on the configuration of the caching components in use in their environment. This is primarily an issue where "shared" caching servers such as "proxy" caches are configured on the local network. This configuration is typically found in corporate or educational environments, for instance.

* URL: https://agrofort.64.181.178.125.nip.io
  * Node Name: `https://agrofort.64.181.178.125.nip.io`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `s-maxage=31536000`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/
  * Node Name: `https://agrofort.64.181.178.125.nip.io/`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `s-maxage=31536000`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/catalogo
  * Node Name: `https://agrofort.64.181.178.125.nip.io/catalogo`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `s-maxage=31536000`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/contato
  * Node Name: `https://agrofort.64.181.178.125.nip.io/contato`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `s-maxage=31536000`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/premiacoes
  * Node Name: `https://agrofort.64.181.178.125.nip.io/premiacoes`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `s-maxage=31536000`
  * Other Info: ``

Instances: Systemic


### Solution

Validate that the response does not contain sensitive, personal or user-specific information. If it does, consider the use of the following HTTP response headers, to limit, or prevent the content being stored and retrieved from the cache by another user:
Cache-Control: no-cache, no-store, must-revalidate, private
Pragma: no-cache
Expires: 0
This configuration directs both HTTP 1.0 and HTTP 1.1 compliant caching servers to not store the response, and to not retrieve the response (without validation) from the cache, in response to a similar request.

### Reference


* [ https://datatracker.ietf.org/doc/html/rfc7234 ](https://datatracker.ietf.org/doc/html/rfc7234)
* [ https://datatracker.ietf.org/doc/html/rfc7231 ](https://datatracker.ietf.org/doc/html/rfc7231)
* [ https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html ](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html)


#### CWE Id: [ 524 ](https://cwe.mitre.org/data/definitions/524.html)


#### WASC Id: 13

#### Source ID: 3

### [ Storable but Non-Cacheable Content ](https://www.zaproxy.org/docs/alerts/10049/)



##### Informational (Medium)

### Description

The response contents are storable by caching components such as proxy servers, but will not be retrieved directly from the cache, without validating the request upstream, in response to similar requests from other users.

* URL: https://agrofort.64.181.178.125.nip.io/robots.txt
  * Node Name: `https://agrofort.64.181.178.125.nip.io/robots.txt`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `max-age=0`
  * Other Info: ``
* URL: https://agrofort.64.181.178.125.nip.io/sitemap.xml
  * Node Name: `https://agrofort.64.181.178.125.nip.io/sitemap.xml`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `max-age=0`
  * Other Info: ``


Instances: 2

### Solution



### Reference


* [ https://datatracker.ietf.org/doc/html/rfc7234 ](https://datatracker.ietf.org/doc/html/rfc7234)
* [ https://datatracker.ietf.org/doc/html/rfc7231 ](https://datatracker.ietf.org/doc/html/rfc7231)
* [ https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html ](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html)


#### CWE Id: [ 524 ](https://cwe.mitre.org/data/definitions/524.html)


#### WASC Id: 13

#### Source ID: 3

### [ User Controllable HTML Element Attribute (Potential XSS) ](https://www.zaproxy.org/docs/alerts/10031/)



##### Informational (Low)

### Description

This check looks at user-supplied input in query string parameters and POST data to identify where certain HTML attribute values might be controlled. This provides hot-spot detection for XSS (cross-site scripting) that will require further review by a security analyst to determine exploitability.

* URL: https://agrofort.64.181.178.125.nip.io/contato%3Fcompany=ZAP&interest=conhecer+os+produtos&message=Zaproxy+alias+impedit+expedita+quisquam+pariatur+exercitationem.+Nemo+rerum+eveniet+dolores+rem+quia+dignissimos.&name=ZAP&phone=9999999999
  * Node Name: `https://agrofort.64.181.178.125.nip.io/contato (company,interest,message,name,phone)`
  * Method: `GET`
  * Parameter: `interest`
  * Attack: ``
  * Evidence: ``
  * Other Info: `User-controlled HTML attribute values were found. Try injecting special characters to see if XSS might be possible. The page at the following URL:

https://agrofort.64.181.178.125.nip.io/contato?company=ZAP&interest=conhecer+os+produtos&message=Zaproxy+alias+impedit+expedita+quisquam+pariatur+exercitationem.+Nemo+rerum+eveniet+dolores+rem+quia+dignissimos.&name=ZAP&phone=9999999999

appears to include user input in:
a(n) [option] tag [value] attribute

The user input found was:
interest=conhecer os produtos

The user-controlled value was:
conhecer os produtos`


Instances: 1

### Solution

Validate all input and sanitize output it before writing to any HTML attributes.

### Reference


* [ https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html ](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)


#### CWE Id: [ 20 ](https://cwe.mitre.org/data/definitions/20.html)


#### WASC Id: 20

#### Source ID: 3


