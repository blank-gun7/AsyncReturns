# Plan and Execute

Use this template to start any feature, fix, or maintenance task.
Copy-paste into Claude Code and fill in the blanks.

---

## The Prompt

```
Task: [one sentence — what needs to happen]

Context: [why this matters, what triggered it, any links to issues or screenshots]

Constraints:
- [anything that must NOT change]
- [performance/size/compatibility requirements]
- [deadline if any]

Enter plan mode. Research the codebase, identify every file that needs
to change, and produce a numbered task list. Each task should have:
1. What to do (one sentence)
2. Which files to touch
3. How to verify it worked (test, build, or visual check)

Once I approve the plan, execute each task with a dedicated subagent.
Run independent tasks in parallel. After all tasks complete, run the
full build and test suite, then commit to a feature branch and push.
Do not merge — create a PR for review.
```

---

## Quick-Start Variants

### Bug Fix
```
Task: Fix [describe the bug]
Context: [how to reproduce, error message, which page/route]
Constraints:
- Do not refactor surrounding code
- Add a test that would have caught this

Enter plan mode. [rest of template above]
```

### New Feature
```
Task: Add [feature name]
Context: [user story or spec, which part of the app]
Constraints:
- Follow existing component patterns
- Mobile-responsive
- No new dependencies without asking first

Enter plan mode. [rest of template above]
```

### Security Patch
```
Task: Fix [vulnerability — CVE or description]
Context: [which dependency, severity, affected routes]
Constraints:
- Minimal diff — patch only what's needed
- Do not bump unrelated dependencies
- Run security scan after fix

Enter plan mode. [rest of template above]
```

### Dependency Update
```
Task: Update [package name] from [current] to [target]
Context: [why — security, feature, deprecation]
Constraints:
- Check changelog for breaking changes before updating
- Run full test suite after
- If breaking, create migration steps in the PR description

Enter plan mode. [rest of template above]
```

### Refactor
```
Task: Refactor [what — component, module, API layer]
Context: [why — tech debt, readability, performance]
Constraints:
- Zero behavior change — all existing tests must still pass
- No new abstractions unless they eliminate 3+ duplications
- Keep the diff reviewable (under 500 lines if possible)

Enter plan mode. [rest of template above]
```
