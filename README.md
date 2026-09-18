# Cynapsa public web demos

This repository contains presentation-ready interactive demonstrations of the Cynapsa networking layer for agentic AI.

The main experience is a six-part guided architecture story that explains:

- The production connectivity gap for distributed agents
- Cryptographic agent identity
- Control-plane authorization and preferred peer application traffic
- Data locality
- Agent microsegmentation and targeted revocation
- Deployment with no code change necessary

The existing focused demonstrations remain available as technical deep dives from the main page.

## Run locally

The site is static and has no build step:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Main interaction

- Use the numbered chapters or the Back and Next controls.
- Switch between Business and Architecture copy.
- Presentation mode expands the architecture stage.
- In presentation mode, use the left and right arrow keys to change chapters, Space to play or pause, and Escape to exit.
- The policy chapter includes an Allow and Revoke simulation.

## Deployment

GitHub Pages deploys the branch selected by the repository variable `BRANCH_TO_PAGES`. The `demo` branch is the currently deployed public experience. This branch is intended for review before it replaces that source.
