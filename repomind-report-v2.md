# RepoMind report — tj/commander.js

Primary language: JavaScript

## Summary

| Metric | Value |
|---|---|
| PRs scanned | 30 |
| Review threads | 56 |
| Reusable lessons extracted | 30 (of 40 candidates) |
| Merged rules | 14 |
| Specificity — team_specific | 2 (7%) |
| Specificity — conventional | 11 (37%) |
| Specificity — generic | 17 (57%) |

> **Phase 0 metric:** 7% of reusable lessons are team-specific.

## Security

### Review regex patterns that process user-controlled data for potential ReDoS (Regular expression Denial of Service) vulnerabilities, especially when the pattern has polynomial worst-case complexity.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #2484](https://github.com/tj/commander.js/pull/2484#discussion_r2835402660)
- > "This regular expression that depends on library input may run slow on strings starting with ' -h ' and with many repetitions of ' -h '."

## Architecture

### Use config helper functions that automatically normalize arrays or objects rather than manually spreading arrays in configuration extends.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #2489](https://github.com/tj/commander.js/pull/2489#discussion_r2862648643)
- > "One of the features of the config helper is it handles whether the config is an object or an array of objects, and likewise for the `extends`, so removed the spread operator."

## Testing

### Assign the result of a mock method to a variable only if that variable is later used in the test; otherwise, omit the assignment or prefix with an underscore.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-01)
- Evidence: [PR #2463](https://github.com/tj/commander.js/pull/2463#discussion_r2674659768), [PR #2463](https://github.com/tj/commander.js/pull/2463#discussion_r2674659860), [PR #2463](https://github.com/tj/commander.js/pull/2463#discussion_r2674659873)
- > "Unused variable exitSpy."

## Process

### Verify URLs, paths, and references remain correct when refactoring code.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-01)
- Evidence: [PR #2464](https://github.com/tj/commander.js/pull/2464#discussion_r2700230427)
- > "The URL appears to be broken - it's missing "commander." in the path. It should be `https://github.com/tj/commander.js/blob/master/lib/help.js` not `https://github.com/tj/js/blob/master/lib/help.js`."

### Do not modify changelog entries for historical releases; only append new changes.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-06)
- Evidence: [PR #2384](https://github.com/tj/commander.js/pull/2384#discussion_r2172944783)
- > "This is the description of the behaviour in Commander v13, which has not changed. The PR should not be updating the CHANGELOG."

### Do not assume tight coupling between major versions of a tool and its dependency; verify actual compatibility before upgrading.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #2489](https://github.com/tj/commander.js/pull/2489#discussion_r2862653528)
- > "typescript-eslint 8 supports eslint 8, 9, 10. Its version is not locked to the eslint version number."

## Style

### Remove unused imports before committing code.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-01)
- Evidence: [PR #2463](https://github.com/tj/commander.js/pull/2463#discussion_r2674659665), [PR #2463](https://github.com/tj/commander.js/pull/2463#discussion_r2674659706), [PR #2463](https://github.com/tj/commander.js/pull/2463#discussion_r2674659903)
- > "Unused variable describe."

### Ensure JSDoc parameter annotations match the actual order of parameters in the function signature, with access modifiers like @private placed consistently after all parameter tags.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-01)
- Evidence: [PR #2464](https://github.com/tj/commander.js/pull/2464#discussion_r2700230443)
- > "The JSDoc param order doesn't match the actual parameter order in the function signature."

### Group logically related code blocks together when they share the same conditional guard, even if they serve different purposes.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #2405](https://github.com/tj/commander.js/pull/2405#discussion_r2250185470)
- > "Since the conditon is the same, how about not separating them so it is easier to understand?"

### Follow the established date format convention in changelog entries.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-01)
- Evidence: [PR #2474](https://github.com/tj/commander.js/pull/2474#discussion_r2724766934)
- > "Would you like to follow the previous format?"

### Avoid blank lines that break the visual connection between a heading and its immediately following content, unless the blank line serves a clear semantic purpose.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-12)
- Evidence: [PR #2465](https://github.com/tj/commander.js/pull/2465#discussion_r2655824159)
- > "The blank line and `Examples:` may make it seem the example will be of short-ish flags."

### Use parentheses when referring to function calls in documentation to distinguish them from property references.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-12)
- Evidence: [PR #2465](https://github.com/tj/commander.js/pull/2465#discussion_r2655879948)
- > "`createCommand()` is also a method of the `Command` object, and creates a new command rather than a subcommand."

### Apply code formatting to references to command names, file names, and configuration keys in documentation for consistency and clarity.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-12)
- Evidence: [PR #2465](https://github.com/tj/commander.js/pull/2465#discussion_r2655881341)
- > "Side note: I had left out the code formatting in a couple of places you noticed as I thought it might make the link less clear, but looks fine."

## Other

### Include the full list of actual arguments received in error messages, not just the excess or filtered set.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-06)
- Evidence: [PR #2384](https://github.com/tj/commander.js/pull/2384#discussion_r2172946809), [PR #2384](https://github.com/tj/commander.js/pull/2384#discussion_r2173566811)
- > "This looks wrong, and unnecessary. You are comparing the values of the arguments with the names of the arguments? You just want to log all of receivedArgs?"
