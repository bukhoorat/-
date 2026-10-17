import { useState } from 'react'
import { api } from '../../api/client.js'

export default function ImageUpload({ value, onChange, label, accept = 'image/*' }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputId = `upload-${label?.replace(/\s/g, '-') || Math.random().toString(36).slice(2)}`

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const res = await api.uploadFile(file)
      onChange(res.url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const isAudio = value && value.match(/\.(mp3|wav|ogg|m4a)$/i)

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      {value && (
        <div className="upload-preview">
          {isAudio ? <audio src={value} controls /> : <img src={value} alt="Preview" />}
        </div>
      )}
      <div className="upload-area" onClick={() => document.getElementById(inputId).click()}>
        {uploading ? 'Uploading...' : 'Click to upload'}
      </div>
      <input type="file" id={inputId} style={{ display: 'none' }} onChange={handleUpload} accept={accept} />
      {error && <div className="admin-status error">{error}</div>}
      {value && <button type="button" className="btn btn-sm" style={{ marginTop: '8px' }} onClick={() => onChange('')}>Remove</button>}
    </div>
  )
}
