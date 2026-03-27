;; clarity-version: 4
;; leaderboard.clar
;; Tracks top users by score

(define-map scores
  { user: principal }
  { score: uint, rank: uint, last-updated: uint }
)

(define-data-var top-score uint u0)

(define-public (update-score (user principal) (points uint))
  (let (
      (existing
        (default-to
          { score: u0, rank: u0, last-updated: u0 }
          (map-get? scores { user: user })
        )
      )
      (new-score (+ (get score existing) points))
    )
    (map-set scores
      { user: user }
      { score: new-score, rank: u0, last-updated: burn-block-height }
    )
    (if (> new-score (var-get top-score))
      (var-set top-score new-score)
      false
    )
    (ok new-score)
  )
)

(define-read-only (get-score (user principal))
  (default-to
    { score: u0, rank: u0, last-updated: u0 }
    (map-get? scores { user: user })
  )
)

(define-read-only (get-top-score)
  (ok (var-get top-score))
)
