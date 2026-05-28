# Qualtrics Outbound Data Reference


## instructionsV2.html

- **`completed`** (boolean) — `true`
- **`attentionCheck`** (number) — `1` · `1` if "Monday" was clicked, else `0`
- **`comprehension`** (object) — `{"noCravingCost": true, "feelGoodBonus": true, "cravingReceive": true, "oneRound": true, "twoVersions": true, "drinkSometimes": true, "drinkNotNecessarily": true}` · map of item-id → boolean at submit
- **`wrongCountDieterQ1`** (number|null) — `0` · incorrect-attempt count for Q1
- **`wrongCountDieterQ2`** (number|null) — `1`
- **`wrongCountMigrainesQ1`** (number|null) — `0`
- **`wrongCountMigrainesQ2`** (number|null) — `0`
- **`allAnswersDieterQ1`** (string[][] | null) — `[["noCravingCost","feelGoodBonus","cravingReceive","oneRound"]]` · history of selected item-ids per attempt
- **`allAnswersDieterQ2`** (string[][] | null) — `[["twoVersions","drinkSometimes"], ["twoVersions","drinkSometimes","drinkNotNecessarily"]]`
- **`allAnswersMigrainesQ1`** (string[][] | null) — `[["noCravingCost","feelGoodBonus","cravingReceive","oneRound"]]`
- **`allAnswersMigrainesQ2`** (string[][] | null) — `[["twoVersions","drinkSometimes","drinkNotNecessarily"]]`
- **`pageTimes`** (number[]) — `[22.3, 31.5, 18.9, 27.1, 14.8, 12.6, 41.2]`
- **`comprehTimes`** (number[]) — `[41.2]` · seconds per visit to the comprehension page
- **`gameVersionsDescriptionOrderDieter1`** (number|null) — `1` · 1-based index of Possibility 1 in display order
- **`gameVersionsDescriptionOrderDieter2`** (number|null) — `2`
- **`gameVersionsDescriptionOrderMigraines1`** (number|null) — `2`
- **`gameVersionsDescriptionOrderMigraines2`** (number|null) — `1`

Conditional:
- `wrongCountDieterQ1` / `wrongCountDieterQ2` / `allAnswersDieterQ1` / `allAnswersDieterQ2` are non-null only when `CONFIG.supergame === 'dieter'`; otherwise `null`.
- `wrongCountMigrainesQ1` / `wrongCountMigrainesQ2` / `allAnswersMigrainesQ1` / `allAnswersMigrainesQ2` are non-null only when `CONFIG.supergame === 'migraines'`; otherwise `null`.
- `gameVersionsDescriptionOrderDieter1` / `…Dieter2` are non-null only when `CONFIG.supergame === 'dieter'`; otherwise `null`.
- `gameVersionsDescriptionOrderMigraines1` / `…Migraines2` are non-null only when `CONFIG.supergame === 'migraines'`; otherwise `null`.

---

## mainV2.html

### `DAG_DATA`
- **`initialDAG`** (object) — `{ "A->Y": 1, "X->Y": 1, "A->X": 0 }` · first DAG submitted
- **`finalDAG`** (object) — `{ "A->Y": 1, "X->Y": 1, "A->X": 1 }` · DAG after revisions
- **`confidence`** (number) — `4` · DAG confidence rating
- **`DAGAlertCount`** (number) — `1`
- **`initialDAGTime`** (number) — `22.4` · seconds
- **`finalDAGTime`** (number) — `11.8` · seconds
- **`confidenceTime`** (number) — `5.2` · seconds
- **`completedAtRound`** (number) — `12` · currentRound at completion

### `BELIEF_DATA`
- **`<causalKey>`** (object) — `{ "pY_given_A1": 0.7, "pY_given_A0": 0.4, "payment": 6.5 }` · one entry per `CONFIG.mainCausals` element (e.g., `AY`, `XY`); shape inherited from the belief iframe
- **`completedAtRound`** (number) — `12`

### `FINAL_DATA`
- **`history`** (number[][]) — `[[1,0,1],[0,1,0],[1,1,1],[0,0,0],[1,0,1],[1,1,1],[0,1,1],[1,0,0],[0,0,0],[1,1,1],[1,0,1],[0,1,1]]` · per-round `[A, X, Y]`
- **`roundTimes`** (number[]) — `[4.1,2.7,3.5,2.0,2.6,3.1,2.4,2.8,2.5,2.9,2.2,2.6]` · seconds per decision
- **`roundTimestamps`** (object[]) — `[{"round":1,"decisionTime":4.1,"chemicalViewTime":1.2,"outcomeViewTime":null}, …]`
- **`payment`** (number[]) — `[8.5,0,8.5,0,8.5,8.5,10,-1.5,0,8.5,8.5,10]` · per-round earnings
- **`dagInitial`** (object) — `{"A->Y":1,"X->Y":1,"A->X":0}`
- **`dagFinal`** (object) — `{"A->Y":1,"X->Y":1,"A->X":1}`
- **`dagConfidence`** (number) — `4`
- **`DAGAlertCount`** (number) — `1`
- **`initialDAGTime`** (number) — `22.4`
- **`finalDAGTime`** (number) — `11.8`
- **`confidenceTime`** (number) — `5.2`
- **`beliefData`** (object) — `{"AY":{"pY_given_A1":0.7,"pY_given_A0":0.4,"payment":6.5}}` · full payload from belief iframe
- **`priceElicitation`** (object[]) — `[{"price":0,"choice":1},{"price":7.5,"choice":1},{"price":15,"choice":0},{"price":22.5,"choice":0},{"price":30,"choice":0}]`
- **`highStakeOutcomes`** (object[]) — `[{"price":0,"choice":1,"X":1,"Y":1}, {"price":7.5,"choice":1,"X":0,"Y":1}, {"price":15,"choice":0,"X":0,"Y":0}, {"price":22.5,"choice":0,"X":1,"Y":1}, {"price":30,"choice":0,"X":0,"Y":0}]`
- **`paymentHighStake`** (number[]) — `[130,122.5,30,130,30]`
- **`tracking`** (object) — `{"pageLoadTime":1748268000000,"visibilityChanges":2,"blurEvents":1,"focusEvents":1,"copyEvents":0,"pasteEvents":0,"contextMenuEvents":0,"keyboardShortcuts":3,"tabSwitches":1,"lastVisibilityState":"visible","totalDurationSec":712.4}`

Conditional:
- `priceElicitation[i].X` and `priceElicitation[i].Y` are only present when `CONFIG.supergame === 'migraines'`; in dieter mode each entry is just `{ price, choice }`.
- `payment` and `paymentHighStake` formulas differ by supergame, but the field shape (array of numbers) is unchanged.

---

## dagElicitationV3.html

- **`initialDAG`** (object[]) — `[{"from":"X","to":"A"},{"from":"A","to":"Y"},{"from":"X","to":"Y"}]` · edges before confirmation; nodes in `"A" | "X" | "Y"`
- **`finalDAG`** (object[]) — `[{"from":"X","to":"A"},{"from":"A","to":"Y"}]` · edges after confirm/change loop
- **`confidence`** (number) — `70` · integer 0–100
- **`DAGAlertCount`** (number) — `1` · invalid-temporal-direction alerts during initial drawing
- **`initialDAGTime`** (number) — `42.318` · seconds
- **`finalDAGTime`** (number) — `18.604` · seconds
- **`confidenceTime`** (number) — `11.227` · seconds

Conditional:
- `finalDAG` is identical to `initialDAG` when `CONFIG.noConfirmation === 1` (the per-pair confirm/change loop is skipped); `finalDAGTime` is near zero in that case but still emitted.
- Edges carry only `from`/`to` — no sign, weight, or coordinates.
- Allowed direction `A → X` is disallowed in migraines (it triggers a `DAGAlertCount` increment instead).

---

## beliefV2.html

- **`id`** (number) — `1` · `CONFIG.id`
- **`responses`** (object[]) — `[{"id":"AY0","causalElicit":"AY","exoButton":0,"pie1Value":30,"pie2Value":70,"verbalValue":14,"verbalText":"Increases the chance by 40-49%","roundTime":42.318}]` · raw per-round records
- **`beliefHistory`** (object[]) — `[{"id":"AY0","causalElicit":"AY","exoButton":0,"pie1Value":30,"pie2Value":70,"verbalValue":14,"verbalText":"Increases the chance by 40-49%"}]` · same projected without `roundTime`
- **`beliefRoundTimes`** (number[]) — `[42.318]`
- **`beliefPayment`** (number[] | nulls) — `[6]` · verbal-scale bonus per round
- **`beliefPaymentSlider1`** (number[] | nulls) — `[6]`
- **`beliefPaymentSlider2`** (number[] | nulls) — `[6]`
- **`beliefCorrectAnswer`** (number[] | nulls) — `[13]` · rational-inference target for the verbal scale
- **`beliefCorrectAnswerSlider1`** (number[] | nulls) — `[30]` · rational-inference target for pie 1
- **`beliefCorrectAnswerSlider2`** (number[] | nulls) — `[70]` · rational-inference target for pie 2
- **`pie1Values`** (number[] | nulls) — `[30]` · 0–100 in steps of 10
- **`pie2Values`** (number[] | nulls) — `[70]`
- **`verbalValues`** (number[]) — `[14]` · option index on the verbal scale (0–20)
- **`beliefs`** (number[]) — `[14]` · alias of `verbalValues`
- **`increasingOrder`** (number) — `1` · `CONFIG.increasingOrder`

Conditional:
- `beliefCorrectAnswer` / `beliefCorrectAnswerSlider1` / `beliefCorrectAnswerSlider2` are `null` unless `CONFIG.rationalInference` was supplied in `INIT.gameConfig`. When supplied, payments are computed as `beliefPaymentMax − absoluteDifference × beliefPaymentIncentive`.
- `pie1Value` / `pie2Value` (and the corresponding `beliefPaymentSlider1` / `…Slider2`) are `null` for any round where the pie stage was skipped (e.g., `CONFIG.forceSkipPieCharts` or per-scenario skip logic).

---

## additionalQuestionsV3.html

- **`dieterPA`** (number|null) — `5` · q1 option index 0–9
- **`migrainesPAX`** (number|null) — `4` · q1
- **`dieterPX`** (number|null) — `7` · q2
- **`migrainesPAx`** (number|null) — `6` · q2
- **`dieterPY`** (number|null) — `6` · q3
- **`migrainesPX`** (number|null) — `3` · q3
- **`dieterSameNo`** (number|null) — `3` · q4
- **`migrainesPY`** (number|null) — `5` · q4
- **`dieterSameYes`** (number|null) — `8` · q5
- **`dieterVersion`** (null) — `null` · q6 is no longer asked in V3; field is always `null`
- **`migrainesVersion`** (null) — `null` · q6 is no longer asked in V3; field is always `null`
- **`ownWords`** (string) — `"I started skipping more often after week 15 because I noticed it didn't change how I felt."` · q7 free text
- **`ownWordsDAG`** (string) — `"Drinking Qivex-norm raises my Qivex level but doesn't seem to make me feel energetic."` · q8 free text
- **`keylogOwnWords`** (object[]) — `[{"key":"I","time":1716732401123},{"key":" ","time":1716732401287},{"key":"s","time":1716732401410},{"key":"INPUT_JUMP","time":1716732415902,"jump":47,"total":47}]` · keystroke log for q7; entries are `{ key, time }` or `{ key: "INPUT_JUMP", time, jump, total }` for paste detection
- **`keylogOwnWordsDAG`** (object[]) — `[{"key":"D","time":1716732460011},{"key":"r","time":1716732460145}]` · keystroke log for q8

Conditional:
- `dieterPA` / `dieterPX` / `dieterPY` / `dieterSameNo` / `dieterSameYes` are non-null only when `CONFIG.supergame !== 'migraines'`; otherwise `null`.
- `migrainesPAX` / `migrainesPAx` / `migrainesPX` / `migrainesPY` are non-null only when `CONFIG.supergame === 'migraines'`; otherwise `null`.
- `dieterPX` (q2) is additionally skipped — and therefore remains `null` (its raw answer is `null`, so `PERCENTAGE_OPTIONS.indexOf(null)` yields `-1`) — when `CONFIG.order === 'AY'`.
- `dieterSameYes` (q5) is hidden in migraines mode (q5 is not rendered), so its index is `-1` in that case (matches the migraines-only convention).
- `dieterVersion` and `migrainesVersion` are always `null` — the version question (q6) is no longer asked in V3.

