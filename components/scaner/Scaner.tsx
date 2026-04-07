'use client'

import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { useState, useCallback, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SiteLocation {
  latitude: number
  longitude: number
}


interface QRPayload {
  location: SiteLocation
  siteId?: string
  siteName?: string
}

type ScanStatus =
  | 'idle'
  | 'scanning'
  | 'locating'
  | 'checking'
  | 'submitting'
  | 'success'
  | 'out_of_zone'
  | 'error'

interface AttendanceRecord {
  siteId?: string
  siteName?: string
  siteLocation: SiteLocation
  userLocation: SiteLocation
  distanceMeters: number
  timestamp: string
  present: boolean
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ZONE_RADIUS_METERS = 100

// 🔁 Replace with your real API endpoint
const API_ENDPOINT = '/api/attendance'

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Haversine formula — returns distance in meters between two lat/lng points.
 */
function getDistanceMeters(a: SiteLocation, b: SiteLocation): number {
  const R = 6_371_000 // Earth radius in metres
  const toRad = (deg: number) => (deg * Math.PI) / 180

  const dLat = toRad(b.latitude - a.latitude)
  const dLon = toRad(b.longitude - a.longitude)

  const sinLat = Math.sin(dLat / 2)
  const sinLon = Math.sin(dLon / 2)

  const haversine =
    sinLat * sinLat +
    Math.cos(toRad(a.latitude)) * Math.cos(toRad(b.latitude)) * sinLon * sinLon

  return R * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
}

function getCurrentPosition(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(new Error(`Location error (${err.code}): ${err.message}`)),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 0 }
    )
  })
}

async function submitAttendance(record: AttendanceRecord): Promise<void> {
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Server error ${res.status}: ${text}`)
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScannerCode() {
  const [status, setStatus] = useState<ScanStatus>('scanning')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [record, setRecord] = useState<AttendanceRecord | null>(null)
  const processingRef = useRef(false) // prevents duplicate scans

  const handleScan = useCallback(async (results: IDetectedBarcode[]) => {
    if (!results.length || processingRef.current) return
    processingRef.current = true

    try {
      // ── 1. Parse QR payload ──────────────────────────────────────────────
      let payload: QRPayload
      try {
        payload = JSON.parse(results[0].rawValue)
      } catch {
        throw new Error('QR code does not contain valid JSON.')
      }

      if (
        typeof payload?.location?.latitude !== 'number' ||
        typeof payload?.location?.longitude !== 'number'
      ) {
        throw new Error('QR payload missing location.latitude / location.longitude.')
      }

      const siteLocation = payload.location

      // ── 2. Get user location ─────────────────────────────────────────────
      setStatus('locating')
      let coords: GeolocationCoordinates
      try {
        coords = await getCurrentPosition()
      } catch (e: unknown) {
        throw new Error(e instanceof Error ? e.message : 'Unable to get your location.')
      }

      const userLocation: SiteLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      }

      // ── 3. Check distance ────────────────────────────────────────────────
      setStatus('checking')
      const distanceMeters = getDistanceMeters(userLocation, siteLocation)
      const present = distanceMeters <= ZONE_RADIUS_METERS

      const attendanceRecord: AttendanceRecord = {
        siteId: payload.siteId,
        siteName: payload.siteName,
        siteLocation,
        userLocation,
        distanceMeters: Math.round(distanceMeters),
        timestamp: new Date().toISOString(),
        present,
      }

      // ── 4. Submit to database ────────────────────────────────────────────
      setStatus('submitting')
      await submitAttendance(attendanceRecord)

      // ── 5. Show result ───────────────────────────────────────────────────
      setRecord(attendanceRecord)
      setStatus(present ? 'success' : 'out_of_zone')
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : 'An unexpected error occurred.')
      setStatus('error')
    }
    // Note: processingRef stays true so we don't re-scan on the same mount.
  }, [])

  const reset = () => {
    processingRef.current = false
    setStatus('scanning')
    setRecord(null)
    setErrorMsg(null)
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm flex flex-col gap-4">

        {/* Header */}
        <div className="text-center mb-2">
          <p className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase">TGCC</p>
          <h1 className="text-xl font-semibold text-white mt-1">Attendance Scanner</h1>
        </div>

        {/* Scanner (only shown while scanning) */}
        {(status === 'scanning' || status === 'locating' || status === 'checking' || status === 'submitting') && (
          <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl">
            {status === 'scanning' && (
              <Scanner
                allowMultiple={false}
                onScan={handleScan}
                components={{ finder: false }}
                constraints={{ facingMode: 'environment' }}
              />
            )}

            {/* Corner brackets */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-white rounded-tl-lg" />
              <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-white rounded-tr-lg" />
              <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-white rounded-bl-lg" />
              <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-white rounded-br-lg" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full" />
            </div>

            {/* Processing overlay */}
            {status !== 'scanning' && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                <LoadingSpinner />
                <p className="text-white text-sm font-medium">
                  {status === 'locating' && 'Getting your location…'}
                  {status === 'checking' && 'Checking proximity…'}
                  {status === 'submitting' && 'Recording attendance…'}
                </p>
              </div>
            )}

            {/* Badge */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full">
              <p className="text-[10px] font-bold text-white uppercase tracking-widest">
                tgcc scanner
              </p>
            </div>
          </div>
        )}

        {/* Result card — success */}
        {status === 'success' && record && (
          <ResultCard
            icon="✓"
            iconBg="bg-emerald-500"
            title="Attendance Recorded"
            subtitle={record.siteName ?? record.siteId ?? 'Site'}
            rows={[
              { label: 'Status', value: 'Present ✓' },
              { label: 'Distance', value: `${record.distanceMeters} m from site` },
              { label: 'Time', value: new Date(record.timestamp).toLocaleTimeString() },
            ]}
            onReset={reset}
            resetLabel="Scan Again"
          />
        )}

        {/* Result card — out of zone */}
        {status === 'out_of_zone' && record && (
          <ResultCard
            icon="⚠"
            iconBg="bg-amber-500"
            title="Outside Zone"
            subtitle={record.siteName ?? record.siteId ?? 'Site'}
            rows={[
              { label: 'Status', value: 'Absent – too far' },
              { label: 'Distance', value: `${record.distanceMeters} m (max ${ZONE_RADIUS_METERS} m)` },
              { label: 'Time', value: new Date(record.timestamp).toLocaleTimeString() },
            ]}
            onReset={reset}
            resetLabel="Try Again"
          />
        )}

        {/* Error card */}
        {status === 'error' && (
          <div className="rounded-2xl bg-zinc-900 border border-red-500/30 p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white text-2xl font-bold">
              !
            </div>
            <div>
              <p className="text-white font-semibold text-lg">Something went wrong</p>
              <p className="text-zinc-400 text-sm mt-1">{errorMsg}</p>
            </div>
            <button
              onClick={reset}
              className="w-full py-3 rounded-xl bg-zinc-800 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )
}

interface ResultCardProps {
  icon: string
  iconBg: string
  title: string
  subtitle: string
  rows: { label: string; value: string }[]
  onReset: () => void
  resetLabel: string
}

function ResultCard({ icon, iconBg, title, subtitle, rows, onReset, resetLabel }: ResultCardProps) {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col items-center gap-5">
      <div className={`w-16 h-16 rounded-full ${iconBg} flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
        {icon}
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-xl">{title}</p>
        <p className="text-zinc-400 text-sm mt-1">{subtitle}</p>
      </div>
      <div className="w-full divide-y divide-zinc-800 rounded-xl overflow-hidden bg-zinc-800/50">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between items-center px-4 py-3">
            <span className="text-zinc-400 text-sm">{row.label}</span>
            <span className="text-white text-sm font-medium">{row.value}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-colors"
      >
        {resetLabel}
      </button>
    </div>
  )
}