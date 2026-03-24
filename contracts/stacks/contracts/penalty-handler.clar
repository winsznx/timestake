;; penalty-handler.clar
;; Handles penalties for missed check-ins

(define-constant PENALTY-RATE u10)

(define-map penalties
  { user: principal, habit-id: uint }
  { total-penalties: uint, total-slashed: uint }
)

(define-public (apply-penalty (user principal) (habit-id uint) (missed-days uint))
  (let (
      (existing
        (default-to
          { total-penalties: u0, total-slashed: u0 }
          (map-get? penalties { user: user, habit-id: habit-id })
        )
      )
      (penalty-amount (* missed-days PENALTY-RATE))
    )
    (map-set penalties
      { user: user, habit-id: habit-id }
      {
        total-penalties: (+ (get total-penalties existing) u1),
        total-slashed: (+ (get total-slashed existing) penalty-amount)
      }
    )
    (ok penalty-amount)
  )
)

(define-read-only (get-penalties (user principal) (habit-id uint))
  (default-to
    { total-penalties: u0, total-slashed: u0 }
    (map-get? penalties { user: user, habit-id: habit-id })
  )
)
