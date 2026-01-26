;; TimeStake - Time-weighted staking protocol
(define-map stakes
    { user: principal }
    { amount: uint, start-time: uint, weight: uint }
)

(define-data-var total-weighted-stake uint u0)
(define-data-var reward-rate uint u100)

(define-public (stake (amount uint))
    (let (
        (user-stake (default-to { amount: u0, start-time: block-height, weight: u0 } (map-get? stakes { user: tx-sender })))
    )
        (if (> (get amount user-stake) u0)
            (let (
                (time-staked (- block-height (get start-time user-stake)))
                (old-weight (* (get amount user-stake) time-staked))
            )
                (var-set total-weighted-stake (- (var-get total-weighted-stake) old-weight))
                true
            )
            true
        )
        (let (
            (new-amount (+ (get amount user-stake) amount))
            (new-weight new-amount)
        )
            (map-set stakes { user: tx-sender } {
                amount: new-amount,
                start-time: block-height,
                weight: new-weight
            })
            (var-set total-weighted-stake (+ (var-get total-weighted-stake) new-weight))
            (ok true)
        )
    )
)

(define-public (unstake)
    (let (
        (user-stake (unwrap-panic (map-get? stakes { user: tx-sender })))
        (time-staked (- block-height (get start-time user-stake)))
        (final-weight (* (get amount user-stake) time-staked))
        (reward (/ (* final-weight (var-get reward-rate)) u10000))
    )
        (var-set total-weighted-stake (- (var-get total-weighted-stake) final-weight))
        (map-delete stakes { user: tx-sender })
        (ok (+ (get amount user-stake) reward))
    )
)

(define-read-only (calculate-reward (user principal))
    (match (map-get? stakes { user: user })
        stake (let (
            (time-staked (- block-height (get start-time stake)))
            (weight (* (get amount stake) time-staked))
        )
            (/ (* weight (var-get reward-rate)) u10000)
        )
        u0
    )
)
