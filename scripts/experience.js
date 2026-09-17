(() => {
    const scenes = [
        {
            id: "old-network",
            kicker: "01 · The old network paradigm",
            title: "More agents should not mean more network engineering",
            body: {
                business: "Traditional connectivity joins environments with VPNs, SD-WAN, gateways, subnet plans, routes, firewall policies, and load balancers. Every new agent location expands the project and the operating bill.",
                architecture: "Network-centric designs manage address space, tunnels, routes, certificates, ingress rules, failure domains, and ownership boundaries. Dynamic agent identity and churn create a different coordination problem."
            },
            points: {
                business: ["Configuration work grows with every environment and trust boundary", "The cost includes both initial integration and continuous operations"],
                architecture: ["Overlapping subnets and separate owners complicate routing", "Network access is broader and more static than agent-level authorization"]
            },
            architecture: "The gray topology shows the infrastructure commonly assembled around a distributed workflow. These tools remain useful, but making every agent relationship a network project creates configuration, security, and operations work that grows with the topology.",
            stageEyebrow: "The old network tax",
            stageTitle: "VPNs, routes, subnets, firewalls, repeat",
            takeaway: "Connect agent identities, not another collection of network segments.",
            explainer: "Each environment needs address planning, a tunnel or gateway, routes, firewall approvals, monitoring, and failure handling. Cynapsa keeps the underlying networks in place but removes the need to redesign them for every agent relationship."
        },
        {
            id: "identity",
            kicker: "02 · Identity",
            title: "Start with who, not where",
            body: {
                business: "Cynapsa gives each logical agent a governed identity. Policy decides which agents may communicate, regardless of the cloud, address, cluster, or customer environment where they run.",
                architecture: "Enrollment binds runtime authentication to a logical agent identity and independently authorized installation. The control plane uses those identities for membership, discovery, authorization, and targeted revocation."
            },
            points: {
                business: ["Trust follows the agent across environments", "Unknown and unauthorized agents stay isolated"],
                architecture: ["Cryptographic identity replaces location-based trust", "Authorization occurs before an application path is established"]
            },
            architecture: "Purple dashed paths show coordination with the Cynapsa control plane. They carry identity, policy, discovery, and session decisions. They are not the application data path.",
            stageEyebrow: "Identity-native networking",
            stageTitle: "Every agent becomes a governed network identity",
            takeaway: "Identity and policy determine who may communicate. Network location does not create trust.",
            explainer: "The purple control signals establish the identity and permissions of every agent. A logical identity remains meaningful when an agent changes IP address or runs as multiple authorized instances."
        },
        {
            id: "connectivity",
            kicker: "03 · Connectivity",
            title: "Coordinate centrally. Communicate directly",
            body: {
                business: "The control plane establishes who may connect. Authorized agents then exchange application traffic over the preferred available path, so the decision system does not need to carry every payload.",
                architecture: "Cynapsa coordinates identity, policy, discovery, and session establishment through its control plane, then prefers a peer data path across private network boundaries and NAT, with encrypted fallback when conditions require it."
            },
            points: {
                business: ["Application traffic stays on the most appropriate secure path", "Nearby agents do not need to hairpin through a collaboration platform"],
                architecture: ["Purple dashed lines are control-plane coordination", "Solid lime paths carry authorized application traffic"]
            },
            architecture: "The diagram separates control and data visually. The control plane coordinates the relationship. The preferred data path connects authorized peers and stays encrypted; NAT or firewall conditions can require an encrypted relay or durable fallback.",
            stageEyebrow: "Control plane and data plane",
            stageTitle: "Policy above. Application traffic below",
            takeaway: "The control plane authorizes the relationship. Application traffic follows the preferred available path.",
            explainer: "Purple lines coordinate identity and policy. Lime lines carry the agent workflow. The preferred path connects authorized peers without forcing the control plane to carry the payload."
        },
        {
            id: "firewall",
            kicker: "04 · Security posture",
            title: "Connect across boundaries. Keep inbound ports closed",
            body: {
                business: "Cynapsa connects authorized agents without requiring an inbound firewall port to be opened for the agent service. Existing private boundaries stay private.",
                architecture: "Agents initiate the required outbound connectivity. The control plane authenticates and authorizes the relationship, then coordinates a permitted bidirectional application path while unsolicited inbound access remains blocked."
            },
            points: {
                business: ["No new public agent endpoint to expose or defend", "Reduce firewall change requests and inbound attack surface"],
                architecture: ["Connection establishment is outbound initiated", "Established paths support bidirectional application exchange"]
            },
            architecture: "The firewall boundaries remain visibly closed throughout the simulation. An unsolicited attempt stops at the boundary. Authorized agents establish the required connectivity from inside their environments, and policy governs the resulting relationship.",
            stageEyebrow: "Closed-firewall deployment",
            stageTitle: "No inbound port opening required",
            takeaway: "Agents initiate connectivity from inside their environments. Unsolicited inbound access stays blocked.",
            explainer: "Try the unsolicited attempt first, then establish an authorized connection. Outbound-initiated does not mean one-way application traffic: once established and authorized, the path supports bidirectional exchange."
        },
        {
            id: "locality",
            kicker: "05 · Data locality",
            title: "Move the agent, not the data",
            body: {
                business: "Moving raw data to a remote agent creates new copies, expands exposure, and complicates privacy, residency, retention, and compliance. Cynapsa lets the agent run beside the governed data and return only the permitted result.",
                architecture: "A Cynapsa-connected agent runs inside the data owner's existing boundary. The control plane authenticates and authorizes the requester, while the task and permitted result use the approved data path. The raw dataset is not exported."
            },
            points: {
                business: ["Reduce unnecessary data copies and residency exposure", "Keep privacy and compliance controls around the original source"],
                architecture: ["Raw data remains inside its governed environment", "The agent logic stays unchanged while execution moves beside the data"]
            },
            architecture: "The left panel shows the risky pattern: raw records cross their governed boundary and become another copy beside a remote agent. The right panel shows Cynapsa placing the same agent logic inside the data boundary. Only the authorized task and permitted result cross the connection.",
            stageEyebrow: "Security, privacy, and compliance",
            stageTitle: "Moving data creates risk. Move the agent instead",
            takeaway: "Cynapsa keeps raw data inside its governed environment and moves authorized agent execution to the data, with no agent code change.",
            explainer: "Compare the two paths. Moving raw data outward expands the security, privacy, residency, retention, and audit surface. With Cynapsa, the agent executes beside the private source and only the permitted result leaves."
        },
        {
            id: "microsegmentation",
            kicker: "06 · Microsegmentation",
            title: "Apply authorization even between local agents",
            body: {
                business: "Agents on the same machine or VPC can often reach one another simply because the network considers them local. Cynapsa removes that implicit trust and allows only the agent relationships the workflow requires.",
                architecture: "Local proximity does not bypass identity policy. Each agent authenticates to the Cynapsa control plane, and each requested relationship is authorized before an application path is established, even when both peers share a host or subnet."
            },
            points: {
                business: ["A compromised local agent cannot wander through neighboring agents", "Revoke one identity without interrupting unrelated workflows"],
                architecture: ["Microsegmentation applies to agent identities, not shared subnets", "The control plane authorizes local and remote relationships consistently"]
            },
            architecture: "The left panel shows location-based trust inside one VPC or machine. The right panel shows the same agents under Cynapsa: every identity coordinates with the control plane, only the approved B4-to-C7 relationship is established, and the secrets agent remains blocked.",
            stageEyebrow: "Agent microsegmentation",
            stageTitle: "Same machine does not mean same trust",
            takeaway: "Cynapsa requires identity authorization even for agents sharing a machine, subnet, or VPC.",
            explainer: "The left panel shows why network proximity is risky: all three agents are locally reachable. The right panel shows Cynapsa identity policy. Use Revoke to remove Worker B4's approved path to Data C7 while every other identity stays governed independently."
        },
        {
            id: "resilience",
            kicker: "07 · Built-in resilience",
            title: "One identity. Multiple agents. Work keeps moving",
            body: {
                business: "Run multiple authorized instances behind the same logical agent identity. Choose balanced operation to spread new work, or active-passive operation to keep a standby ready for failover.",
                architecture: "Each instance keeps a distinct authorized attachment while sharing the logical destination identity. Replica policy selects a healthy exact endpoint for new requests and preserves the caller's destination identity when an instance fails."
            },
            points: {
                business: ["Add capacity without changing the calling workflow", "Keep new requests moving when an instance becomes unavailable"],
                architecture: ["Logical identity is shared; instance resources remain distinct", "Failover reroutes subsequent requests after failure detection"]
            },
            architecture: "Balanced mode distributes illustrative new requests across healthy instances. Active-passive mode sends work to the active instance until failure is detected, then promotes the standby. The visual does not claim in-flight recovery, application-state replication, or zero downtime.",
            stageEyebrow: "Identity-native availability",
            stageTitle: "Scale and fail over behind one identity",
            takeaway: "The caller keeps one destination identity while Cynapsa routes new work to a healthy authorized instance.",
            explainer: "Switch between Balanced and Active-passive. Send a few requests, take the active instance offline, and send again. The instance changes; the destination identity used by the caller does not."
        },
        {
            id: "deployment",
            kicker: "08 · Deployment",
            title: "Change the connectivity. Keep your code",
            body: {
                business: "Cynapsa adds the missing network layer beneath the existing agent application. Teams can connect distributed agents without rewriting the business logic that already works.",
                architecture: "The Cynapsa SDK supports deployment with no code change necessary. Existing frameworks and protocols remain responsible for application behavior while Cynapsa provides identity-based connectivity underneath."
            },
            points: {
                business: ["Keep the framework and agent logic you already chose", "Add cross-environment connectivity without network redesign"],
                architecture: ["Frameworks and protocols remain at the application layer", "Cynapsa supplies the identity, policy, and transport layer below"]
            },
            architecture: "The final scene collapses the architecture into two layers. The existing application stays intact. Cynapsa provides the networking layer below it, independent of the framework or agent protocol.",
            stageEyebrow: "Framework-agnostic deployment",
            stageTitle: "No code change necessary",
            takeaway: "The Cynapsa SDK changes how agents connect, without changing the agent application logic.",
            explainer: "The application call remains the same. Cynapsa sits below the agent framework and provides secure connectivity across environments."
        }
    ];

    const alternatives = {
        collaboration: {
            title: "Human collaboration and asynchronous workflows",
            useful: "Slack and email are effective interfaces for people, notifications, approvals, and delayed work.",
            gap: "Autonomous agents still need governed identity, least-privilege reachability, revocation, discovery, auditability, and a path that does not force nearby peers through a third-party collaboration service.",
            cynapsa: "A private, identity-based connection between authorized agents, while the application keeps the messaging or collaboration interface it already uses."
        },
        queues: {
            title: "Durable delivery and event-driven processing",
            useful: "Queues and brokers provide buffering, retries, fan-out, and decoupled asynchronous delivery.",
            gap: "A delivered message does not prove the receiving agent authenticated the sender, accepted the operation, executed it once, or returned the correct outcome. A central broker can also create path inflation and a shared failure domain.",
            cynapsa: "An identity and connectivity layer that controls which agents may establish a relationship. Applications can still use queues when durable messaging is the right pattern."
        },
        https: {
            title: "Well-defined application endpoints",
            useful: "HTTPS and mTLS can secure a known client-to-server connection when endpoints, certificates, routing, and ownership are stable.",
            gap: "Distributed agents still require discovery, private reachability, certificate lifecycle, per-agent policy, roaming support, revocation, and connectivity across NAT and separately managed environments.",
            cynapsa: "A reusable agent network that establishes private identity-based reachability, while the application continues using its preferred protocol."
        },
        vpn: {
            title: "Connecting networks and managed workloads",
            useful: "VPNs and service meshes are proven tools for joining locations or managing services inside an infrastructure boundary.",
            gap: "They often extend trust to networks, namespaces, or workloads rather than to each autonomous agent. Cross-company and mobile agent scenarios add configuration, route, certificate, and ownership complexity.",
            cynapsa: "Agent-level identity and microsegmentation across environments, without redesigning every underlying network or granting broad location-based access."
        }
    };

    const body = document.body;
    const sceneKicker = document.getElementById("scene-kicker");
    const sceneTitle = document.getElementById("scene-title");
    const sceneBody = document.getElementById("scene-body");
    const scenePoints = document.getElementById("scene-points");
    const sceneArchitecture = document.getElementById("scene-architecture");
    const stageEyebrow = document.getElementById("stage-eyebrow");
    const stageTitle = document.getElementById("stage-title");
    const stageTakeaway = document.getElementById("stage-takeaway");
    const stageExplainerText = document.getElementById("stage-explainer-text");
    const stageExplainer = document.getElementById("stage-explainer");
    const progressFill = document.getElementById("progress-fill");
    const progressLabel = document.getElementById("progress-label");
    const playButton = document.querySelector('[data-action="play"]');
    const playLabel = playButton.querySelector("span");
    const chapterButtons = [...document.querySelectorAll("[data-scene-target]")];
    const lensButtons = [...document.querySelectorAll("button[data-lens]")];
    const presentationButtons = [...document.querySelectorAll('[data-action="presentation"]')];
    const architectureDetail = document.getElementById("architecture-detail");
    const allowPolicyButton = document.querySelector('[data-action="allow-policy"]');
    const revokePolicyButton = document.querySelector('[data-action="revoke-policy"]');
    const policyStatusText = document.getElementById("policy-status-text");
    const firewallRelationship = document.getElementById("firewall-relationship");
    const resilienceModeButtons = [...document.querySelectorAll("button[data-resilience-mode]")];
    const replicaCards = [...document.querySelectorAll("[data-replica]")];
    const resilienceStatusText = document.getElementById("resilience-status-text");

    let currentScene = 0;
    let currentLens = "business";
    let autoplayTimer = null;
    let isPlaying = false;
    let resilienceMode = "balanced";
    let resilienceState = "healthy";
    let requestCounts = { a: 0, b: 0, c: 0 };

    function currentSceneId() {
        return scenes[currentScene].id;
    }

    function setPolicyState(state) {
        const revoked = state === "revoked";
        body.dataset.policyState = revoked ? "revoked" : "allowed";
        allowPolicyButton.classList.toggle("is-active", !revoked);
        revokePolicyButton.classList.toggle("is-active", revoked);
        allowPolicyButton.setAttribute("aria-pressed", String(!revoked));
        revokePolicyButton.setAttribute("aria-pressed", String(revoked));
        policyStatusText.textContent = revoked
            ? "Worker B4 access to Data C7: revoked"
            : "Worker B4 may access Data C7";

        if (currentSceneId() === "microsegmentation") {
            stageTakeaway.textContent = revoked
                ? "Worker B4 is revoked. Its approved local path disappears while the other agent identities remain governed independently."
                : scenes[currentScene].takeaway;
        }
    }

    function setFirewallState(state) {
        body.dataset.firewallState = state;
        firewallRelationship.textContent = state === "authorized"
            ? "Authorized and established"
            : state === "blocked"
                ? "Unsolicited attempt blocked"
                : "Not established";

        if (currentSceneId() === "firewall") {
            stageTakeaway.textContent = state === "authorized"
                ? "Authorized agents communicate over an established path while the inbound firewall posture remains closed."
                : state === "blocked"
                    ? "The unsolicited attempt is blocked. No public agent endpoint is exposed."
                    : scenes[currentScene].takeaway;
        }
    }

    function renderResilience() {
        body.dataset.resilienceMode = resilienceMode;
        body.dataset.resilienceState = resilienceState;
        resilienceModeButtons.forEach(button => {
            const active = button.dataset.resilienceMode === resilienceMode;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        replicaCards.forEach(card => {
            const key = card.dataset.replica;
            const role = card.querySelector(".replica-role");
            const detail = card.querySelector("small");
            card.querySelector("b").textContent = String(requestCounts[key]);
            card.classList.toggle("is-offline", key === "a" && resilienceState === "degraded");
            card.classList.toggle("is-promoted", key === "b" && resilienceMode === "active-passive" && resilienceState === "degraded");

            if (key === "a") {
                role.textContent = resilienceState === "degraded" ? "OFFLINE" : "ACTIVE";
                detail.textContent = resilienceState === "degraded" ? "AWS · unavailable" : "AWS · healthy";
            } else if (resilienceMode === "active-passive") {
                role.textContent = key === "b" && resilienceState === "degraded" ? "PROMOTED" : "STANDBY";
            } else {
                role.textContent = "ACTIVE";
            }
        });

        resilienceStatusText.textContent = resilienceState === "degraded"
            ? resilienceMode === "active-passive"
                ? "Instance A is unavailable. Instance B is active for subsequent requests."
                : "Instance A is unavailable. Subsequent requests use healthy instances B and C."
            : resilienceMode === "active-passive"
                ? "Instance A is active. Instances B and C are ready as standby capacity."
                : "Three healthy instances are eligible for new requests.";
    }

    function setResilienceMode(mode) {
        resilienceMode = mode;
        resilienceState = "healthy";
        requestCounts = { a: 0, b: 0, c: 0 };
        renderResilience();
    }

    function sendRequests() {
        const eligible = resilienceMode === "active-passive"
            ? [resilienceState === "degraded" ? "b" : "a"]
            : resilienceState === "degraded" ? ["b", "c"] : ["a", "b", "c"];
        for (let index = 0; index < 6; index += 1) {
            requestCounts[eligible[index % eligible.length]] += 1;
        }
        body.classList.remove("requests-moving");
        window.requestAnimationFrame(() => body.classList.add("requests-moving"));
        window.setTimeout(() => body.classList.remove("requests-moving"), 1500);
        renderResilience();
    }

    function bindInteractiveControls() {
        const actions = {
            "attempt-inbound": () => setFirewallState("blocked"),
            "authorize-path": () => setFirewallState("authorized"),
            "reset-firewall": () => setFirewallState("idle"),
            "send-requests": sendRequests,
            "fail-instance": () => {
                resilienceState = "degraded";
                renderResilience();
            },
            "restore-instances": () => {
                resilienceState = "healthy";
                renderResilience();
            }
        };

        Object.entries(actions).forEach(([action, handler]) => {
            const button = document.querySelector(`[data-action="${action}"]`);
            if (button) button.onclick = handler;
        });
        resilienceModeButtons.forEach(button => {
            button.onclick = () => setResilienceMode(button.dataset.resilienceMode);
        });
    }

    function renderScene(index, options = {}) {
        currentScene = (index + scenes.length) % scenes.length;
        const scene = scenes[currentScene];
        body.dataset.scene = String(currentScene);
        body.dataset.sceneId = scene.id;

        sceneKicker.textContent = scene.kicker;
        sceneTitle.textContent = scene.title;
        sceneBody.textContent = scene.body[currentLens];
        scenePoints.replaceChildren(...scene.points[currentLens].map(point => {
            const item = document.createElement("li");
            item.textContent = point;
            return item;
        }));
        sceneArchitecture.textContent = scene.architecture;
        stageEyebrow.textContent = scene.stageEyebrow;
        stageTitle.textContent = scene.stageTitle;
        stageTakeaway.textContent = scene.takeaway;
        stageExplainerText.textContent = scene.explainer;
        stageExplainer.hidden = true;
        document.querySelector('[data-action="explain"]').setAttribute("aria-expanded", "false");

        chapterButtons.forEach((button, buttonIndex) => {
            button.classList.toggle("is-active", buttonIndex === currentScene);
            button.setAttribute("aria-current", buttonIndex === currentScene ? "step" : "false");
        });

        progressFill.style.width = `${((currentScene + 1) / scenes.length) * 100}%`;
        progressLabel.textContent = `${currentScene + 1} / ${scenes.length}`;

        setPolicyState("allowed");
        setFirewallState("idle");
        if (scene.id === "resilience") setResilienceMode("balanced");
        bindInteractiveControls();

        if (currentLens === "architecture") architectureDetail.open = true;
        if (options.focus) document.getElementById("architecture-stage").focus({ preventScroll: true });
    }

    function setLens(lens) {
        currentLens = lens;
        body.dataset.lens = lens;
        lensButtons.forEach(button => {
            const active = button.dataset.lens === lens;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        renderScene(currentScene);
    }

    function setPlaying(next) {
        isPlaying = next;
        playButton.classList.toggle("is-playing", isPlaying);
        playButton.setAttribute("aria-pressed", String(isPlaying));
        playLabel.textContent = isPlaying ? "Pause story" : "Play story";
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
        if (isPlaying) {
            autoplayTimer = window.setInterval(() => renderScene(currentScene + 1), 6500);
        }
    }

    function setPresentationMode(next) {
        body.classList.toggle("presentation-mode", next);
        presentationButtons.forEach(button => button.setAttribute("aria-pressed", String(next)));
        if (next) {
            document.getElementById("architecture-stage").focus({ preventScroll: true });
        }
    }

    chapterButtons.forEach(button => button.addEventListener("click", () => {
        setPlaying(false);
        renderScene(Number(button.dataset.sceneTarget));
    }));

    lensButtons.forEach(button => button.addEventListener("click", () => setLens(button.dataset.lens)));

    document.querySelectorAll('[data-action="previous"]').forEach(button => button.addEventListener("click", () => {
        setPlaying(false);
        renderScene(currentScene - 1);
    }));

    document.querySelectorAll('[data-action="next"]').forEach(button => button.addEventListener("click", () => {
        setPlaying(false);
        renderScene(currentScene + 1);
    }));

    playButton.addEventListener("click", () => setPlaying(!isPlaying));
    presentationButtons.forEach(button => button.addEventListener("click", () => setPresentationMode(!body.classList.contains("presentation-mode"))));

    document.querySelector('[data-action="explain"]').addEventListener("click", event => {
        stageExplainer.hidden = !stageExplainer.hidden;
        event.currentTarget.setAttribute("aria-expanded", String(!stageExplainer.hidden));
    });

    allowPolicyButton.addEventListener("click", () => setPolicyState("allowed"));
    revokePolicyButton.addEventListener("click", () => setPolicyState("revoked"));
    document.querySelectorAll("[data-alternative]").forEach(tab => tab.addEventListener("click", () => {
        const item = alternatives[tab.dataset.alternative];
        document.querySelectorAll("[data-alternative]").forEach(other => other.setAttribute("aria-selected", String(other === tab)));
        document.getElementById("alternative-title").textContent = item.title;
        document.getElementById("alternative-useful").textContent = item.useful;
        document.getElementById("alternative-gap").textContent = item.gap;
        document.getElementById("alternative-cynapsa").textContent = item.cynapsa;
    }));

    document.addEventListener("keydown", event => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            setPlaying(false);
            renderScene(currentScene + 1, { focus: body.classList.contains("presentation-mode") });
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            setPlaying(false);
            renderScene(currentScene - 1, { focus: body.classList.contains("presentation-mode") });
        } else if (event.key === " " && body.classList.contains("presentation-mode")) {
            event.preventDefault();
            setPlaying(!isPlaying);
        } else if (event.key === "Escape" && body.classList.contains("presentation-mode")) {
            setPresentationMode(false);
        } else if ((event.key === "p" || event.key === "P") && !event.metaKey && !event.ctrlKey) {
            setPresentationMode(!body.classList.contains("presentation-mode"));
        }
    });

    renderScene(0);
})();
