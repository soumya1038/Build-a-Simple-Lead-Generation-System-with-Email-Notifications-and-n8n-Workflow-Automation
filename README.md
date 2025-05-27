🔥 Awesome — yes, since I've seen your whole stack:
✅ React frontend form sending leads
✅ Backend (optional or via direct n8n webhook)
✅ n8n workflow: Webhook → Google Sheets → Send Email

Let’s put together a clean, professional **README.md** you can use for this project 👌

---

# 📄 Lead Generation System with Email Notifications and n8n Automation

A simple Lead Generation system where users submit their details via a React frontend form. The data is stored in a **Google Sheet** using **n8n workflow automation** and a notification email is sent for each submission.

---

## 📦 Project Structure

```
lead-generation-system/
│
├── frontend/              # React Frontend
│   └── src/
│       └── components/
│           └── UserInputForm/
│               └── index.js
│
├── n8n/                   # n8n Workflow (self-hosted or cloud)
│
└── README.md
```

---

## ✨ Features

* React form to collect Username and Email.
* Google Sheets integration via n8n.
* Automatic email notification via Gmail (SMTP).
* Data stored for each submission.
* No manual workflow execution needed after activation.

---

## 🚀 Frontend Setup (React)

1️⃣ Install dependencies:

```bash
npm install
```

2️⃣ Start the development server:

```bash
npm start
```

3️⃣ Update your webhook URL in `/src/components/UserInputForm/index.js`:

```javascript
fetch("http://localhost:5678/webhook/submit-lead", ...)
```

(use your actual n8n webhook production URL)

---

## ⚙️ n8n Workflow Setup

1️⃣ Install and run n8n locally:

```bash
npm install n8n -g
n8n
```

2️⃣ Open `http://localhost:5678` in your browser.

3️⃣ Create a new Workflow:

* **Webhook Node**

  * Method: `POST`
  * Path: `/submit-lead`
  * Activate Workflow.

4️⃣ **Google Sheets Node**

* Operation: `Append Sheet Row`
* Spreadsheet: your Google Sheet ID
* Fields:

  * `Username`: `{{$json["body"]["username"]}}`
  * `Email`: `{{$json["body"]["email"]}}`
  * `Timestamp`: `{{new Date().toISOString()}}`

5️⃣ **Send Email Node**

* SMTP: Gmail SMTP
* To Email: your email or `{{$json["body"]["email"]}}`
* Subject: New Lead Received
* Body:

  ```html
  <p><strong>Name:</strong> {{$json["body"]["username"]}}</p>
  <p><strong>Email:</strong> {{$json["body"]["email"]}}</p>
  ```

6️⃣ Activate the workflow.

---

## 📧 Gmail SMTP Setup

* Go to **Google Cloud Console**
* Create OAuth2 credentials for Gmail
* Use those in n8n’s Send Email node.
* Add redirect URI:
  `http://localhost:5678/rest/oauth2-credential/callback`

---

## 📑 Summary Workflow

**Frontend** → `POST` to **n8n Webhook** → Append to **Google Sheets** → Send Email Notification via **Gmail**

---

## 📸 Screenshots

✅ n8n Workflow
✅ Google Sheet with new leads
✅ Email notification preview

*(optional — add images here if needed)*

---

## 📌 Notes

* Ensure `n8n` is always running to keep workflow active.
* Use `Production Webhook URL` for active workflows.
* Make sure CORS is configured if deploying frontend separately.

---

## 📬 Author

**Soumya Maity**
\[Your GitHub / Portfolio link]

---

Would you like a ready `.env` sample for SMTP credentials too? I can add it in 🔥
