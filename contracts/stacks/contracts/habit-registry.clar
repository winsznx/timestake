;; clarity-version: 4
;; habit-registry.clar
;; Manages habit creation and storage

(define-constant ERR-NOT-FOUND (err u102))
(define-constant ERR-INVALID-PARAM (err u103))

(define-data-var habit-count uint u0)

(define-map habits
  { habit-id: uint }
  {
    owner: principal,
    name: (string-utf8 64),
    description: (string-utf8 256),
    frequency: uint,
    stake-amount: uint,
    created-at: uint,
    active: bool
  }
)

(define-map user-habits
  { user: principal, habit-id: uint }
  { created-at: uint }
)

(define-public (create-habit
  (name (string-utf8 64))
  (description (string-utf8 256))
  (frequency uint)
  (stake-amount uint))
  (begin
    (asserts! (> (len name) u0) ERR-INVALID-PARAM)
    (asserts! (> frequency u0) ERR-INVALID-PARAM)
    (asserts! (> stake-amount u0) ERR-INVALID-PARAM)
    (let ((new-id (+ (var-get habit-count) u1)))
      (map-set habits
        { habit-id: new-id }
        {
          owner: tx-sender,
          name: name,
          description: description,
          frequency: frequency,
          stake-amount: stake-amount,
          created-at: burn-block-height,
          active: true
        }
      )
      (map-set user-habits
        { user: tx-sender, habit-id: new-id }
        { created-at: burn-block-height }
      )
      (var-set habit-count new-id)
      (ok new-id)
    )
  )
)

(define-public (deactivate-habit (habit-id uint))
  (let ((habit (unwrap! (map-get? habits { habit-id: habit-id }) ERR-NOT-FOUND)))
    (map-set habits
      { habit-id: habit-id }
      (merge habit { active: false })
    )
    (ok true)
  )
)

(define-read-only (get-habit (habit-id uint))
  (map-get? habits { habit-id: habit-id })
)

(define-read-only (get-user-habit (user principal) (habit-id uint))
  (map-get? user-habits { user: user, habit-id: habit-id })
)

(define-read-only (get-habit-count)
  (ok (var-get habit-count))
)
