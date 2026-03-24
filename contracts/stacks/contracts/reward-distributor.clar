;; reward-distributor.clar
;; Distributes rewards based on streak multipliers

(define-constant ERR-NO-REWARD (err u301))
(define-constant BASE-REWARD u10)

(define-map rewards
  { user: principal, habit-id: uint }
  { claimable: uint, total-claimed: uint, last-claim: uint }
)

(define-data-var reward-rate uint u100)

(define-public (calculate-and-set-reward (user principal) (habit-id uint) (streak uint))
  (let (
      (existing
        (default-to
          { claimable: u0, total-claimed: u0, last-claim: u0 }
          (map-get? rewards { user: user, habit-id: habit-id })
        )
      )
      (multiplier
        (if (>= streak u30)
          u5
          (if (>= streak u14)
            u3
            (if (>= streak u7) u2 u1)
          )
        )
      )
      (reward-amount (/ (* (* BASE-REWARD multiplier) (var-get reward-rate)) u100))
    )
    (map-set rewards
      { user: user, habit-id: habit-id }
      {
        claimable: (+ (get claimable existing) reward-amount),
        total-claimed: (get total-claimed existing),
        last-claim: (get last-claim existing)
      }
    )
    (ok reward-amount)
  )
)

(define-public (claim-reward (habit-id uint))
  (let (
      (reward-data
        (unwrap! (map-get? rewards { user: tx-sender, habit-id: habit-id }) ERR-NO-REWARD)
      )
      (amount (get claimable reward-data))
    )
    (asserts! (> amount u0) ERR-NO-REWARD)
    (map-set rewards
      { user: tx-sender, habit-id: habit-id }
      {
        claimable: u0,
        total-claimed: (+ (get total-claimed reward-data) amount),
        last-claim: block-height
      }
    )
    (ok amount)
  )
)

(define-read-only (get-reward (user principal) (habit-id uint))
  (default-to
    { claimable: u0, total-claimed: u0, last-claim: u0 }
    (map-get? rewards { user: user, habit-id: habit-id })
  )
)
