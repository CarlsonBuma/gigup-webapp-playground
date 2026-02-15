## ⚠️ Security Warning: Authentication Not XSS‑Safe

This project currently stores the **Bearer Token in `localStorage`**, which makes it **vulnerable to XSS attacks**.  
Any successful script injection on the client can read the token and impersonate the user.

**Do NOT use this implementation in production.**  
It is intended for development and experimentation only.

### Why this is unsafe
- `localStorage` is accessible to any JavaScript running on the page  
- A single XSS vulnerability allows attackers to extract the token  
- Attackers can then perform authenticated requests as the victim

### Recommended mitigation
If you plan to deploy this project, replace the current mechanism with a more secure approach, such as:
- **HTTP‑only, Secure cookies** for storing session tokens  
- **Short‑lived access tokens** with **refresh tokens** stored in secure cookies  
- **Strict Content Security Policy (CSP)** to reduce XSS risk  

---

# Webapp Template
by Carlson, 2025-06-25

## Folder Structure
Root folder:
   - /backend (see Readme.md)
   - /docs
   - /frontend (see Readme.md)
   - Start Environment - "start in terminal":
      > "./env-start.ps1"
   - Setup Docker Environment - "docker compose up":
      > "./docker-compose.yml"

## Security Check
   - go "/frontend": 
      - npm update
      - npm audit
      - npm audit fix --force
   - go "/backend": 
      - composer outdated
      - composer update

## Go Live - Server Configurations
Backend (Laravel12) & Frontend (Node.js)
Ref. readme.ssh.md
