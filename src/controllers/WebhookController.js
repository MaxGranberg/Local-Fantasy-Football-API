import crypto from 'crypto'
import fetch from 'node-fetch'

/**
 * Sends a webhook notification with a signature for verification.
 *
 * @param {object} webhook - The webhook object containing the URL and the secret token.
 * @param {object} payload - The data to be sent to the webhook URL.
 */
export async function sendWebhookWithSignature (webhook, payload) {
  const payloadString = JSON.stringify(payload)
  const signature = crypto.createHmac('sha256', webhook.secretToken).update(payloadString).digest('hex')

  try {
    await fetch(webhook.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Signature': signature
      },
      body: payloadString
    })
  } catch (error) {
    throw new Error(error)
  }
}
