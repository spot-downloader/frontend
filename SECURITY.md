# Security Policy

## Supported Versions

Kami saat ini mendukung versi berikut dengan security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

Jika Anda menemukan vulnerability keamanan di project ini, mohon **JANGAN** membuat public issue.

Sebagai gantinya, silakan laporkan secara privat dengan cara:

1. **Email** ke security contact (bisa ditambahkan email Anda)
2. Atau gunakan **GitHub Security Advisories**:
   - Buka tab "Security" di repository
   - Klik "Report a vulnerability"
   - Isi form dengan detail vulnerability

### Informasi yang Perlu Disertakan

- Deskripsi vulnerability (XSS, CSRF, dll)
- Steps to reproduce
- Affected browsers/versions
- Potential impact
- Suggested fix (jika ada)

### Response Timeline

- **Initial Response**: Dalam 48 jam
- **Investigation**: 1-2 minggu
- **Fix & Disclosure**: Tergantung severity, kami akan:
  - Develop dan test fix
  - Release patch version
  - Publish security advisory
  - Credit reporter (jika diinginkan)

## Security Best Practices untuk Pengguna

1. **Jangan commit file `.env`** dengan API URLs production
2. **Validate user input** sebelum kirim ke backend
3. **Update dependencies** secara teratur: `npm audit fix`
4. **Gunakan HTTPS** untuk production deployment
5. **Set proper Content Security Policy** headers
6. **Enable secure cookies** jika menggunakan authentication

## Known Security Considerations

- API URL di environment variables bisa terlihat di browser DevTools
- CORS harus dikonfigurasi dengan benar di backend
- User input (Spotify URL) perlu validation di frontend & backend
- XSS protection perlu ditambahkan jika ada user-generated content

## Dependency Security

Kami secara aktif monitor dependencies untuk known vulnerabilities:

```bash
# Check for vulnerabilities
npm audit

# Auto-fix non-breaking changes
npm audit fix
```

## Frontend-Specific Security

### Environment Variables
- `VITE_API_URL` akan ter-expose di browser (ini normal untuk Vite)
- Jangan simpan secrets atau API keys di environment variables frontend
- Semua authentication harus di backend

### Content Security Policy
Pertimbangkan menambahkan CSP headers di production:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

Jika Anda menemukan dependency dengan vulnerability, silakan buat issue atau PR.
