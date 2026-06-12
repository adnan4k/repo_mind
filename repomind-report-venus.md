# RepoMind report — level-connections/venus

Primary language: Blade

## Summary

| Metric | Value |
|---|---|
| PRs scanned | 959 |
| Review threads | 797 |
| Reusable lessons extracted | 588 (of 663 candidates) |
| Merged rules | 341 |
| Specificity — team_specific | 140 (24%) |
| Specificity — conventional | 257 (44%) |
| Specificity — generic | 191 (32%) |

> **Phase 0 metric:** 24% of reusable lessons are team-specific.

## Security

### Enforce role-based and ownership-based authorization for all actions that access or modify sensitive data or resources.

- Specificity: **generic** · Confidence: 96%
- Seen in 21 PR(s) from 2 reviewer(s) (2023-11 → 2026-05)
- Evidence: [PR #926](https://github.com/level-connections/venus/pull/926#discussion_r3277523859), [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2981273686), [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2999525497)
- > "other matchmakers should NEVER see sensitive data of other matchmakers users !!!"

### Authorize access to user-specific data using dedicated policy classes and pass the specific model instance to authorization methods.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2024-04 → 2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2487968192), [PR #37](https://github.com/level-connections/venus/pull/37#discussion_r1554964216), [PR #37](https://github.com/level-connections/venus/pull/37#discussion_r1561148928)
- > "Authorize the viewing of referral partner user with ReferralPartnerPolicy"

### Place authorization checks early in policy methods and use the most restrictive check first.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-08 → 2025-11)
- Evidence: [PR #608](https://github.com/level-connections/venus/pull/608#discussion_r2545121069), [PR #400](https://github.com/level-connections/venus/pull/400#discussion_r2263744420)
- > "Cond1: Auth is MatchmakerAdmin or Agent Cond2: InternalNote target user is same matchmaker as me."

### Use the framework's validation system instead of manual checks for input validation.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2981208773)
- > "Use validator"

### Avoid exposing sensitive terms in public URL paths.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-06)
- Evidence: [PR #1020](https://github.com/level-connections/venus/pull/1020#discussion_r3380960385)
- > "lets not have lgbtq in the url as it might cause problems. Have just /l or /quick"

### Conditionally render UI elements based on feature flags or user settings to prevent unauthorized information exposure.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-06)
- Evidence: [PR #1020](https://github.com/level-connections/venus/pull/1020#discussion_r3380889169)
- > "Should be only if $mm->isLgbt(). Please very important Matchmakers who dont have lgbt option, shouldn't ever see theese things."

### Restrict user navigation during critical flows to prevent data integrity issues.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2999577630)
- > "I need to show single idea and not allow users to do anything else otherwise things could get messy"

### Verify that authorization logic matches the intended user story before applying it.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #426](https://github.com/level-connections/venus/pull/426#discussion_r2290111016)
- > "We don't want to allow MatchmakerAgents to impersonate. We want to add impersonate button in the Matchmaker users listing so that a LevelAdmin can impersonate an MMAgent/MMAdmin"

### Keep email recipients in the BCC field when sending to multiple recipients to avoid leaking addresses.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-08)
- Evidence: [PR #101](https://github.com/level-connections/venus/pull/101#discussion_r1712819043)
- > "Yep, except can I keep the "to" outside so I can send it to both member and client. A "to" array would make their emails visible to eachother."

### When comparing database identifiers across different models, ensure the comparison involves the same conceptual entity.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #608](https://github.com/level-connections/venus/pull/608#discussion_r2544772528)
- > "This is comparng matchmaker.id to user.id?"

## Architecture

### Place business logic in dedicated service classes rather than controllers, Livewire components, or views.

- Specificity: **conventional** · Confidence: 94%
- Seen in 16 PR(s) from 2 reviewer(s) (2024-04 → 2026-05)
- Evidence: [PR #971](https://github.com/level-connections/venus/pull/971#discussion_r3277375312), [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2981213165), [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2981215483)
- > "Make a DTO App\Data\UserInvitationData. This DTO can be created both from request and from model."

### Extract repeated inline logic into dedicated, semantic methods or services.

- Specificity: **conventional** · Confidence: 82%
- Seen in 9 PR(s) from 1 reviewer(s) (2025-08 → 2026-06)
- Evidence: [PR #1022](https://github.com/level-connections/venus/pull/1022#discussion_r3380790238), [PR #974](https://github.com/level-connections/venus/pull/974#discussion_r3310290429), [PR #929](https://github.com/level-connections/venus/pull/929#discussion_r3226671690)
- > "#3 is best if getCity() does NOT make any queries or complex operations. This eliminates this hardcoded values, the code should be very clean like $profile->getCity() $profile->getAdditionalLocations() $profile->hasAdditionalLocations() etc. that's the point of having this $profile class there."

### Use typed enums instead of raw strings or booleans for parameters with fixed sets of values.

- Specificity: **conventional** · Confidence: 80%
- Seen in 6 PR(s) from 2 reviewer(s) (2023-11 → 2026-05)
- Evidence: [PR #965](https://github.com/level-connections/venus/pull/965#discussion_r3277395755), [PR #401](https://github.com/level-connections/venus/pull/401#discussion_r2267963840), [PR #401](https://github.com/level-connections/venus/pull/401#discussion_r2267981499)
- > "The point of the enum is so we have strict typing. Use the ?GhlConversationTypeEnum as type."

### Pass presentation-ready data from the controller to the view, avoiding business logic in templates.

- Specificity: **conventional** · Confidence: 75%
- Seen in 6 PR(s) from 1 reviewer(s) (2025-02 → 2026-05)
- Evidence: [PR #927](https://github.com/level-connections/venus/pull/927#discussion_r3258700185), [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2487977755), [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2487981243)
- > "Since we pass the mesasge, the url, we might as well pass the button text from the php, so this is fully clean of business logic"

### Name classes and methods based on abstract concepts, not implementation details.

- Specificity: **generic** · Confidence: 75%
- Seen in 6 PR(s) from 1 reviewer(s) (2025-02 → 2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2981203450), [PR #442](https://github.com/level-connections/venus/pull/442#discussion_r2313773231), [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2301767334)
- > "Rename to MagicLinkController as this could come from WhatsApp or Email or anything"

### Dispatch domain events to signal occurrences; let listeners decide whether to act.

- Specificity: **conventional** · Confidence: 75%
- Seen in 6 PR(s) from 1 reviewer(s) (2025-02 → 2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488044951), [PR #576](https://github.com/level-connections/venus/pull/576#discussion_r2509158970), [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414052094)
- > "Events in general are saying 'something happened'. If you attach a listener to ReferredUserDateCompletedEvent you would expect a different thing. So simply attach the ReferredUserDateCompletedListener to the already existing DateCompletedEvent. Then it's the listener's job to figure out if it should"

### Remove dead code that is superseded by an existing method.

- Specificity: **generic** · Confidence: 76%
- Seen in 5 PR(s) from 2 reviewer(s) (2024-04 → 2026-04)
- Evidence: [PR #868](https://github.com/level-connections/venus/pull/868#discussion_r3168717676), [PR #868](https://github.com/level-connections/venus/pull/868#discussion_r3168718260), [PR #785](https://github.com/level-connections/venus/pull/785#discussion_r2942896094)
- > "No longer needed as we trigger syncIdeas(). remove"

### Encapsulate domain logic in model methods rather than inline in controllers or Livewire components.

- Specificity: **team_specific** · Confidence: 71%
- Seen in 5 PR(s) from 1 reviewer(s) (2025-04 → 2025-09)
- Evidence: [PR #401](https://github.com/level-connections/venus/pull/401#discussion_r2267967107), [PR #442](https://github.com/level-connections/venus/pull/442#discussion_r2313781961), [PR #323](https://github.com/level-connections/venus/pull/323#discussion_r2190685886)
- > "Move this logic in $matchmaker->isManaged() as it will be a common shared logic to use."

### Move domain entity business logic into appropriate service classes.

- Specificity: **conventional** · Confidence: 72%
- Seen in 4 PR(s) from 2 reviewer(s) (2024-03 → 2026-04)
- Evidence: [PR #868](https://github.com/level-connections/venus/pull/868#discussion_r3129468895), [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2304181210), [PR #323](https://github.com/level-connections/venus/pull/323#discussion_r2209524161)
- > "Move to IdeaService"

### Place behavior intrinsic to a class as methods on that class rather than on external services.

- Specificity: **conventional** · Confidence: 67%
- Seen in 4 PR(s) from 1 reviewer(s) (2025-02 → 2026-05)
- Evidence: [PR #971](https://github.com/level-connections/venus/pull/971#discussion_r3288187908), [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356528864), [PR #389](https://github.com/level-connections/venus/pull/389#discussion_r2259914323)
- > "This is a bit out of place. Best to be a method in UserInvitation mail class, also avoid returning arrays 99.99% of the time."

### Extract conditional checks into descriptive helper methods on the model.

- Specificity: **generic** · Confidence: 67%
- Seen in 4 PR(s) from 1 reviewer(s) (2025-08 → 2026-03)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2373442594), [PR #437](https://github.com/level-connections/venus/pull/437#discussion_r2307123266), [PR #781](https://github.com/level-connections/venus/pull/781#discussion_r2904168831)
- > "This can then be @if($sharedClient->isViewOnly())"

### Place filter logic in dedicated traits rather than inline in render methods.

- Specificity: **team_specific** · Confidence: 65%
- Seen in 3 PR(s) from 2 reviewer(s) (2024-03 → 2026-05)
- Evidence: [PR #979](https://github.com/level-connections/venus/pull/979#discussion_r3293234735), [PR #96](https://github.com/level-connections/venus/pull/96#discussion_r1693966966), [PR #28](https://github.com/level-connections/venus/pull/28#discussion_r1532389078)
- > "Also since this is a filter logic it needs to be in the filters trait."

### Extract inline closure validations into dedicated custom validator classes.

- Specificity: **conventional** · Confidence: 60%
- Seen in 3 PR(s) from 1 reviewer(s) (2025-07 → 2026-05)
- Evidence: [PR #930](https://github.com/level-connections/venus/pull/930#discussion_r3221451095), [PR #930](https://github.com/level-connections/venus/pull/930#discussion_r3221476035), [PR #930](https://github.com/level-connections/venus/pull/930#discussion_r3221480309)
- > "move this to a custom validator class"

### Fail loudly with exceptions for precondition violations instead of silently no-oping.

- Specificity: **generic** · Confidence: 60%
- Seen in 3 PR(s) from 1 reviewer(s) (2025-08 → 2025-10)
- Evidence: [PR #401](https://github.com/level-connections/venus/pull/401#discussion_r2267985942), [PR #541](https://github.com/level-connections/venus/pull/541#discussion_r2447073048), [PR #472](https://github.com/level-connections/venus/pull/472#discussion_r2353366711)
- > "I think instead of if not it should throw an exception if .... exists. Then it's up to the caller to ensure either exception is handled or the updateUserIsManagedDatingMode is called only when there are no active ideas."

### Use Eloquent relationship methods instead of separate service calls for related data.

- Specificity: **generic** · Confidence: 60%
- Seen in 3 PR(s) from 1 reviewer(s) (2024-07 → 2026-03)
- Evidence: [PR #776](https://github.com/level-connections/venus/pull/776#discussion_r2918152850), [PR #345](https://github.com/level-connections/venus/pull/345#discussion_r2203514681), [PR #96](https://github.com/level-connections/venus/pull/96#discussion_r1693967345)
- > "Needs to find the ghl custom field by name. Also rename to getCompletionStatusField(MM)

$matchmaker->ghlCustomFields()->whereName('contacts.completion_status')->first()"

### Use named scopes or enums to encapsulate query conditions instead of raw status checks.

- Specificity: **conventional** · Confidence: 60%
- Seen in 3 PR(s) from 1 reviewer(s) (2025-07 → 2026-03)
- Evidence: [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2894592832), [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2894597892), [PR #745](https://github.com/level-connections/venus/pull/745#discussion_r2833373456)
- > "use enum or better yet a scopeActive"

### Define DTOs for structured data and return collections of DTOs from services.

- Specificity: **conventional** · Confidence: 60%
- Seen in 3 PR(s) from 1 reviewer(s) (2025-08 → 2025-10)
- Evidence: [PR #547](https://github.com/level-connections/venus/pull/547#discussion_r2467077329), [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2301761969), [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2307085137)
- > "Please create a DTO for the Event struct in App/Data/Calendar/Event Then the CalendarService should return a colleciton of App/Data/Calendar/Event objects"

### Extract shared method signatures into interfaces when multiple classes implement the same behavior.

- Specificity: **team_specific** · Confidence: 55%
- Seen in 2 PR(s) from 2 reviewer(s) (2024-07 → 2026-05)
- Evidence: [PR #965](https://github.com/level-connections/venus/pull/965#discussion_r3277403006), [PR #82](https://github.com/level-connections/venus/pull/82#discussion_r1667477786)
- > "Since we have this in both classes, add it in MessageModel interface."

### Use separate composable scopes instead of overloading a single scope with optional parameters.

- Specificity: **generic** · Confidence: 55%
- Seen in 2 PR(s) from 2 reviewer(s) (2024-04 → 2026-04)
- Evidence: [PR #868](https://github.com/level-connections/venus/pull/868#discussion_r3129465146), [PR #868](https://github.com/level-connections/venus/pull/868#discussion_r3168745174), [PR #35](https://github.com/level-connections/venus/pull/35#discussion_r1546366143)
- > "if we add this here we need to add ClientDeclinesContinuedDating as well? Check where the ->active() scope is used and if we need a separate scope to exclude these so its ->active()->notDeclined() or something."

### Encapsulate mail content logic in Mail classes rather than in Blade or markdown templates.

- Specificity: **team_specific** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #927](https://github.com/level-connections/venus/pull/927#discussion_r3245059100), [PR #971](https://github.com/level-connections/venus/pull/971#discussion_r3288187908)
- > "Move back to the blade/markdown file please and use the proper Mail class methods to control the mail content."

### Consolidate shared template rendering into partials or components.

- Specificity: **team_specific** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2026-02 → 2026-05)
- Evidence: [PR #927](https://github.com/level-connections/venus/pull/927#discussion_r3258714487), [PR #739](https://github.com/level-connections/venus/pull/739#discussion_r2861263770), [PR #739](https://github.com/level-connections/venus/pull/739#discussion_r2863339097)
- > "This has a lot of duplication with the other 2 invitations. Not sure why we need both editable and user-invitation"

### Standardize controller response patterns with reusable wrapper methods.

- Specificity: **team_specific** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-09 → 2026-05)
- Evidence: [PR #970](https://github.com/level-connections/venus/pull/970#discussion_r3273055391), [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356498085)
- > "We should have a small wrapper for this like successActionResponse( id, message, data) or something like that. Also error.. and validation error wrappers."

### Name routes based on the feature they implement, not the delivery mechanism.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2024-11 → 2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2999509585), [PR #132](https://github.com/level-connections/venus/pull/132#discussion_r1850393882)
- > "Rename route to magic-link, doesn't have to be limited to sms."

### Avoid redundant query scoping when the relationship definition already includes the constraint.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-11 → 2026-04)
- Evidence: [PR #849](https://github.com/level-connections/venus/pull/849#discussion_r3076774615), [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488034137)
- > "since we already have matchmaker_id in tags we don't need this"

### Ensure the return type of relationship methods matches the intended model class.

- Specificity: **generic** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-09 → 2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488031481), [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356509925)
- > "Should point to ReferralPartner::class"

### Define unique constraints based on domain ownership and access model, not all columns.

- Specificity: **team_specific** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-09 → 2026-03)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356478623), [PR #776](https://github.com/level-connections/venus/pull/776#discussion_r2918217600)
- > "The uniqueness should be for [user_id, matchmaker_id]"

### Use firstOrCreate or updateOrCreate instead of manual existence checks.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-09 → 2025-10)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356541338), [PR #531](https://github.com/level-connections/venus/pull/531#discussion_r2433102879)
- > "We could use createOrUpdate, firstOrCreate or something like that."

### Reuse existing shared components instead of duplicating them.

- Specificity: **team_specific** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-09 → 2026-02)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356564768), [PR #708](https://github.com/level-connections/venus/pull/708#discussion_r2764475836)
- > "I'm pretty sure we already have this component somehwere if you search for initials."

### Encapsulate permission checks in model methods instead of using hardcoded strings.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-09 → 2026-03)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2373438661), [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2894605344), [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2894606276)
- > "$sharedClient should have methods like isViewOnly and canIntroduce so that you don't have to check with === everywhere these hardcoded values."

### Use string columns with an enum class for status fields instead of database ENUM types.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #401](https://github.com/level-connections/venus/pull/401#discussion_r2267987149), [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2307102290), [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2307103223)
- > "Change column type to string and default to DatingModeEnum::STANDARD. Enum type is a pain to change later if we need to."

### Return domain model objects from service methods instead of raw arrays.

- Specificity: **generic** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-10 → 2026-03)
- Evidence: [PR #776](https://github.com/level-connections/venus/pull/776#discussion_r2894556819), [PR #776](https://github.com/level-connections/venus/pull/776#discussion_r2894558168), [PR #547](https://github.com/level-connections/venus/pull/547#discussion_r2467077329)
- > "Change to return GhlCustomField model"

### Remove redundant parameters; retrieve related data from the primary domain object.

- Specificity: **generic** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-02 → 2026-03)
- Evidence: [PR #776](https://github.com/level-connections/venus/pull/776#discussion_r2918143236), [PR #174](https://github.com/level-connections/venus/pull/174#discussion_r1950839896)
- > "Pass only $matchmaker (locationId is ->glh_location_id)"

### Use model property casting to automatically cast database values to native types.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-06 → 2026-03)
- Evidence: [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2894621569), [PR #298](https://github.com/level-connections/venus/pull/298#discussion_r2135191287)
- > "Add cast for status => StatusEnum - then you dont need to use ->value"

### Replace hardcoded values with named constants.

- Specificity: **generic** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-04 → 2026-02)
- Evidence: [PR #708](https://github.com/level-connections/venus/pull/708#discussion_r2764435485), [PR #235](https://github.com/level-connections/venus/pull/235#discussion_r2039093682)
- > "Dont use hardcoded values on multiple places. Use const or something"

### Use separate migration scripts to backfill existing rows when adding non-nullable columns with runtime-default values.

- Specificity: **team_specific** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-09 → 2025-11)
- Evidence: [PR #620](https://github.com/level-connections/venus/pull/620#discussion_r2555784213), [PR #472](https://github.com/level-connections/venus/pull/472#discussion_r2353379466)
- > "Because this needs to work with private ideas as well. The default value should be a separate enum value 'NOT_NEEDED'. Then when ideas are created if they are public default should be UNDECIDED, if private it should be 'NOT_NEEDED' or something like that. Another option is to make the field nullable"

### Place service classes in the Services namespace, not the Data namespace.

- Specificity: **team_specific** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-08 → 2025-11)
- Evidence: [PR #585](https://github.com/level-connections/venus/pull/585#discussion_r2513642709), [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2304162061)
- > "App data are DTOs from spatie type: https://spatie.be/docs/laravel-data/v4/introduction"

### Move repeated API call logic into the client class that owns the HTTP communication.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-08 → 2025-09)
- Evidence: [PR #467](https://github.com/level-connections/venus/pull/467#discussion_r2358184787), [PR #414](https://github.com/level-connections/venus/pull/414#discussion_r2281953899), [PR #414](https://github.com/level-connections/venus/pull/414#discussion_r2281955084)
- > "Move this to GHLClient->createSMSReply($conversationId, $message)"

### Extract complex filtering or query logic into dedicated classes.

- Specificity: **team_specific** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-01 → 2025-08)
- Evidence: [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2301782963), [PR #167](https://github.com/level-connections/venus/pull/167#discussion_r1934087252)
- > "Move this method to the new App\Data\Marketing\CampaignRecipientsFilter class."

### Query the database dynamically based on schema rather than hardcoding IDs.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-06)
- Evidence: [PR #1027](https://github.com/level-connections/venus/pull/1027#discussion_r3391226380), [PR #1027](https://github.com/level-connections/venus/pull/1027#discussion_r3391226794)
- > "change to query not hardcoded"

### Ensure each HTTP verb in a multi-verb route serves a distinct semantic purpose.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #927](https://github.com/level-connections/venus/pull/927#discussion_r3258718171)
- > "Why both GET and POST?"

### Make components self-contained by encapsulating their own routing logic.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #971](https://github.com/level-connections/venus/pull/971#discussion_r3288203868)
- > "The invitation-preview-button should understand the routes methods and everything needed for the invitation preview button to work. The caller should only pass user and maybe 'mode' preview/send."

### Hide UI elements for characteristics that do not apply rather than showing fallback values.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #959](https://github.com/level-connections/venus/pull/959#discussion_r3251889049)
- > "For MM->isLgbt() false we shouldn't show any lgbt related questions (even N/A)"

### Avoid duplicating component logic when only a conditional branch differs; use a single component with conditional rendering.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #952](https://github.com/level-connections/venus/pull/952#discussion_r3251897695)
- > "why do we need 2 different components? Lots of duplicated code in them"

### Restrict broad changes to shared code by filtering on a specific flag when behavior is only valid for certain cases.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #924](https://github.com/level-connections/venus/pull/924#discussion_r3221752624)
- > "this is too wide of a change. It will allow for all sharing functionalities to have a matchmaker as a recipient, is that that case? If not then add some flag for the filter and only have it in the specific case where we are sure a matchmaker is a legit recipient."

### Structure filter conditionals to first check the filter, then dispatch to specific queries, falling back to general queries.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #924](https://github.com/level-connections/venus/pull/924#discussion_r3245085960)
- > "if roleFilter
      if matchmaker $query-> otherMatchmakerAdmins(
      if  client $query->client(  ## we  already have the scope
      if member $query->member(  ## we already have the scope
else
     $query->clientOrMember("

### Use enum display methods instead of raw string values when text depends on authenticated user context.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #924](https://github.com/level-connections/venus/pull/924#discussion_r3245094080)
- > "Use GenderEnum->displayName method. It varies depending on if the auth Matchmaker->isLgbt()"

### Avoid duplicating event handlers when a generalized version exists in a parent or shared component.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-04)
- Evidence: [PR #882](https://github.com/level-connections/venus/pull/882#discussion_r3157117994)
- > "We already have a handler for this inside the input components I think. Check how it's implemented on other places. If this one is general, then remove the enter handler from inside the components? Not sure."

### Guard listeners against triggering from internal browsing tools when events should only fire on real messages.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #928](https://github.com/level-connections/venus/pull/928#discussion_r3221569598)
- > "Why would we have a MessageSentListener trigger on mailbook?"

### Place data normalization logic inside the data class rather than in the service layer.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #930](https://github.com/level-connections/venus/pull/930#discussion_r3221491477)
- > "This logic should be inside UserData class"

### Centralize hardcoded session or cache keys in a dedicated service class.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2981224628)
- > "Move to MagicLinkService so that all hardcoded keys are there"

### Extract session-checking logic into a dedicated service method instead of inlining in middleware.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2981230589)
- > "Move to MagicLinkService -> isAuthenticated()"

### Check that a required integration or feature is enabled before using its services.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2981273164)
- > "Needs a check if the matchmaker has GHL integration and SMS is enabled"

### Extract methods with a single, clear responsibility.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2999515247)
- > "rename to login(), remove Idea $idea parameter, extract the idea logic in another method to put in session."

### Avoid middleware that blocks authenticated users from accessing expected functionality via alternative paths.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2999576421)
- > "This may prevent users from their pages if they are logged in but click on a magic link."

### Centralize identical render calls to prevent inconsistency.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-01)
- Evidence: [PR #676](https://github.com/level-connections/venus/pull/676#discussion_r2672915812)
- > "This view is called twice, can we do it in one place?"

### Keep UI-related decision logic in the view layer when the toggle is used solely for rendering.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-04)
- Evidence: [PR #877](https://github.com/level-connections/venus/pull/877#discussion_r3153859642)
- > "We are using the decision/toggle to show different UI to different users. so that is why we are not using that in this function. To your point of moving these UI message to getPreviewMessageAttribute(), i think it should stay in the View file because its single View component used and most of these "

### Prefer storing scalar identifiers over full objects in component state when only the id is needed.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-04)
- Evidence: [PR #890](https://github.com/level-connections/venus/pull/890#discussion_r3154662425)
- > "Do we only use this for the ->id? Are we passing the id when calling this component in all places?"

### Use Laravel's date casting and Carbon's built-in methods for derived properties like age.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-04)
- Evidence: [PR #835](https://github.com/level-connections/venus/pull/835#discussion_r3048181533)
- > "$user->birthdate is already cast to carbon in the User model ... So this can be $user->birthdate?->age ?? 'N/A"

### Inject the specific domain model rather than a generic user when the component operates on a specific relationship.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2487970809), [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488016170), [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488024390)
- > "Should work with ReferralPartner $referralPartner then $referralPartner->getPrimaryUser() so it's similar to Matchmaker"

### Use the existing entity instead of creating a separate branch when behavior mirrors an existing one.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2487994924)
- > "Use the existing ReferralPartner, I think there is a mixup."

### Define validation rules in a dedicated rules() method on Livewire components.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488010684)
- > "Move to rules method https://livewire.laravel.com/docs/3.x/validation#defining-a-rules-method"

### Use existing shared traits for standard table filter functionality.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488019944)
- > "Use the DataTableUserFilters trait."

### Ensure a related record exists before updating it, or create it as part of the update flow.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488027382), [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488028773)
- > "We need to ensure ReferralPartner record is created"

### Place model relationships on the model that owns the foreign key.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488030631)
- > "This should be a relation on the ReferralPartner model"

### Create direct foreign keys between related entities instead of traversing intermediate relationships.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488036174)
- > "There should be a direct link from $referralPartner to matchmaker. Add matchmaker_id column if it's missing."

### Avoid querying the database inside Blade views; resolve data in the controller or view composer.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488047976)
- > "same"

### Name database tables to reflect broadest reuse across contexts.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356469514)
- > "Change to shared_users as we can reuse this functionality for members and applicants as well."

### Remove database columns with no clear requirement.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356475730)
- > "I don't think we need the message_id we can discuss."

### Make component properties optional when they have sensible defaults.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356486471)
- > "ideaId shouldn't be passed. It should be made optional in the StartThreadButton livewire component"

### Let the caller determine navigation behavior; do not make a component aware of its call site.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356508033)
- > "In general livewire components shouldn't know where are they called from. To reverse the responsibility it can be changed to redirectTo/redirectRoute parameter as in other components."

### Pass configuration parameters to a service, not caller-page flags to a component.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356521345)
- > "Livewire component shouldn't be aware of the caller page. It should be a different parameter that configures a certain functionality of the InboxService."

### Do not throw an exception for an idempotent, already-successful operation; return the existing result.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356539665)
- > "I don't think we should throw an exception because the operation is pretty much successful in this case."

### Pass the specific model instance instead of extracting its attributes.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356558094)
- > "You can just pass sharedClient"

### Design Livewire components to represent a single entity instance.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #437](https://github.com/level-connections/venus/pull/437#discussion_r2307134788)
- > "The livewire component should be for 1 user. Then in the in idea/show.blade we should have 2 instances of this component, 1 for each user."

### Place related side effects inside the method that handles the primary logic.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #401](https://github.com/level-connections/venus/pull/401#discussion_r2267970287)
- > "This logic should be inside the AccountService->createUserReferredByMatchmaker and createUserReferredByReferralPartner calls"

### Enforce email sending policies at the notification service layer, not by intercepting at the event level.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #401](https://github.com/level-connections/venus/pull/401#discussion_r2267977835)
- > "This should be done by some Notification/Email Service that decides when/what to send based on the context."

### Place controllers in namespaces that reflect the user role or access level.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #358](https://github.com/level-connections/venus/pull/358#discussion_r2221978543)
- > "Admin namespace is for SuperAdmin users. This Leads page is for MatchmakerAdmins similar to Client/Member/Applicants. So move to App\Http\Controllers\Matchmaker namespace."

### Prefer negation flags when the default state should exclude records from a view.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #358](https://github.com/level-connections/venus/pull/358#discussion_r2223997341)
- > "I would only suggest to be the opposite flag. is_dismissed_lead and where is_dismissed_lead = 0. The reason is that this way we don't have to raise the flag up depending on the wants_to_be_client choice. Because if we have an applicant and they dont want to be client, but the is_lead=1 in the databa"

### Override hook methods rather than entire lifecycle methods to preserve parent behavior.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #350](https://github.com/level-connections/venus/pull/350#discussion_r2217458849)
- > "The finishUpload method dispatches upload:finished -> calls startSaving -> dispatches saving:started -> calls saveMedia. all code can be moved in saveMedia so we don't override finishUpload."

### Keep conversion logic focused on conversion; handle I/O separately.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #350](https://github.com/level-connections/venus/pull/350#discussion_r2217459356)
- > "and return $jpegBlob. So that this function only converts heic to jpeg in blobs. The file saving should be handled outside of this function so we keep methods small and reusable."

### Place user-facing validation messages in the rule definition, not the view.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #795](https://github.com/level-connections/venus/pull/795#discussion_r2965112460)
- > "The message should come from the validation rule, not sure why its here?"

### Make validation errors dynamically attach to field keys for generic frontend handling.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #795](https://github.com/level-connections/venus/pull/795#discussion_r2978439817)
- > "Can this be dynamic and added as error to the $field key, so that we don't need the @unless statement in the general validation, but instead it works like any other rule"

### Ensure multi-step upload workflows reuse previously stored media IDs.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #812](https://github.com/level-connections/venus/pull/812#discussion_r2998198042)
- > "we are first uploading the forms and then sending the media ids again in the full submission which is saving photo ids twice and they are wrong as well and that is why the images are not showing up"

### Separate concerns like highest answer index and first incomplete index into distinct logic.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #787](https://github.com/level-connections/venus/pull/787#discussion_r2942792292)
- > "Why only for $currentPart === 1 ? I dont get the difference between getting what has answers and the first that is not completed."

### Use model accessors and computed properties instead of mapping to arrays.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #776](https://github.com/level-connections/venus/pull/776#discussion_r2918009571)
- > "Remove map, use User objects. We have $user->fullName()"

### Return a collection from methods that fetch multiple items, not a single nullable object.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #776](https://github.com/level-connections/venus/pull/776#discussion_r2918131974)
- > "rename to getAllForMatchmaker(...) and return a collection of GhlCustomField objects"

### When persisting optional external data, persist all available fields.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #776](https://github.com/level-connections/venus/pull/776#discussion_r2918163155)
- > "Change to persist all"

### Pass only the new value to a mutation method; let the method resolve the current state.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #776](https://github.com/level-connections/venus/pull/776#discussion_r2918190380)
- > "remove oldStatus,newStatus - only have 1 status OR get the current status from the User."

### Verify foreign key cascades before relying on them; delete related records explicitly if absent.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #784](https://github.com/level-connections/venus/pull/784#discussion_r2917851932)
- > "we need to delete proposals too I think, maybe there was ondelete cascade I dont remember"

### Use named routes to generate URLs instead of generic model methods.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #784](https://github.com/level-connections/venus/pull/784#discussion_r2917864244)
- > "Needs to go to profile-view !!! getRoute('profile-view')"

### Use a plain PHP class instead of a Livewire component when no lifecycle or state is needed.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2889480655)
- > "Actually this component doesnt have any actions so it shouldnt be a livewire component"

### Centralize authorization checks in policies rather than inline in services.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2894606276), [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2908384366)
- > "better with SpotlightPolicy 'canRenew' as it can be reused on the frontend to show/not show the button"

### Pass explicit parameters to methods instead of extracting them from objects internally.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #756](https://github.com/level-connections/venus/pull/756#discussion_r2847370631)
- > "best to pass 4 params, as this is very magical way of doing an update"

### Explicitly exclude items from related sets when querying for items not in a set.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #764](https://github.com/level-connections/venus/pull/764#discussion_r2859358092)
- > "Add a parameter here $excludeMatchmakerId and pass the current matchmaker, since those will be in the private network."

### Use dispatch notify instead of session flash messages for Livewire notifications.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #745](https://github.com/level-connections/venus/pull/745#discussion_r2833335611)
- > "Use dispatch notify instead of sessions. Search for 'notify' in other livewire components"

### Encapsulate behavior within a component to avoid external dependencies.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #745](https://github.com/level-connections/venus/pull/745#discussion_r2833359150)
- > "the multiSelect function should be in this component so there isn't an external dependancy. You can check if function is defined so it can be reused when multiple component usages."

### Encapsulate commonly reused data lookups in a dedicated service with caching.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #745](https://github.com/level-connections/venus/pull/745#discussion_r2833382289)
- > "move to a QuestionChoicesService::getChoices($label) and cache the results for a week"

### Compute derived fields at write time rather than read time, and backfill existing records.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #733](https://github.com/level-connections/venus/pull/733#discussion_r2814029640)
- > "The admin_fee should be corrected before its inserted in the database. Find all the places referral_fee is inserted and calculate the admin_fee there. Make a console script that backfills the activity records with the 10% fee. Then revert the query changes."

### Use existing domain model methods for determining role names instead of duplicating logic.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #708](https://github.com/level-connections/venus/pull/708#discussion_r2764450616)
- > "Use the User model public function getRoleName(): string method instead, add the matchmaker option there."

### Ensure conditionally-rendered UI components are gated by correct authorization checks.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #620](https://github.com/level-connections/venus/pull/620#discussion_r2555756778)
- > "We are showing it only for public ideas and when matchamaker is not of the current user"

### Ensure methods check visibility or that callers are constrained to the correct context for access logic.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #620](https://github.com/level-connections/venus/pull/620#discussion_r2555762409)
- > "This should work with private ideas as well. Or you should only call this when it's a public idea. Otherwise private ideas will require the matchmaker to grant themeself access."

### Derive service-specific data from domain models rather than coupling events to external logic.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #576](https://github.com/level-connections/venus/pull/576#discussion_r2509148139)
- > "This event should not be coupled with any GHL logic. The user type can be got from the $user object."

### Prefer dedicated service methods to create related models rather than calling relationship methods directly.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #545](https://github.com/level-connections/venus/pull/545#discussion_r2451840198)
- > "Should be a service method create. if !$idea->configuration -> create"

### Handle all possible parent entity types in polymorphic relationships.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #531](https://github.com/level-connections/venus/pull/531#discussion_r2433101572)
- > "The reply can be both on a thread and on user_messages. We will need to handle both cases."

### Keep event classes focused on data; move business logic to listeners.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414052094), [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414057508)
- > "This matchmakerToNotify logic should be in the listener."

### Use client-side interactivity or navigation instead of Livewire actions for simple UI toggles.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #511](https://github.com/level-connections/venus/pull/511#discussion_r2409773139)
- > "Use alpine.js for this or simply link to user account and show only the last 3 statuses."

### Ensure feature flag resolution depends on the relevant database value and clear cache after update.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #533](https://github.com/level-connections/venus/pull/533#discussion_r2435580218)
- > "So add the logic in And modify the App\Features\EmailMarketing to resolved by returning true/false based on->marketing_tab. You need to update the value in the database by activate/deactivate as well, to clear the cache."

### Prefix custom accessor methods to avoid collisions with Eloquent attributes.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #513](https://github.com/level-connections/venus/pull/513#discussion_r2409834767)
- > "Add signature prefix"

### Extract shared message signature logic into a trait.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #513](https://github.com/level-connections/venus/pull/513#discussion_r2409844733)
- > "Move to trait HasSignature"

### Fix the root cause in the event listener instead of duplicating its logic.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #489](https://github.com/level-connections/venus/pull/489#discussion_r2387108506)
- > "Check the MessageCreatedListener and see why it's not working as expected. Then remove this."

### Use strongly-typed DTOs to encapsulate input parameters instead of raw arrays.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #472](https://github.com/level-connections/venus/pull/472#discussion_r2353371008)
- > "Best to move to a spatie DTO in App\Data\MatchmakerData. But not a big deal for now."

### Avoid hardcoding database IDs in views; reference data by stable logical identifiers.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #472](https://github.com/level-connections/venus/pull/472#discussion_r2353377463)
- > "810 wont work on staging/live. You need to find the question from label or smth. Also move to backend logic (Controller/Service for example FormService::getLocationChoices())"

### When soft-deleting referenced records, update queries to include trashed records.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #472](https://github.com/level-connections/venus/pull/472#discussion_r2355123943)
- > "This will make all user->getMatchmaker() calls to return null and break in places where we show the matchmaker of the user for example date activity and profile match tab when it's a public level network idea. In those places ->withTrashed needs to be added."

### Choose database column types that support intended operations like arithmetic.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #472](https://github.com/level-connections/venus/pull/472#discussion_r2355126610)
- > "This needs to be number, so we can make math operations with it later on."

### Store user-level attributes on the users table, not a related table.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #469](https://github.com/level-connections/venus/pull/469#discussion_r2356652037)
- > "The title should be on the users table. As each agent will have a different title."

### Place form fields in the settings section most relevant to their domain entity.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #469](https://github.com/level-connections/venus/pull/469#discussion_r2356654767)
- > "Should be in User or Agent settings"

### Avoid introducing complex UI components when simpler controls suffice.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #469](https://github.com/level-connections/venus/pull/469#discussion_r2356658424)
- > "I don't think we need an editor here."

### Do not remove presentation transformations from stored content without verifying need.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #469](https://github.com/level-connections/venus/pull/469#discussion_r2356659827)
- > "This will break old messages I think. And again I don't think we need the editor here."

### Attach uploaded media to the correct model entity.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #468](https://github.com/level-connections/venus/pull/468#discussion_r2339008412)
- > "The media needs to be attached to the campaign not the user."

### Use file names reflecting semantic purpose, not ordering numbers.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2301767334)
- > "Rename to setup-step.blade.php (number could change in the future)"

### Split multi-step forms into separate Livewire components per step.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2301805006)
- > "Split this wizard into 4 different livewire components. One for each step. Try to implement https://spatie.be/docs/laravel-livewire-wizard/v2/introduction so its separated in a clean way with a Wizard component and a step component for each step."

### Avoid using DTOs as property types in Livewire components.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2304172558)
- > "When I change it, I get this error.... Property type not supported in Livewire."

### Prefer factory methods over manual array assembly when creating DTOs from models.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2307089540)
- > "You can simply pass $campaign to CampaignRecipientsFilterData::from($campaign)"

### Only pass route parameters actually needed by the route.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #430](https://github.com/level-connections/venus/pull/430#discussion_r2293034340)
- > "Why is this passed to the route?"

### Guard authorization-checking methods should also verify prerequisite state.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #430](https://github.com/level-connections/venus/pull/430#discussion_r2293039596)
- > "This should be && $this->hasActiveCancelRequests() I think"

### Place job classes in subdirectories named after their domain.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #414](https://github.com/level-connections/venus/pull/414#discussion_r2281938776)
- > "These should be in a GHL directory. SyncClientsJob in Jobs is too vague. Please move to App\Jobs\Ghl\..."

### Use typed public properties with Livewire's model binding instead of separate scalar properties.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #414](https://github.com/level-connections/venus/pull/414#discussion_r2281964336)
- > "Can combine these in public User $primaryUser"

### Do not store derived or universally constant data in migrations; use relationships.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #414](https://github.com/level-connections/venus/pull/414#discussion_r2281975390)
- > "The company id will always be one and the same for all. The ghl_location_id can be taken from the ghl_tokens table. and defined as HasOne relation in the Matchmaker Model. So we don't need these columns here."

### Add all corresponding parallel fields for multiple entities at the same time.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #393](https://github.com/level-connections/venus/pull/393#discussion_r2263766356)
- > "So let's add first_date_location, first_date_address, second_date_location and second_date_address."

### Use a validation library to centralize input validation instead of manual rules in components.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #393](https://github.com/level-connections/venus/pull/393#discussion_r2263776224)
- > "Validation can be handled with https://spatie.be/docs/laravel-data/v4/validation/introduction"

### Use previous status from state history instead of hardcoded constants when transitioning.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #395](https://github.com/level-connections/venus/pull/395#discussion_r2265279330)
- > "This won't work for 2nd date. Maybe you can transition to $idea->prevStatusTransition->ideaStatus ?"

### Prefer parameterized methods over separate methods for similar roles in authorization.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #385](https://github.com/level-connections/venus/pull/385#discussion_r2251353046)
- > "add a parameter to userIsMatchmakerAdminOf(...... bool $includeAgent = false) and if $includeAgent is true then simply add to $user->hasRole([RoleEnum::MacthmakerAdmin, RoleEnum::MatchmakerAgent])"

### Use polymorphic relationships when associating with generic shared resources like media.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-04)
- Evidence: [PR #235](https://github.com/level-connections/venus/pull/235#discussion_r2039092258)
- > "This needs to be morph to or somehting similar, so that it takes into account model_type as well. Also needs a where statement for media collection."

### Update all related references when renaming UI components or conditions.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-03)
- Evidence: [PR #213](https://github.com/level-connections/venus/pull/213#discussion_r2000226903)
- > "This should still be `identifiesMale()`, or `imembers.idea.idea-actions-male` should become `idea-actions-client`, as client may be female, but the forms are gender based."

### Accept optional context parameters in methods and pass them to specific queries with conditional constraints.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-03)
- Evidence: [PR #191](https://github.com/level-connections/venus/pull/191#discussion_r1981522096)
- > "Keep the getAgentTake(..) method but add $matchmakerId = null inside getInternalDataValue() as second parameter. Then inside getInternalDataValue add ->when($matchakerId){ ->where('matchmaker_id',$matchmakerId) }"

### Use query builder's when() method to conditionally apply filters.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-03)
- Evidence: [PR #191](https://github.com/level-connections/venus/pull/191#discussion_r1981522096)
- > "Then inside getInternalDataValue add ->when($matchakerId){ ->where('matchmaker_id',$matchmakerId) }"

### Avoid parameterizing a value that is always constant within a component.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-03)
- Evidence: [PR #191](https://github.com/level-connections/venus/pull/191#discussion_r1981685456)
- > "Key is always going to be 'agent-take' for this component, so no need to pass it as parameter."

### Define separate named Eloquent relationship methods for each variant.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #174](https://github.com/level-connections/venus/pull/174#discussion_r1950847670)
- > "I think it's better to have 2 methods firstDateNote and secondDateNote so that we can use these relations in ->with() statements and have the ability to lazy load them as well."

### Place foreign key columns near the beginning and add composite indexes for searched columns.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #174](https://github.com/level-connections/venus/pull/174#discussion_r1950851204)
- > "Can you please move idea_id after or before matchmaker_user_id. Add combined index for idea_id and date_number."

### Avoid declaring properties that duplicate data already available in the view context.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #174](https://github.com/level-connections/venus/pull/174#discussion_r1952571916)
- > "All properties are automatically passed to the view, ['disabled.. is unnecessary"

### Prefer fixing the root cause of null values instead of using optional chaining.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #175](https://github.com/level-connections/venus/pull/175#discussion_r1950825340)
- > "$matchuserMatchmaker should never be null. We need to fix the case when it's null instead."

### Use array_column on enum cases to derive value arrays dynamically.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #173](https://github.com/level-connections/venus/pull/173#discussion_r1938499129)
- > "Can be replaced with array_column(App\Enums\ReferralTypeEnum::cases(),'value') so it doesn't require changes when a case is added."

### Avoid unnecessary abstraction when a single concrete implementation suffices.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #173](https://github.com/level-connections/venus/pull/173#discussion_r1938499685)
- > "The sendRemindersFor method is unnecessary here because there's only one mailClass. You can move all the logic from below in handle"

### Do not add new enum cases for states represented by existing cases combined with other fields.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-01)
- Evidence: [PR #153](https://github.com/level-connections/venus/pull/153#discussion_r1920249615)
- > "I know it's a bit confusing but we don't have Applicant role. An applicant in the database is a Member that isn't onboarded yet."

### Consolidate duplicated logic into a shared method with consistent return type.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-12)
- Evidence: [PR #140](https://github.com/level-connections/venus/pull/140#discussion_r1897475909)
- > "I have done something similar with the static `yesNoMaybeText` method in the same file, maybe we can consolidate."

### Prefer json column type over text for structured survey data.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-06)
- Evidence: [PR #74](https://github.com/level-connections/venus/pull/74#discussion_r1642851497)
- > "Any reason you didn't choose `json` as the data type?"

### Avoid using $this in Eloquent relationship queries resolved in bulk.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-06)
- Evidence: [PR #65](https://github.com/level-connections/venus/pull/65#discussion_r1633534376), [PR #65](https://github.com/level-connections/venus/pull/65#discussion_r1633534789)
- > "Doesn't work in bulk queries where $this is not an object like ->with, ->whereHas, ->whereDoesntHave etc"

### Resolve data duplication before hardcoding identifiers referencing duplicates.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-06)
- Evidence: [PR #65](https://github.com/level-connections/venus/pull/65#discussion_r1633551884)
- > "I created LVL-115 to handle this de-duplication"

### Use domain enum values rather than arbitrary sort-order integers for state membership.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-06)
- Evidence: [PR #69](https://github.com/level-connections/venus/pull/69#discussion_r1633497361)
- > "I think we should definitely use an enum instead if you stick with sort order"

### Avoid using public_path() for assets served from cloud storage in serverless environments.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-05)
- Evidence: [PR #56](https://github.com/level-connections/venus/pull/56#discussion_r1616445714)
- > "In Laravel Vapor, the static assets are pushed out to S3 and served via cloudfront. I'm not sure how `public_path()` will function. ... If you feel okay creating this class in the `app/Http/Responses` directory, then just return `new TransparentPixelResponse()` from this controller action, we will b"

### Dependency inject services in the constructor rather than instantiating them inside methods.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #46](https://github.com/level-connections/venus/pull/46#discussion_r1580313738)
- > "You could always dependency inject this in the constructor for the class. Ideally we follow that pattern in the case the IdeaService has a dependency added to its constructor."

### Use addAdditionalSelects to include hidden columns for internal logic without exposing them.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #42](https://github.com/level-connections/venus/pull/42#discussion_r1568883442)
- > "Just a reminder that you can always use the recently discovered function `addAdditionalSelects`"

### Prefer storing fields in the same table for one-to-one relationships.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #38](https://github.com/level-connections/venus/pull/38#discussion_r1561522967)
- > "As per our conversation, as this is a 1:1 relationship with `forms`, can these fields be moved into the `forms` table?"

### Remove unused policy methods.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #38](https://github.com/level-connections/venus/pull/38#discussion_r1561535915)
- > "Removing the policy."

### Replace blocking operations like sleep() with queued jobs that can retry.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #38](https://github.com/level-connections/venus/pull/38#discussion_r1561539131)
- > "Implemented it as a queued job instead. It will retry if it fails every 20s for the next 20 minutes."

### Preserve original error handling semantics when replacing findOrFail calls.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #38](https://github.com/level-connections/venus/pull/38#discussion_r1561546255)
- > "I've removed the `orFail` intentionally because it does an abort(404) instead of throwing an exception. It wasn't being caught int the catch block."

### Ensure nullable form fields can be explicitly cleared by the user.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #39](https://github.com/level-connections/venus/pull/39#discussion_r1566001973)
- > "Not a big deal, but if a note is set, and the matchmaker intends to delete the note, they won't be able to delete it"

### Prefer custom lock mechanisms for debouncing expensive jobs over unique jobs to ensure final state processing.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #40](https://github.com/level-connections/venus/pull/40#discussion_r1566017804)
- > "If I use unique jobs then: Job 1 created at 00:00 waits until 01:00 Job 2 created at 00:40 checks unique and drops. Job 1 dispatches at 01:00 ... But with the lock I implemented it cancels the old job instead so: ... Job 3 dispatches at 02:20"

### Ensure status transitions are applied consistently across related operations.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #37](https://github.com/level-connections/venus/pull/37#discussion_r1554965699)
- > "I think we should $this->transitionUserStatusTo($user, UserStatusEnum::PreScreeningDenied) as well here?"

### Use the authenticated user's own relationship instead of a default model when pivoted.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #35](https://github.com/level-connections/venus/pull/35#discussion_r1546356531)
- > "Wrote this before there was a matchmaker id pivot in the roles table"

### Use a dedicated return object instead of an associative array for complex API responses.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #35](https://github.com/level-connections/venus/pull/35#discussion_r1546380536)
- > "I also do think we should refactor this to use a return object instead of an array. Maybe I can write that into the idea generation ticket."

### Avoid binding request-context-dependent services in the container when resolved outside HTTP context.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-03)
- Evidence: [PR #31](https://github.com/level-connections/venus/pull/31#discussion_r1543224904)
- > "It will throw "Invalid context when resolving ReferralService" in this case, so it will need to implement the context or simply crate the instance on the spot."

### Rename email classes and views to reflect their actual purpose when reused.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-03)
- Evidence: [PR #27](https://github.com/level-connections/venus/pull/27#discussion_r1532225739)
- > "Because this email is getting reused, let's rename it to something more generic like "NewMatchmakerUserEmail""

### Hide upload controls when maximum items are reached.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-03)
- Evidence: [PR #22](https://github.com/level-connections/venus/pull/22#discussion_r1523702042)
- > "Let's hide this if the user has 5 or more profile pictures"

### Place related page sections in logical order matching user expectations.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-03)
- Evidence: [PR #22](https://github.com/level-connections/venus/pull/22#discussion_r1523702918)
- > "Please move this below the `profile.update-user-information-form`"

### Replace foreign key constraints with indexes when enforcement is unnecessary.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2023-07)
- Evidence: [PR #8](https://github.com/level-connections/venus/pull/8#discussion_r1262593647)
- > "Are you cool if we don't do foreign key constraints?"

### Use enum values instead of hardcoded strings for constant values.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356572417)
- > "Should be using enum values instead of hardcoded 'view_only' and 'can_introduce'."

### Extract business logic constants and calculations into dedicated services or configuration.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #974](https://github.com/level-connections/venus/pull/974#discussion_r3310290429)
- > "hardcoded falue 0.1. The ReportsDashboard should be for reports logic. This should be handled in a some of the services and it should use the same constant or configuration so there is only 1 place where we adjust the 10% admin fee."

### Use domain-specific type hints in Livewire components for implicit model binding.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488016170)
- > "Change to ReferralPartner $referralPartner and work from there."

### Avoid duplicating authorization logic; extract into a shared service.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356556035)
- > "Same here in ShareUserService"

## Performance

### Add database indexes on foreign key columns and columns used in WHERE or JOIN clauses to improve query performance.

- Specificity: **conventional** · Confidence: 87%
- Seen in 9 PR(s) from 2 reviewer(s) (2024-03 → 2026-04)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356465354), [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356481106), [PR #844](https://github.com/level-connections/venus/pull/844#discussion_r3064420276)
- > "Add index for matchmaker_id as we will be using it on every query."

### Eager-load relationships instead of relying on lazy loading or N+1 queries inside loops.

- Specificity: **conventional** · Confidence: 72%
- Seen in 4 PR(s) from 2 reviewer(s) (2024-08 → 2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488047600), [PR #532](https://github.com/level-connections/venus/pull/532#discussion_r2433082532), [PR #248](https://github.com/level-connections/venus/pull/248#discussion_r2066830883)
- > "Add a relation User->referredByReferralPartner->getName() so that referredByReferralPartner can be eager loaded with ->with('...')"

### Cache infrequently changed, frequently accessed data and reuse it within a request or across requests.

- Specificity: **generic** · Confidence: 72%
- Seen in 4 PR(s) from 2 reviewer(s) (2024-04 → 2026-02)
- Evidence: [PR #739](https://github.com/level-connections/venus/pull/739#discussion_r2861254141), [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414107253), [PR #230](https://github.com/level-connections/venus/pull/230#discussion_r2022395640)
- > "We now have QuestionChoicesService - getChoices() - please check and use. Its cached and now using question_choices table."

### Use direct column or foreign key access instead of loading full related objects or using expensive repository methods when only a single value is needed.

- Specificity: **conventional** · Confidence: 60%
- Seen in 3 PR(s) from 1 reviewer(s) (2025-07 → 2026-06)
- Evidence: [PR #1022](https://github.com/level-connections/venus/pull/1022#discussion_r3380812957), [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414104448), [PR #345](https://github.com/level-connections/venus/pull/345#discussion_r2203515472)
- > "the getUserProfile() is a super big operation if there is a cache miss. We have direct $user->city column."

### Avoid re-querying the same model instance or performing redundant database queries by reusing local variables or properties.

- Specificity: **generic** · Confidence: 60%
- Seen in 3 PR(s) from 1 reviewer(s) (2025-04 → 2025-12)
- Evidence: [PR #642](https://github.com/level-connections/venus/pull/642#discussion_r2581683891), [PR #248](https://github.com/level-connections/venus/pull/248#discussion_r2066813770), [PR #250](https://github.com/level-connections/venus/pull/250#discussion_r2063746543)
- > "Switch to return $this-?->password. If you nead to refresh the user data, there is eloquent model fresh or refresh, you can check the difference. So you can use something like $user->fresh()->isPasswordEmpty()"

### Avoid loading all records when only a subset is needed; use pagination, lazy loading, or filters.

- Specificity: **generic** · Confidence: 55%
- Seen in 2 PR(s) from 2 reviewer(s) (2024-04 → 2026-02)
- Evidence: [PR #708](https://github.com/level-connections/venus/pull/708#discussion_r2764442898), [PR #708](https://github.com/level-connections/venus/pull/708#discussion_r2768427206), [PR #41](https://github.com/level-connections/venus/pull/41#discussion_r1574884798)
- > "This will load all users from the database???"

### Perform early returns or bail conditions to avoid unnecessary queries or operations.

- Specificity: **generic** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-08 → 2026-05)
- Evidence: [PR #979](https://github.com/level-connections/venus/pull/979#discussion_r3293234735), [PR #395](https://github.com/level-connections/venus/pull/395#discussion_r2265276518)
- > "Why send a query to the database that will return false. This is unnecessary hacking."

### Prefer batch operations over individual iterations for the same action on multiple records.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-03)
- Evidence: [PR #189](https://github.com/level-connections/venus/pull/189#discussion_r1976477304)
- > "A little optimization would be to add a where clause for the idea_status_id on the query, and then you would delete all that match, instead of deleting one by one."

### Avoid performing expensive operations when the data is not needed for the current code path.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2487966589)
- > "We don't need the profile here. It is very heavy loading, we only use it for Client/Member/Applicant in some cases. Just $user is fine"

### Use streams or in-memory operations instead of creating intermediate files from remote storage content.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #350](https://github.com/level-connections/venus/pull/350#discussion_r2217459155)
- > "No need for saving another file here."

### Return a single transfer object instead of separate methods when multiple values are computed from the same expensive data.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #345](https://github.com/level-connections/venus/pull/345#discussion_r2203515900)
- > "Combine into one method maybe, to avoid double queries from hasClientApprovedContinueDating() and hasMember..."

### Initialize computed properties at declaration or in mount instead of using getter methods that may perform extra calls.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-12)
- Evidence: [PR #655](https://github.com/level-connections/venus/pull/655#discussion_r2605606436)
- > "Better for these to be simple properties at the top, either initialized on the declaration or in mount. I'm worried this getters will make extra calls."

### Denormalize frequently-queried foreign key relationships to avoid expensive subqueries.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #926](https://github.com/level-connections/venus/pull/926#discussion_r3221701590)
- > "Maybe add a new column to ideas.member_matchmaker_id - this will save the first query. Also this is long due, can be reused in many places as a speed optimization."

### Introduce a timestamp column updated on relevant writes to replace costly multi-table joins with a simple indexed sort.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #926](https://github.com/level-connections/venus/pull/926#discussion_r3221701590)
- > "I think it's best to add idea.last_status_transition_at timestamp, and whenever idea status transition is created ->touch('last_status_transition_at')"

### Avoid triggering unnecessary side effects by separating state updates from save operations.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #731](https://github.com/level-connections/venus/pull/731#discussion_r2814087949)
- > "I think it's best if this method doesn't do $idea->save() and is called before the scoring so that we dont trigger extra jobs for meilisearch updates."

### Perform purely client-side operations on the frontend instead of unnecessary backend calls.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #708](https://github.com/level-connections/venus/pull/708#discussion_r2764425041)
- > "There is no need for this method to hit the backend. The shareUrl is already on the frontend. Please remove and do it with js only."

### Prefer direct database queries over ORM chaining when fetching a known set of values.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #740](https://github.com/level-connections/venus/pull/740#discussion_r2827841241)
- > "We should be looking only at the question_choices table and get directly from there. Much faster and cleaner"

### Minimize database queries in Blade templates by moving logic to Livewire components or computed properties.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #395](https://github.com/level-connections/venus/pull/395#discussion_r2265280301)
- > "Avoid making queries in blades, move logic to Livewire component. Use similar $canApproveReopenDate = $idea->canApproveReopenDate() in the backend."

### Move caching to a shared method so its benefit is available to all callers.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-03)
- Evidence: [PR #191](https://github.com/level-connections/venus/pull/191#discussion_r1981702786)
- > "only showModal[$key] is needed. Not all keys."

### When performing a search only to retrieve facets, limit returned results to zero to reduce data transfer.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-12)
- Evidence: [PR #140](https://github.com/level-connections/venus/pull/140#discussion_r1897473164)
- > "and because we only care about the facets, we don't want any results, so I added this `->take(0)` as an optimization."

### Optimize database queries early for filtering and deduplication when generating candidate pairs at scale.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #35](https://github.com/level-connections/venus/pull/35#discussion_r1546396482)
- > "We'll have to optimize this query quite a bit. Both as we'll want to identify matches that are filtered by city, and as we'll want to filter for existing idea pairs."

### Extract repeated modal components into reusable Livewire components to reduce re-renders.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #358](https://github.com/level-connections/venus/pull/358#discussion_r2224004104)
- > "Can we reuse the CreateInternalNote livewire component here? Maybe with a boolean for showing the task link."

### Use existing cached services instead of duplicating database queries when retrieving question choices.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-03)
- Evidence: [PR #191](https://github.com/level-connections/venus/pull/191#discussion_r1981702786)
- > "only showModal[$key] is needed. Not all keys."

## Testing

### When modifying shared code or removing filters, verify that downstream consumers or components that depend on previous behavior are not broken by the change.

- Specificity: **generic** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-11 → 2026-03)
- Evidence: [PR #768](https://github.com/level-connections/venus/pull/768#discussion_r2871348128), [PR #560](https://github.com/level-connections/venus/pull/560#discussion_r2515925123), [PR #560](https://github.com/level-connections/venus/pull/560#discussion_r2515925677)
- > "Please test if allowing both of these will break the flow."

### Design for testability by extracting decision logic into a dedicated service class.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-05)
- Evidence: [PR #57](https://github.com/level-connections/venus/pull/57#discussion_r1616454062)
- > "To make the functionality more testable, it would be much easier with the logic that is identifying which users should receive each message in a Service class."

## Process

### When modifying existing code, take the opportunity to perform small, low-risk refactors and clean up duplication to improve maintainability.

- Specificity: **generic** · Confidence: 55%
- Seen in 2 PR(s) from 2 reviewer(s) (2024-04 → 2026-05)
- Evidence: [PR #929](https://github.com/level-connections/venus/pull/929#discussion_r3226671690), [PR #35](https://github.com/level-connections/venus/pull/35#discussion_r1546392979)
- > "in PRs like this its a great situation to do a small refactor/cleanup code while you are on it."

### Before adding new code that references existing components or configurations, verify that those components still exist in the codebase.

- Specificity: **generic** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-09 → 2026-01)
- Evidence: [PR #676](https://github.com/level-connections/venus/pull/676#discussion_r2731999610), [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356592104)
- > "We no longer have applicants or ApplicantsController. Can you please check and point to the MembersController probably"

### When adding a new package dependency, ensure the corresponding version is recorded in the package manifest and the lock file is regenerated.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356589030)
- > "Did you add the toast package? You should add the package.json in this case."

### Remove unnecessary lock files from pull requests that do not include changes to the corresponding manifest file.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2908452109)
- > "Remove composer.lock if no composer.json change"

### Never modify an already-deployed database migration; instead, create a new migration file for the change.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #766](https://github.com/level-connections/venus/pull/766#discussion_r2861207542)
- > "you need to create another migration as this will not run when running php artisan migrate. In general you should never update old migrations"

### Discuss new status values or other shared state changes with the team before adding them to avoid inconsistencies.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414117129)
- > "Maybe we need a different status here to not mix it with the standard flow... I think we should discuss those first before i work on it"

### When adding an extension or dependency to one environment configuration, apply the same change to all matching configurations.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #336](https://github.com/level-connections/venus/pull/336#discussion_r2197748350)
- > "Please check worker dockerfile to add imagemagick"

### Before concluding that a framework feature is deprecated, verify the behavior with a local test using the same assumptions.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-01)
- Evidence: [PR #172](https://github.com/level-connections/venus/pull/172#discussion_r1937531640)
- > "I just did a little test locally, adding the `AddContext::class` to the list of middleware that should load in the `$middlewareGroups` for web, and it definitely loaded for my request."

### Temporarily disable a feature by commenting out code only when the team explicitly coordinates the deployment timeline.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-12)
- Evidence: [PR #140](https://github.com/level-connections/venus/pull/140#discussion_r1897474552)
- > "I assume we want this disabled on prod for now right?"

## Style

### Remove unused, commented-out, or debug code to keep the codebase clean.

- Specificity: **generic** · Confidence: 85%
- Seen in 6 PR(s) from 3 reviewer(s) (2024-03 → 2026-05)
- Evidence: [PR #980](https://github.com/level-connections/venus/pull/980#discussion_r3293249384), [PR #708](https://github.com/level-connections/venus/pull/708#discussion_r2764408541), [PR #708](https://github.com/level-connections/venus/pull/708#discussion_r2764471579)
- > "No longer needed since we don't use it for login user in"

### Name classes, methods, and middleware to reflect their general concept or business action, not a specific use case or implementation detail.

- Specificity: **conventional** · Confidence: 80%
- Seen in 6 PR(s) from 2 reviewer(s) (2024-03 → 2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2981227103), [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2999502103), [PR #395](https://github.com/level-connections/venus/pull/395#discussion_r2265273775)
- > "Rename to RestrictMagicLinkSession"

### Add explicit type hints to function parameters and return types.

- Specificity: **conventional** · Confidence: 75%
- Seen in 6 PR(s) from 1 reviewer(s) (2025-04 → 2025-10)
- Evidence: [PR #350](https://github.com/level-connections/venus/pull/350#discussion_r2224011573), [PR #547](https://github.com/level-connections/venus/pull/547#discussion_r2467027297), [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414085210)
- > "Add types to properties (string $s3Path, ?? $driver): string"

### Rename methods to reflect precisely what they do, avoiding ambiguity.

- Specificity: **generic** · Confidence: 76%
- Seen in 5 PR(s) from 2 reviewer(s) (2024-05 → 2026-03)
- Evidence: [PR #776](https://github.com/level-connections/venus/pull/776#discussion_r2918169836), [PR #229](https://github.com/level-connections/venus/pull/229#discussion_r2027759850), [PR #191](https://github.com/level-connections/venus/pull/191#discussion_r1981650993)
- > "Rename to syncProfileCompletionStatus"

### Use descriptive, type-hinted property and variable names that reflect their type or model, not their role in the current context.

- Specificity: **generic** · Confidence: 71%
- Seen in 5 PR(s) from 1 reviewer(s) (2025-04 → 2026-04)
- Evidence: [PR #835](https://github.com/level-connections/venus/pull/835#discussion_r3048174861), [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2487976480), [PR #350](https://github.com/level-connections/venus/pull/350#discussion_r2217459031)
- > "Since these are user models rename this to users, or better yet sampleUsers. Add type to property. The type is Collection ensure type safety and consistency since the property is used as a Collection throughout the component."

### Use enum values instead of hardcoded strings when comparing against enums.

- Specificity: **conventional** · Confidence: 67%
- Seen in 4 PR(s) from 1 reviewer(s) (2025-02 → 2026-03)
- Evidence: [PR #401](https://github.com/level-connections/venus/pull/401#discussion_r2268003364), [PR #401](https://github.com/level-connections/venus/pull/401#discussion_r2268003739), [PR #785](https://github.com/level-connections/venus/pull/785#discussion_r2942883064)
- > "Use DatingModeEnum::STANDARD->value instead of "standard""

### Use guard clauses with early returns to reduce nesting.

- Specificity: **generic** · Confidence: 60%
- Seen in 3 PR(s) from 1 reviewer(s) (2025-02 → 2026-03)
- Evidence: [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2908424683), [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414108476), [PR #170](https://github.com/level-connections/venus/pull/170#discussion_r1938503591)
- > "Lots of $member??? checks, just do @if(!$member) @continue @endif and simplify below."

### Remove unused properties or fields without observable side effects.

- Specificity: **generic** · Confidence: 60%
- Seen in 3 PR(s) from 1 reviewer(s) (2025-07 → 2026-02)
- Evidence: [PR #745](https://github.com/level-connections/venus/pull/745#discussion_r2833365306), [PR #489](https://github.com/level-connections/venus/pull/489#discussion_r2387110915), [PR #345](https://github.com/level-connections/venus/pull/345#discussion_r2203513589)
- > "Are these used somewhere? I dont understand what are these for"

### Extract magic numbers and hardcoded values into named constants.

- Specificity: **generic** · Confidence: 55%
- Seen in 2 PR(s) from 2 reviewer(s) (2025-03 → 2026-05)
- Evidence: [PR #974](https://github.com/level-connections/venus/pull/974#discussion_r3310298687), [PR #189](https://github.com/level-connections/venus/pull/189#discussion_r1976478414)
- > "const 0.1 somewhere"

### Pass structured model objects to views instead of individual scalar values.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-09 → 2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2487978445), [PR #469](https://github.com/level-connections/venus/pull/469#discussion_r2356648074)
- > "Only pass $matchmaker, access the fields in the blade"

### Name foreign key columns by the referenced table's singular name followed by '_id'.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-08 → 2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356469985), [PR #414](https://github.com/level-connections/venus/pull/414#discussion_r2281972345)
- > "Change to user_id"

### Use named constants instead of hardcoded values in user-facing messages and data keys.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-03 → 2026-03)
- Evidence: [PR #822](https://github.com/level-connections/venus/pull/822#discussion_r2999628555), [PR #191](https://github.com/level-connections/venus/pull/191#discussion_r1981713667), [PR #191](https://github.com/level-connections/venus/pull/191#discussion_r1981721169)
- > "use constant in message"

### Use Alpine.js for frontend interactivity instead of raw JavaScript or jQuery.

- Specificity: **team_specific** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-09 → 2026-02)
- Evidence: [PR #755](https://github.com/level-connections/venus/pull/755#discussion_r2847388667), [PR #448](https://github.com/level-connections/venus/pull/448#discussion_r2314973354)
- > "Please use alpine.js in the future."

### Use consistent casing for method names across the codebase.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-08 → 2025-12)
- Evidence: [PR #655](https://github.com/level-connections/venus/pull/655#discussion_r2605592330), [PR #395](https://github.com/level-connections/venus/pull/395#discussion_r2265275340), [PR #395](https://github.com/level-connections/venus/pull/395#discussion_r2265275435)
- > "This is the only method in the whole project that starts with a capital letter 😁"

### Use consistent naming conventions for boolean parameters and methods that express the same concept.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-06)
- Evidence: [PR #1020](https://github.com/level-connections/venus/pull/1020#discussion_r3380830692), [PR #1020](https://github.com/level-connections/venus/pull/1020#discussion_r3380835659)
- > "For consistency rename $isLgbtqFlow to $isLgbtFlow since we have $mm->isLgbt() method."

### Prefer Blade control structures over raw PHP blocks for template logic.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-06)
- Evidence: [PR #1022](https://github.com/level-connections/venus/pull/1022#discussion_r3377295930)
- > "This is a bit hacky. No need to do @php here, simply have it in the blade below with @if @foreach etc"

### Use enum cases instead of string comparisons for consistency with typed enum conventions.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #927](https://github.com/level-connections/venus/pull/927#discussion_r3258704890)
- > "For example use @case ProfileCompletionEnum::Registered"

### Name classes and components to reflect the data they represent, not the role of the user who interacts with them.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2488014808)
- > "Rename to ReferredUsersTable"

### Name files according to the component they implement, not a related but different concept.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356580853)
- > "Should be matchmaker.blade.php not user"

### Prefix component keys with a meaningful identifier to avoid collisions.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2373432599)
- > "always add prefix for key="prefix-<id>" for example: matchmaker-avatar-<mmid>"

### Use enum helper methods instead of comparing against raw enum values when checking permission state.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2373443119)
- > "@elseif($sharedClient->canIntroduce())"

### Remove fallback logic for fields with required database schemas and default values.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #401](https://github.com/level-connections/venus/pull/401#discussion_r2267961218)
- > "The dating_mode field is required in the schema so remove the ?? check. It is already standard as default in the database."

### Name variables for their semantic meaning, not their coincidental equality with another condition.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #401](https://github.com/level-connections/venus/pull/401#discussion_r2267997481)
- > "Although it's same conditions as $canUpgrade we shouldn't reuse the same variable if it's named like this. Because when the condition for "can upgrade?" changes, that doesn't mean the condition for "can change dating mode" will change in the same way."

### Use descriptive, action-accurate wire:key values.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #358](https://github.com/level-connections/venus/pull/358#discussion_r2224002752)
- > "wire:key is not confirm-applicant-approve-{{$user->id}} it should be dismiss-lead-{{$user->id}}"

### Name route identifiers consistently within related route groups.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #358](https://github.com/level-connections/venus/pull/358#discussion_r2224007938)
- > "Change name to matchmaker.leads.index so it's similar to applicants, members and clients."

### Remove code for features not present in the final design to avoid mismatched layout attributes.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-04)
- Evidence: [PR #844](https://github.com/level-connections/venus/pull/844#discussion_r3064432672)
- > "I added tags to the table initially but than it wasn't in the design so forgot to remove that"

### Extract duplicated code into shared methods.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #822](https://github.com/level-connections/venus/pull/822#discussion_r2999622696), [PR #822](https://github.com/level-connections/venus/pull/822#discussion_r2999634636)
- > "Move to a method as its duplicated below"

### Use Eloquent relationships instead of directly querying foreign keys to delete related records.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #776](https://github.com/level-connections/venus/pull/776#discussion_r2918148366)
- > "$matchmaker->ghlCustomFields()->delete()"

### Use enum casting on model attributes to avoid manual ->value calls.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2894623711)
- > "add enum cast then you dont need to use ->value"

### Use standard icon components with accessible tooltips instead of raw SVG or text characters.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #778](https://github.com/level-connections/venus/pull/778#discussion_r2908438659)
- > "info icon should have a tooltip or be removed. Also best use x-heroicon."

### Simplify compound boolean conditions by distributing negation.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #779](https://github.com/level-connections/venus/pull/779#discussion_r2894693265)
- > "if (!$this->needsContactingMatchmakerBeforeIntro && ($isUndecided || $cannotContact)) {"

### Use the project's established error notification mechanism instead of ad-hoc error handling.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #745](https://github.com/level-connections/venus/pull/745#discussion_r2833367414)
- > "Use dispatch notify error. Search other livewire components for "notify""

### Name route binding parameters to indicate they represent an ID rather than the resolved model instance.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #708](https://github.com/level-connections/venus/pull/708#discussion_r2764419223)
- > "Rename parameter to $shareWithMatchmaker**Id**"

### Use Blade's forelse() directive instead of wrapping if around foreach for empty collections.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #608](https://github.com/level-connections/venus/pull/608#discussion_r2548644045)
- > "instead of if($internalnotes) and then foreach($internalNotes) In blade we can do forelse()"

### Compare boolean or nullable database columns directly against true/false/null instead of string literals.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #578](https://github.com/level-connections/venus/pull/578#discussion_r2509136470)
- > "wants_on_level_network and wants_to_be_client are boolean or null. Remove the 'yes' check."

### Avoid using the null-safe operator on guaranteed objects; use standard property access instead.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #541](https://github.com/level-connections/venus/pull/541#discussion_r2447067005)
- > "remove this operator"

### Rename ambiguous variables to distinguish between similar properties in the same scope.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414062927)
- > "This variable name is unclear, since we have $clientMM and $memberMM - please rename."

### Rename variables to shorter, idiomatic names when longer names add no clarity.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414065446)
- > "Rename to $member"

### Name scalar properties with a suffix indicating their type when ambiguous (e.g., $userId).

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414071047)
- > "Rename to $introduceFirstUserId, otherwise a User object would be expected."

### Name variables to reflect their content type, not the service that produced them.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414083837)
- > "Rename variable to $userResponse insteda of $ideaConfiguration"

### Use named parameters when calling functions with multiple optional or boolean parameters.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414110456)
- > "Add named parameters for better readability."

### Use early exit with exception instead of conditional logic for error conditions.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #516](https://github.com/level-connections/venus/pull/516#discussion_r2414113047)
- > "Replace with early exit. If there isn't a configuration something went wrong so throw an exception."

### Use boolean type hints for parameters representing binary states instead of string literals.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #533](https://github.com/level-connections/venus/pull/533#discussion_r2435582368)
- > "change $isEnabled to a bool."

### Use nullable enums as return types when a method may return no meaningful value.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #525](https://github.com/level-connections/venus/pull/525#discussion_r2428328892)
- > "Change return type to ?enum"

### Add a prefix to signature attributes to clarify purpose and avoid naming conflicts.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #513](https://github.com/level-connections/venus/pull/513#discussion_r2409834153)
- > "Add signature prefix"

### Extract image URL directly from model method call in Blade templates to avoid unnecessary variable assignments.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #489](https://github.com/level-connections/venus/pull/489#discussion_r2387121839)
- > "@if($image = $user->getMainProfileImage()) $image->getUrl()"

### Use convention-based rules() and messages() methods in Livewire components.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #447](https://github.com/level-connections/venus/pull/447#discussion_r2314967527)
- > "You can rename the methods to rules() and messages() and it will work by convention. Then simply call $this->validate()"

### Name Blade view files with a consistent, descriptive pattern.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #436](https://github.com/level-connections/venus/pull/436#discussion_r2301768251)
- > "Rename to create-email-step.blade.php"

### Name database columns to indicate their domain or subsystem when a generic name could refer to multiple features.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #414](https://github.com/level-connections/venus/pull/414#discussion_r2281979079)
- > "should_sync is too vague. Rename to ghl_should_sync_contacts if it's for contacts only."

### Update PHPDoc @param tags to match method signature when parameters change.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #393](https://github.com/level-connections/venus/pull/393#discussion_r2267457100)
- > "The @params needs updating."

### Place error messages immediately after the input field they validate.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #393](https://github.com/level-connections/venus/pull/393#discussion_r2267463565)
- > "this is just at wrong position :)"

### Name middleware and classes to reflect singular vs. plural scope.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #389](https://github.com/level-connections/venus/pull/389#discussion_r2259685597)
- > "Rename to CanViewNotifications as this is not for a single notification, it is for all."

### Name middleware classes to reflect access to a collection or any subset, not just a single instance.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #389](https://github.com/level-connections/venus/pull/389#discussion_r2259688337)
- > "Rename to CanViewTask**s** as this is not for a single tasks, it is for all or single."

### When displaying multiple entities in a signature, show the most authoritative user first.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #355](https://github.com/level-connections/venus/pull/355#discussion_r2219489216)
- > "This must show the primary user (Matchmaker Admin) full name above the $matchmaker->name"

### Use the collection's built-in join method instead of manual implode for list formatting.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #345](https://github.com/level-connections/venus/pull/345#discussion_r2203514142)
- > "return $this->recipients->map()->join(', ', ' and ')"

### Use Laravel's query shortcuts like oldest() instead of orderBy when possible.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #345](https://github.com/level-connections/venus/pull/345#discussion_r2203515120)
- > "$firstMessage = $this->messages()->oldest()->first() https://laravel.com/docs/12.x/queries#latest-oldest"

### Name variables to reflect precise cardinality or scope of data.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-06)
- Evidence: [PR #315](https://github.com/level-connections/venus/pull/315#discussion_r2166058159)
- > "Remove the "Each" as it is only one question."

### Use the null-safe operator when chaining on nullable objects to avoid verbose null checks.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-06)
- Evidence: [PR #315](https://github.com/level-connections/venus/pull/315#discussion_r2166059603)
- > "Can you use `$similarQuestion->category?->id` operator instead to shorten it."

### Use explicit naming for configuration constants that describe their purpose and constraints.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-04)
- Evidence: [PR #248](https://github.com/level-connections/venus/pull/248#discussion_r2066836227)
- > "Rename to MEDIA_SELECTION_LIMIT and implement maximum 5 selected."

### Remove redundant conditions strictly implied by a later condition.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-04)
- Evidence: [PR #248](https://github.com/level-connections/venus/pull/248#discussion_r2066848749)
- > "Unnecessary "$idems->count() &&" only @if($items->count() > 1)"

### Rename frontend elements to match their corresponding backend names.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-04)
- Evidence: [PR #248](https://github.com/level-connections/venus/pull/248#discussion_r2066850890)
- > "Rename to match backend new name."

### Use resetExcept over reset when preserving most properties, or vice versa.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-04)
- Evidence: [PR #251](https://github.com/level-connections/venus/pull/251#discussion_r2063803487)
- > "Try resetExcept"

### Name boolean parameters to describe the positive state, not the negation.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-03)
- Evidence: [PR #213](https://github.com/level-connections/venus/pull/213#discussion_r2000229169)
- > "for readability, i'd recommend changing this from `$maleIsClient` to `$clientIsMale`"

### Use consistent naming between internal data key constants and Livewire properties.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-03)
- Evidence: [PR #191](https://github.com/level-connections/venus/pull/191#discussion_r1981680339)
- > "rename to ->interests and KEY_INTERESTS in the constant"

### Prefer the auth() helper over the fully qualified Auth facade.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-03)
- Evidence: [PR #191](https://github.com/level-connections/venus/pull/191#discussion_r1981739767)
- > "You can use the auth() helper instead of this namespaced way."

### Use auth()->user() instead of Auth::user()->id followed by manual User::find.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #174](https://github.com/level-connections/venus/pull/174#discussion_r1952575703)
- > "$user = auth()->user()"

### Name files consistently with existing project conventions, including suffixes like 'Event'.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #170](https://github.com/level-connections/venus/pull/170#discussion_r1938503360)
- > "Add Event to the end of the filename so it's consistent with all other events."

### Name enums consistently with the domain concept, appending 'Enum' only when it reflects the exposed intent.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #173](https://github.com/level-connections/venus/pull/173#discussion_r1938500374)
- > "Rename to ApprovedAsMemberEmailTypeEnum for consistency."

### Use event names that unambiguously describe the action, including prepositions for clarity.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #168](https://github.com/level-connections/venus/pull/168#discussion_r1938121468)
- > "A suggestion for how this could be more readable: `UserWantsToBeOnLevelNetworkEvent`"

### Name event listeners to clearly describe the business action using correct grammar.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #168](https://github.com/level-connections/venus/pull/168#discussion_r1938122469)
- > "UserDoesNotWantToBeOnLevelNetworkListener"

### When front-end property names diverge from database column names, rename for consistency or isolate the mismatch.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #168](https://github.com/level-connections/venus/pull/168#discussion_r1938123242)
- > "If it's not too much effort. Otherwise, we can 'hide' that column name away in code implementation"

### Use named routes or route helpers instead of hardcoding URLs.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-12)
- Evidence: [PR #144](https://github.com/level-connections/venus/pull/144#discussion_r1899765566)
- > "This should point to /user/profile"

### Replace existing functions with improved versions rather than adding duplicate functions with suffixed names.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-08)
- Evidence: [PR #99](https://github.com/level-connections/venus/pull/99#discussion_r1701051796)
- > "Can you replace the original `guessQuestionForUserAndQuestionLabel` function with this one?"

### Name service classes to match their primary domain entity when there is a direct mapping.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-05)
- Evidence: [PR #56](https://github.com/level-connections/venus/pull/56#discussion_r1616447501)
- > "Just for consistency, would you be open to renaming this `MessageTrackingService`?"

### Name tables to group related tables logically rather than by type prefix.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #41](https://github.com/level-connections/venus/pull/41#discussion_r1575499147)
- > "Yeah it's an old habit to prefix so all email type tables are in the same place alphabetically but it doesn't apply much here."

### Name API response keys based on what the value represents conceptually, not how it's computed.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #35](https://github.com/level-connections/venus/pull/35#discussion_r1546380536)
- > "I think we should change `overallScore` to `percentage`. There are a handful of places that use `overallScore` that we'll have to update. But I think this will make this return array much more clear."

### Name methods to match their return type: a method named fromName should return an instance of that class.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-03)
- Evidence: [PR #28](https://github.com/level-connections/venus/pull/28#discussion_r1532392082)
- > "`fromName` methods typically return an instance of the object where the method is implemented. This breaks from that convention. Maybe change it to return `?self` or change the name of the method."

### Use descriptive variable names instead of single characters, except for conventional loop iterators.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-03)
- Evidence: [PR #22](https://github.com/level-connections/venus/pull/22#discussion_r1523698162)
- > "I generally try to avoid using single character variables outside of iterators. More specifically, I want to make sure variable names are as clear and non-ambiguous as possible."

### Replace hardcoded string literals in database column definitions with named constants.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #785](https://github.com/level-connections/venus/pull/785#discussion_r2949200951)
- > "hardcoded move to const"

### Name variables by their actual type, not the role they play, when the type is narrower.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2487976480)
- > "Rename to $user, this is not a ReferralPartner instance"

## Other

### Remove dead code that is no longer reachable or used, including server-side validation for AJAX-only forms and workaround patches after root cause fixes.

- Specificity: **generic** · Confidence: 67%
- Seen in 4 PR(s) from 1 reviewer(s) (2025-11 → 2026-05)
- Evidence: [PR #971](https://github.com/level-connections/venus/pull/971#discussion_r3310346002), [PR #928](https://github.com/level-connections/venus/pull/928#discussion_r3221576845), [PR #567](https://github.com/level-connections/venus/pull/567#discussion_r2487989800)
- > "The @error() directives were already dead code , the form never does a traditional POST since both the preview and send flows are AJAX-only via axios."

### Use user-centered messaging that reflects the recipient's perspective and avoid internal product terminology in user-facing copy.

- Specificity: **conventional** · Confidence: 55%
- Seen in 2 PR(s) from 2 reviewer(s) (2024-04 → 2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2999547072), [PR #43](https://github.com/level-connections/venus/pull/43#discussion_r1574792783)
- > "Change message, they haven't been introduced to anyone, the other profile is introduced to them. big problem. Also they requested to not use 'Idea' in text/frontend."

### Conditionally display UI elements based on relevant data properties or feature flags to avoid showing irrelevant or misleading information.

- Specificity: **generic** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2024-12 → 2026-05)
- Evidence: [PR #959](https://github.com/level-connections/venus/pull/959#discussion_r3251889853), [PR #142](https://github.com/level-connections/venus/pull/142#discussion_r1899147852)
- > "Dont show for isLgbt() false"

### Ensure UI changes are mirrored in all responsive variants, including mobile menus.

- Specificity: **team_specific** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2024-12 → 2025-09)
- Evidence: [PR #471](https://github.com/level-connections/venus/pull/471#discussion_r2356623483), [PR #141](https://github.com/level-connections/venus/pull/141#discussion_r1898628903)
- > "There should be a mobile version menu in this file. Please add there as well."

### Use the correct route prefix when checking active navigation links to ensure menu highlighting matches the intended section.

- Specificity: **team_specific** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-07 → 2025-11)
- Evidence: [PR #358](https://github.com/level-connections/venus/pull/358#discussion_r2224007431), [PR #575](https://github.com/level-connections/venus/pull/575#discussion_r2509139157), [PR #575](https://github.com/level-connections/venus/pull/575#discussion_r2509139851)
- > "matchmaker.leads"

### Cast model attributes to enum types so you can work with enum objects instead of scalar values, and avoid calling ->value on already cast enum properties.

- Specificity: **conventional** · Confidence: 50%
- Seen in 2 PR(s) from 1 reviewer(s) (2025-06 → 2025-11)
- Evidence: [PR #620](https://github.com/level-connections/venus/pull/620#discussion_r2555737203), [PR #298](https://github.com/level-connections/venus/pull/298#discussion_r2135193141)
- > "Cast the new field to the enum ... Then use the enum objects instead of enum->value strings."

### Keep the user interface consistent by using the same labels and data sources for the same concept across related views.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-06)
- Evidence: [PR #1022](https://github.com/level-connections/venus/pull/1022#discussion_r3377300888)
- > "Why living location here and on the other blade 'city' ? I think we should show city here too no?"

### Do not update timestamp columns that affect sorting when performing data migrations, as it can unexpectedly change record order.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-05)
- Evidence: [PR #946](https://github.com/level-connections/venus/pull/946#discussion_r3244951436)
- > "We need to make sure latest_activity_at is not touched as it's used in the members sorting, this will bring up all old profiles on top."

### Centralize design token values in the configuration file for consistency and reusability across the theme.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-04)
- Evidence: [PR #831](https://github.com/level-connections/venus/pull/831#discussion_r3031990513)
- > "add to tailwind config colors so we can have a theme"

### Check whether a service integration is enabled before performing operations that depend on it.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #808](https://github.com/level-connections/venus/pull/808#discussion_r2981239774)
- > "Needs a check if the matchmaker has GHL integration and SMS is enabled"

### Consolidate failure-handling logic in catch blocks instead of adding redundant condition checks or separate timeouts.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-04)
- Evidence: [PR #862](https://github.com/level-connections/venus/pull/862#discussion_r3097389503)
- > "Fishy - should be in catch without the setTimeout + you are already in `if (window.parent !== window) {` above so its redundant"

### Add target="_blank" to external links to prevent navigation away from the current page.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #358](https://github.com/level-connections/venus/pull/358#discussion_r2224001776)
- > "Please add target="_blank" to links here."

### Document or explicitly save side-effect mutations within called methods to avoid implicit persistence assumptions.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #815](https://github.com/level-connections/venus/pull/815#discussion_r2998222481)
- > "I'm not sure why we didnt have save here before - I think it's saving inside updateIdeaScore?"

### Restore a previous working pattern when a newer replacement causes regressions with dynamic DOM updates.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-03)
- Evidence: [PR #772](https://github.com/level-connections/venus/pull/772#discussion_r2871371853)
- > "restored old tooltip pattern (showTooltip + onmouseover). Also added stable Livewire keys to idea-search row actions to prevent snapshot-missing errors."

### Use framework helpers like Laravel's Str::plural() for converting singular to plural instead of manual formatting.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #745](https://github.com/level-connections/venus/pull/745#discussion_r2833344629)
- > "https://laravel.com/docs/12.x/strings#method-str-plural"

### Display zero values in UI summaries rather than hiding rows to avoid implying data was not collected.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #733](https://github.com/level-connections/venus/pull/733#discussion_r2814024242)
- > "Remove the if so we can show the 0 values"

### Place counter increments before conditional branches so the count reflects all processed items, not only successful ones.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #731](https://github.com/level-connections/venus/pull/731#discussion_r2814039015)
- > "Values will always be the same? Probably $processed++ should be before the skip if"

### Check library documentation for built-in column types that handle relationships before implementing workarounds.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #718](https://github.com/level-connections/venus/pull/718#discussion_r2787381803)
- > "here is the documentation for ... please check the column type for relation and see if we can use it"

### Avoid committing placeholder or dummy values like literal hardcoded slugs in production code.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2026-02)
- Evidence: [PR #708](https://github.com/level-connections/venus/pull/708#discussion_r2764431365)
- > "??"

### Log at the error level when an invariant is violated, not at the warning level.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-11)
- Evidence: [PR #576](https://github.com/level-connections/venus/pull/576#discussion_r2509153299)
- > "This should be an error as we should always have a matchmaker for users except for SuperAdmins"

### Ensure unhandled exceptions in user-facing components produce a clear user-facing error message instead of a silent failure or generic 500 error.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #547](https://github.com/level-connections/venus/pull/547#discussion_r2467026201)
- > "Fix with toast or simply throw $e so user gets 500"

### When modifying a column's default value in a migration, apply the same ->change() in both up() and down() methods to ensure reversibility.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-10)
- Evidence: [PR #542](https://github.com/level-connections/venus/pull/542#discussion_r2448675568)
- > "add ->change() to the down() method as well"

### Avoid hardcoding fallback values for user-provided data in the backend; handle absence in the view layer instead.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #469](https://github.com/level-connections/venus/pull/469#discussion_r2356649076)
- > "Remove the default cdn link. Instead check if set in the blade and simply don't show photo."

### Ensure that models referenced in view data actually have the fields being accessed, or handle missing fields gracefully.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #469](https://github.com/level-connections/venus/pull/469#discussion_r2356662642)
- > "Users table doesnt have company_url?"

### Log an error at every failure point where a condition is checked and the code proceeds to an else/default branch.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-09)
- Evidence: [PR #442](https://github.com/level-connections/venus/pull/442#discussion_r2313766906)
- > "if !isset($data['conversationId']) then it should log as error as well - same case."

### When a boolean field can be null, display null as an empty string rather than assuming a default truth value.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #408](https://github.com/level-connections/venus/pull/408#discussion_r2280871315)
- > "This needs to show empty if the value is null. 1 - "Yes" 0 - "No" null - """

### Ensure user-facing confirmation text accurately reflects current behavior, removing references to unimplemented actions.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-08)
- Evidence: [PR #395](https://github.com/level-connections/venus/pull/395#discussion_r2265281121)
- > "They are not notified by email, right? We also might now allow them to schedule if it's a managed in the future. So best to change text to Please confirm you wish to reopen the date between <member> and <client>."

### Check whether a user already belongs to a different matchmaker before importing, and if so do not reassign user_id, only report the existing relationship.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-07)
- Evidence: [PR #323](https://github.com/level-connections/venus/pull/323#discussion_r2190681601)
- > "If the user is owned by another matchmaker user_id must not be set. Import shouldn't work if user is already existing for another matchmaker."

### Use || instead of && when a condition should be true if either bound is available, and handle the case where only one bound is available.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-04)
- Evidence: [PR #249](https://github.com/level-connections/venus/pull/249#discussion_r2062699138)
- > "Change && to || and handle the case where only 1 is available"

### When displaying a numeric range, format it as a human-readable phrase that gracefully handles boundary cases (only lower, only upper, both present).

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-04)
- Evidence: [PR #249](https://github.com/level-connections/venus/pull/249#discussion_r2062699613)
- > "Change "-" to "From <lower> to <upper> years old.". If only lower: "Older than <lower>" If only upper: "Younger than <upper>""

### Prefer framework-specific shortcuts over custom methods when they can eliminate unnecessary code.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-03)
- Evidence: [PR #191](https://github.com/level-connections/venus/pull/191#discussion_r1981650993)
- > "Maybe this method is unnecessary and can be changed to the livewire @toggle method"

### Ensure in-memory model relationships are refreshed after a direct database update to reflect the new state for subsequent code.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #198](https://github.com/level-connections/venus/pull/198#discussion_r1974055188)
- > "Yes it is needed because it's not updating the  $user->roles property which is later used."

### Always include the referenced UI element when adding a tooltip attribute to an element.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #180](https://github.com/level-connections/venus/pull/180#discussion_r1950808092)
- > "Tooltip is missing?"

### Keep obsolete constants or keys when corresponding records still exist in the database, removing them only when the database is cleaned as well.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-02)
- Evidence: [PR #176](https://github.com/level-connections/venus/pull/176#discussion_r1950832753)
- > "Let's keep the unused consts for historic script purposes. There are still records in the database with these keys. And remove them only if we ever clean the database as well"

### Do not assume that familiar patterns or properties in a framework's documentation are deprecated without verifying the framework version and the actual execution path at runtime.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2025-01)
- Evidence: [PR #172](https://github.com/level-connections/venus/pull/172#discussion_r1937531640)
- > "I think it's just the protected $middlewareGroups is deprecated and replaced with the ->withMIddleware above."

### When changing a business rule filter in service code, ensure the corresponding UI filter column is updated to match.

- Specificity: **team_specific** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-12)
- Evidence: [PR #141](https://github.com/level-connections/venus/pull/141#discussion_r1898628903)
- > "Also fix in the filter column"

### Ensure all element IDs within loops are unique by appending a unique identifier like a record ID.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-12)
- Evidence: [PR #138](https://github.com/level-connections/venus/pull/138#discussion_r1898601533)
- > "This will conflict when in foreach. The id should be unique `id="tooltip-full-message-{{$userInbox->id}}"` ."

### Use nullsafe access when calling a method or accessing a property on a value that may not be set in all execution contexts.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-11)
- Evidence: [PR #131](https://github.com/level-connections/venus/pull/131#discussion_r1855233250)
- > "you can just change the call to the nullsafe `Context::get('matchmaker')?->id`"

### Verify enum or constant groupings reflect the correct semantic category for every member, especially when copying from related groups.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-08)
- Evidence: [PR #104](https://github.com/level-connections/venus/pull/104#discussion_r1714292136)
- > "This doesn't seem right. Should be DeniedByMale."

### Distinguish between query builder 'exists' methods and Collection methods when suggesting simplifications in code reviews.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-06)
- Evidence: [PR #69](https://github.com/level-connections/venus/pull/69#discussion_r1633505514)
- > "Was thinking the same but the exist method doesnt exist for collections. The ->firstWhere method is on model collection its not on the query builder."

### Wrap code that can throw exceptions in a try/catch block, log the exception, and execute a response in a finally clause to ensure it is sent even on failure.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-05)
- Evidence: [PR #56](https://github.com/level-connections/venus/pull/56#discussion_r1616445943)
- > "Please wrap in a try/catch, log the exception, and put the response in a finally clause to ensure it always executes"

### Specify a timezone for scheduled tasks when the intended execution time depends on a specific geographic timezone.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-05)
- Evidence: [PR #57](https://github.com/level-connections/venus/pull/57#discussion_r1616448972)
- > "Can you please add `America/Los_Angeles` timezone to this?"

### Avoid using SQL reserved words as column names to prevent potential query issues.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #38](https://github.com/level-connections/venus/pull/38#discussion_r1567500540)
- > "using reserved SQL words like `group` can cause some annoyances"

### When querying a database for records that could match either of two columns, use an OR condition covering both columns.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #40](https://github.com/level-connections/venus/pull/40#discussion_r1566014523)
- > "The attribute could be on either attribute_a_id or attribute_b_id ->orWhereIn('attribute_b_id', $attributeIds->toArray()"

### Ensure variables used in extracted or reused templates are defined in the context where they are included.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #35](https://github.com/level-connections/venus/pull/35#discussion_r1546384624)
- > "Looks like this was extracted from the other view, and this variable is not set in this sub-view"

### Guard against division by zero or empty collections before performing aggregate calculations.

- Specificity: **generic** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2024-04)
- Evidence: [PR #35](https://github.com/level-connections/venus/pull/35#discussion_r1546394894)
- > "There is a case where `$count` may be 0. If the client and member have no 'relation weights' because none of their responses have relation pairs in the relations table"

### When renaming a database column in an update function, ensure all paths that update that column are updated consistently, including verified and unverified user flows.

- Specificity: **conventional** · Confidence: 33%
- Seen in 1 PR(s) from 1 reviewer(s) (2023-06)
- Evidence: [PR #4](https://github.com/level-connections/venus/pull/4#discussion_r1228364697)
- > "Is this supposed to be `first_name` instead of `name`?"
