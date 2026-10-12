'use client'

import { createContext, useCallback, useContext, useId, useRef, useState } from 'react'
import { ArrowRight, CircleAlert, LoaderCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { submitDemoRequest, type DemoRequest } from '@/lib/demo-request'
import { buttonClass } from './primitives'

type DemoContextValue = { openDemo: () => void }
const DemoContext = createContext<DemoContextValue>({ openDemo: () => {} })

export function useDemo() {
  return useContext(DemoContext)
}

type Errors = Partial<Record<keyof DemoRequest, string>>
type Phase = 'idle' | 'submitting' | 'not-configured' | 'sent' | 'error'

const emptyForm: DemoRequest = { name: '', email: '', company: '', locations: '', message: '' }

function validate(values: DemoRequest): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Enter a valid work email.'
  if (values.company.trim().length < 2) errors.company = 'Enter your company name.'
  if (!values.locations) errors.locations = 'Select how many locations you manage.'
  if (values.message.length > 1000) errors.message = 'Keep the note under 1,000 characters.'
  return errors
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const [values, setValues] = useState<DemoRequest>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [phase, setPhase] = useState<Phase>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const titleId = useId()
  const descId = useId()

  const openDemo = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    dialog.showModal()
    requestAnimationFrame(() => firstFieldRef.current?.focus())
  }, [])

  const close = () => {
    dialogRef.current?.close()
    if (phase === 'sent') {
      setValues(emptyForm)
      setPhase('idle')
    }
  }

  const update = (key: keyof DemoRequest) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: validate(next)[key] }))
    if (phase !== 'idle' && phase !== 'submitting') setPhase('idle')
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      const el = e.currentTarget.elements.namedItem(firstInvalid)
      if (el instanceof HTMLElement) el.focus()
      return
    }
    setPhase('submitting')
    const result = await submitDemoRequest(values)
    if (result.status === 'error') setErrorMessage(result.message)
    setPhase(result.status)
  }

  const fieldClass = (invalid: boolean) =>
    cn(
      'h-11 w-full rounded-ctl border bg-raised px-3.5 text-[15px] text-ink placeholder:text-ink-3 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus',
      invalid ? 'border-danger-border bg-danger-subtle/40' : 'border-line hover:border-line-strong',
    )

  const field = (key: keyof DemoRequest) => ({
    id: `demo-${key}`,
    name: key,
    value: values[key],
    onChange: update(key),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `demo-${key}-error` : undefined,
  })

  const FieldError = ({ name }: { name: keyof DemoRequest }) =>
    errors[name] ? (
      <p id={`demo-${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-danger">
        <CircleAlert aria-hidden="true" className="size-3.5" />
        {errors[name]}
      </p>
    ) : null

  return (
    <DemoContext.Provider value={{ openDemo }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-panel border border-line bg-card p-0 text-ink shadow-overlay backdrop:bg-[oklch(0.2_0.02_265/0.45)] backdrop:backdrop-blur-[2px] open:animate-in open:fade-in-0 open:zoom-in-95"
      >
        <div className="max-h-[90dvh] overflow-y-auto p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="text-2xl font-semibold tracking-[-0.025em]">
                Book a demo
              </h2>
              <p id={descId} className="mt-1.5 text-[15px] leading-relaxed text-ink-2">
                Tell us about your locations and we&apos;ll tailor the walkthrough to Locations, Engage, or Synapse.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close demo request"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-hover hover:text-ink"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>

          {phase === 'sent' ? (
            <div role="status" className="rounded-card border border-success-border bg-success-subtle p-5">
              <p className="font-semibold text-success">Request received</p>
              <p className="mt-1 text-sm text-ink-2">Thanks, {values.name.split(' ')[0]}. The team will be in touch at {values.email}.</p>
              <button type="button" onClick={close} className={cn(buttonClass('primary', 'md'), 'mt-4')}>
                Close
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="demo-name" className="mb-1.5 block text-sm font-medium">
                    Full name
                  </label>
                  <input ref={firstFieldRef} autoComplete="name" className={fieldClass(!!errors.name)} {...field('name')} />
                  <FieldError name="name" />
                </div>
                <div>
                  <label htmlFor="demo-email" className="mb-1.5 block text-sm font-medium">
                    Work email
                  </label>
                  <input type="email" autoComplete="email" inputMode="email" className={fieldClass(!!errors.email)} {...field('email')} />
                  <FieldError name="email" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="demo-company" className="mb-1.5 block text-sm font-medium">
                    Company
                  </label>
                  <input autoComplete="organization" className={fieldClass(!!errors.company)} {...field('company')} />
                  <FieldError name="company" />
                </div>
                <div>
                  <label htmlFor="demo-locations" className="mb-1.5 block text-sm font-medium">
                    Locations
                  </label>
                  <select className={cn(fieldClass(!!errors.locations), 'appearance-none')} {...field('locations')}>
                    <option value="" disabled>
                      Select a range
                    </option>
                    <option value="2-10">2–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-250">51–250</option>
                    <option value="250+">250+</option>
                  </select>
                  <FieldError name="locations" />
                </div>
              </div>
              <div>
                <label htmlFor="demo-message" className="mb-1.5 block text-sm font-medium">
                  What would you like to see? <span className="font-normal text-ink-3">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  className={cn(fieldClass(!!errors.message), 'h-auto resize-none py-2.5')}
                  {...field('message')}
                />
                <FieldError name="message" />
              </div>

              <div aria-live="polite">
                {phase === 'not-configured' ? (
                  <div className="rounded-ctl border border-warning-border bg-warning-subtle p-3.5 text-sm text-ink">
                    <p className="font-semibold text-warning">Not sent — demo requests aren&apos;t connected yet</p>
                    <p className="mt-1 text-ink-2">
                      Your details are valid, but this page has no submission endpoint configured, so nothing was sent.
                      Please request a tour at{' '}
                      <a href="https://www.whatthelocal.com/" target="_blank" rel="noreferrer" className="font-semibold text-brand underline-offset-2 hover:underline">
                        whatthelocal.com
                      </a>
                      .
                    </p>
                  </div>
                ) : null}
                {phase === 'error' ? (
                  <div className="rounded-ctl border border-danger-border bg-danger-subtle p-3.5 text-sm text-danger">
                    {errorMessage}
                  </div>
                ) : null}
              </div>

              <button type="submit" disabled={phase === 'submitting'} className={cn(buttonClass('primary', 'lg'), 'w-full')}>
                {phase === 'submitting' ? (
                  <>
                    <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Request a demo
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </DemoContext.Provider>
  )
}

export function DemoButton({
  children = 'Book a Demo',
  variant = 'primary',
  size = 'md',
  className,
  withArrow = false,
}: {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  className?: string
  withArrow?: boolean
}) {
  const { openDemo } = useDemo()
  return (
    <button type="button" onClick={openDemo} aria-haspopup="dialog" className={cn(buttonClass(variant, size), className)}>
      {children}
      {withArrow ? (
        <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </button>
  )
}
