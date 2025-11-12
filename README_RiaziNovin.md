# 🧮 RiaziNovin

**RiaziNovin** is an educational web platform for teaching and practicing mathematics in an interactive, modern way.  
This project is developed as part of a 6-member academic software engineering team under the supervision of **Mrs. Mohammadi**.

---

## 👥 Team Members

| Name | Role |
|------|------|
| **Mohammadreza Taheri** | Product Manager |
| **Arman Farahzad** | Scrum Master |
| **Saghar Berenjkar** | Frontend Developer |
| **Yalda Mousavi** | Backend Developer |
| **Yas Ghavavati** | UI/UX Designer |
| **Hadis Khadem Hamzeh** | UI/UX Designer |
| **Mrs. Mohammadi** | Project Owner (Client) |

---

## 🌿 Git Branch Structure

```
           ┌──────────────────────────────┐
           │          MAIN                │
           │ (Stable / Release version)   │
           └──────────────▲───────────────┘
                          │
                  Merge after testing
                          │
                 ┌─────────┴─────────┐
                 │       DEV         │
                 │ (Active development)
                 └─────────▲─────────┘
                           │
          ┌────────────────┴────────────────┐
          │                                 │
   FRONTEND (React)                 BACKEND (Django)
   feature/ui-login                 feature/api-auth
   feature/dashboard                feature/db-models
```

---

## 🔁 Workflow

1. All feature branches are created **from `dev`**.  
2. Developers commit and push changes to their feature branch.  
3. When a feature is completed → open a **Pull Request** into `dev`.  
4. After testing and review, merge `dev` → `main` for the release.

---

## ⚙️ Branch Rules

| Branch | Purpose | Access |
|--------|----------|--------|
| `main` | Stable release version | Only after testing |
| `dev` | Active development | All developers via PR |
| `frontend` | React-based UI development | Frontend team |
| `backend` | Django-based API development | Backend team |

---

## 🗂 Folder Structure (planned)

```
RiaziNovin/
├── frontend/        # React project
├── backend/         # Django project
├── docs/            # Project documentation
├── designs/         # Figma and UI assets
└── README.md
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/<your-username>/riazinovin.git

# Switch to your branch
git checkout dev
git checkout -b frontend   # or backend

# Start developing!
```

---

**© 2025 — RiaziNovin Team**
