const express = require('express')
const cors = require('cors')
const axios = require('axios')  // install it if you haven't: npm install axios

const app = express()
app.use(cors())
app.use(express.json())

app.post('/submit-lead', async (req, res) => {
  const { username, email, company, message } = req.body

  // Send to n8n webhook
  try {
    const response = await axios.post(
      'http://localhost:5678/webhook-test/submit-lead',
      {
        username,
        email,
        company,
        message,
      }
    )

    res.status(200).json({ message: 'Lead sent to n8n successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to send to n8n' })
  }
})

app.listen(5000, () => console.log('Backend running on port 5000'))
