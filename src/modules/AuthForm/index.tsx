import { useState } from "react"
import axios from 'axios'
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
import {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';

export function AuthForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = async function (e: React.SyntheticEvent) {
    e.preventDefault();

    const res = (await axios.post<{
      id: String,
      challenge: {
        creation_challenge_response?: {
          publicKey: PublicKeyCredentialCreationOptionsJSON
        },
        request_challenge_response?: {
          publicKey: PublicKeyCredentialRequestOptionsJSON
        },
      }
    }>("/api/auth/join", { email })).data


    if (res.challenge.creation_challenge_response) {
      const qq = await startRegistration(res.challenge.creation_challenge_response.publicKey)

      console.log(qq)

      const zz = await axios.post("/api/auth/complete", {
        id: res.id,
        reg: qq
      })
    }

    if (res.challenge.request_challenge_response) {
      const qq = await startAuthentication(res.challenge.request_challenge_response.publicKey)

      console.log(qq)

      const zz = await axios.post("/api/auth/login", {
        id: res.id,
        auth: qq
      })
    }
  }

  return (
    <div><div>
      AUTH FFORM
    </div>
      <div><form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </form></div>
    </div>
  )
}
