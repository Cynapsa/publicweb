(() => {
    const body = document.body;
    const stageTakeaway = document.getElementById("stage-takeaway");
    const firewallRelationship = document.getElementById("firewall-relationship");
    const modeButtons = [...document.querySelectorAll("button[data-resilience-mode]")];
    const replicaCards = [...document.querySelectorAll("[data-replica]")];
    const statusText = document.getElementById("resilience-status-text");

    let mode = "balanced";
    let state = "healthy";
    let counts = { a: 0, b: 0, c: 0 };

    function setFirewallState(next) {
        body.dataset.firewallState = next;
        firewallRelationship.textContent = next === "authorized"
            ? "Authorized and established"
            : next === "blocked"
                ? "Unsolicited attempt blocked"
                : "Not established";

        if (body.dataset.sceneId === "firewall") {
            stageTakeaway.textContent = next === "authorized"
                ? "Authorized agents communicate over an established path while the inbound firewall posture remains closed."
                : next === "blocked"
                    ? "The unsolicited attempt is blocked. No public agent endpoint is exposed."
                    : "Agents initiate connectivity from inside their environments. Unsolicited inbound access stays blocked.";
        }
    }

    function renderResilience() {
        body.dataset.resilienceMode = mode;
        body.dataset.resilienceState = state;
        modeButtons.forEach(button => {
            const active = button.dataset.resilienceMode === mode;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        replicaCards.forEach(card => {
            const key = card.dataset.replica;
            const role = card.querySelector(".replica-role");
            const detail = card.querySelector("small");
            card.querySelector("b").textContent = String(counts[key]);
            card.classList.toggle("is-offline", key === "a" && state === "degraded");
            card.classList.toggle("is-promoted", key === "b" && mode === "active-passive" && state === "degraded");

            if (key === "a") {
                role.textContent = state === "degraded" ? "OFFLINE" : "ACTIVE";
                detail.textContent = state === "degraded" ? "AWS · unavailable" : "AWS · healthy";
            } else if (mode === "active-passive") {
                role.textContent = key === "b" && state === "degraded" ? "PROMOTED" : "STANDBY";
            } else {
                role.textContent = "ACTIVE";
            }
        });

        statusText.textContent = state === "degraded"
            ? mode === "active-passive"
                ? "Instance A is unavailable. Instance B is active for subsequent requests."
                : "Instance A is unavailable. Subsequent requests use healthy instances B and C."
            : mode === "active-passive"
                ? "Instance A is active. Instances B and C are ready as standby capacity."
                : "Three healthy instances are eligible for new requests.";
    }

    function resetResilience(nextMode = "balanced") {
        mode = nextMode;
        state = "healthy";
        counts = { a: 0, b: 0, c: 0 };
        renderResilience();
    }

    function sendRequests() {
        const eligible = mode === "active-passive"
            ? [state === "degraded" ? "b" : "a"]
            : state === "degraded" ? ["b", "c"] : ["a", "b", "c"];
        for (let index = 0; index < 6; index += 1) counts[eligible[index % eligible.length]] += 1;
        body.classList.remove("requests-moving");
        window.requestAnimationFrame(() => body.classList.add("requests-moving"));
        window.setTimeout(() => body.classList.remove("requests-moving"), 1500);
        renderResilience();
    }

    document.querySelector('[data-action="attempt-inbound"]').addEventListener("click", () => setFirewallState("blocked"));
    document.querySelector('[data-action="authorize-path"]').addEventListener("click", () => setFirewallState("authorized"));
    document.querySelector('[data-action="reset-firewall"]').addEventListener("click", () => setFirewallState("idle"));
    modeButtons.forEach(button => button.addEventListener("click", () => resetResilience(button.dataset.resilienceMode)));
    document.querySelector('[data-action="send-requests"]').addEventListener("click", sendRequests);
    document.querySelector('[data-action="fail-instance"]').addEventListener("click", () => {
        state = "degraded";
        renderResilience();
    });
    document.querySelector('[data-action="restore-instances"]').addEventListener("click", () => {
        state = "healthy";
        renderResilience();
    });

    document.querySelectorAll("[data-scene-target], button[data-lens]").forEach(button => button.addEventListener("click", () => {
        window.setTimeout(() => {
            if (body.dataset.sceneId === "firewall") setFirewallState("idle");
            if (body.dataset.sceneId === "resilience") resetResilience();
        }, 0);
    }));
})();
