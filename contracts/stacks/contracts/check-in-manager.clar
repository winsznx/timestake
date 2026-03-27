;; clarity-version: 4
;; check-in-manager.clar
;; Handles daily check-ins and streak tracking


(define-map check-ins
  { user: principal, habit-id: uint }
  { last-check-in: uint, streak: uint, total-check-ins: uint }
)

(define-public (check-in (habit-id uint))
  (let (
      (existing
        (default-to
          { last-check-in: u0, streak: u0, total-check-ins: u0 }
          (map-get? check-ins { user: tx-sender, habit-id: habit-id })
        )
      )
      (current-block burn-block-height)
    )
    (let (
        (new-streak (+ (get streak existing) u1))
      )
      (map-set check-ins
        { user: tx-sender, habit-id: habit-id }
        {
          last-check-in: current-block,
          streak: new-streak,
          total-check-ins: (+ (get total-check-ins existing) u1)
        }
      )
      (ok new-streak)
    )
  )
)

(define-read-only (get-streak (user principal) (habit-id uint))
  (default-to
    { last-check-in: u0, streak: u0, total-check-ins: u0 }
    (map-get? check-ins { user: user, habit-id: habit-id })
  )
)

(define-read-only (can-check-in (user principal) (habit-id uint))
  (ok true)
)
