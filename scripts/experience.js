(() => {
    const scenes = [
        {
            kicker: "01 · The challenge",
            title: "Your agents have outgrown the sandbox",
            body: {
                business: "A proof of concept works because every agent lives inside one trusted environment. Production splits the workflow across clouds, private networks, customer sites, and edge locations.",
                architecture: "Agent frameworks define the conversation, but assume reachability. Firewalls, NAT, private address space, and separate administrative domains break that assumption in production."
            },
            points: {
                business: ["One workflow now crosses several trust boundaries", "Traditional fixes add gateways, VPNs, and operational delay"],
                architecture: ["Frameworks solve Layer 7 interaction, not private reachability", "IP and location are unstable identities for autonomous agents"]
            },
            architecture: "The gray paths represent the infrastructure teams typically assemble after the prototype: firewall rules, gateways, VPNs, load balancers, and public endpoints. The architecture becomes the bottleneck before the agent logic does.",
            stageEyebrow: "Production reality",
            stageTitle: "Agents cross network boundaries",
            takeaway: "A working prototype is only the beginning. Production agents need cross-environment connectivity.",
            explainer: "Each box is a different environment. The agents can cooperate in a lab, but production networking prevents them from reaching one another without new infrastructure and exposure."
        },
        {
            kicker: "02 · Identity",
            title: "Start with who, not where",
            body: {
                business: "Cynapsa gives every agent a governed identity. Policy decides which agents may communicate, regardless of the cloud, address, cluster, or customer environment where they run.",
                architecture: "Enrollment binds runtime authentication to an individual agent identity. The control plane uses that identity for membership, discovery, authorization, and targeted revocation."
            },
            points: {
                business: ["Trust follows the agent across environments", "Unknown and unauthorized agents stay isolated"],
                architecture: ["Cryptographic identity replaces location-based trust", "Authorization occurs before an application path is established"]
            },
            architecture: "Purple dashed paths show coordination with the Cynapsa control plane. They carry identity, policy, discovery, and session decisions. They are not the application data path.",
            stageEyebrow: "Identity-native networking",
            stageTitle: "Every agent becomes a governed network identity",
            takeaway: "Identity and policy determine who may communicate. Network location does not create trust.",
            explainer: "The purple control signals establish the identity and permissions of every agent. The same identity remains meaningful when an agent changes IP address or moves between environments."
        },
        {
            kicker: "03 · Connectivity",
            title: "Coordinate centrally. Communicate directly",
            body: {
                business: "The control plane establishes who may connect. Authorized agents then exchange application traffic over a preferred peer path, so the decision system does not need to carry every payload.",
                architecture: "Cynapsa coordinates identity, policy, discovery, and session establishment through its control plane, then establishes the preferred P2P data path across private network boundaries and NAT."
            },
            points: {
                business: ["Application traffic stays on the most appropriate secure path", "Nearby agents do not need to hairpin through a collaboration platform"],
                architecture: ["Purple dashed lines are control-plane coordination", "Solid lime paths carry authorized application traffic"]
            },
            architecture: "The diagram separates control and data visually. The control plane coordinates the relationship. The preferred data path connects authorized peers directly and remains encrypted.",
            stageEyebrow: "Control plane and data plane",
            stageTitle: "Policy above. Peer application traffic below",
            takeaway: "The control plane authorizes the relationship. Application traffic follows the preferred peer path.",
            explainer: "Purple lines coordinate identity and policy. Lime lines carry the agent workflow. Notice that the lime path connects agents without passing through the control plane."
        },
        {
            kicker: "04 · Data locality",
            title: "Bring the agent to the data",
            body: {
                business: "Place the agent beside private data and let it return only the permitted result. The raw source remains inside the environment that owns and governs it.",
                architecture: "A local Cynapsa-connected agent accesses the private data source inside its existing boundary. Policy controls which remote identities may invoke it and which result may return."
            },
            points: {
                business: ["Raw data stays in its original environment", "The workflow can span cloud, on premises, and customer sites"],
                architecture: ["The local data service does not require public exposure", "Access remains bound to the requesting agent identity"]
            },
            architecture: "The highlighted on-premises zone contains both the data agent and the private source. The lime path represents the authorized interaction and response, not movement of the underlying dataset.",
            stageEyebrow: "Private data access",
            stageTitle: "The workflow moves. The raw data stays local",
            takeaway: "Agents can work where private data lives without moving the underlying dataset into a shared cloud service.",
            explainer: "The data agent runs beside the private system. A remote agent can request an authorized task, but the raw records remain inside the on-premises boundary."
        },
        {
            kicker: "05 · Microsegmentation",
            title: "Give every connection a reason to exist",
            body: {
                business: "Cynapsa allows only the relationships required by the workflow. Revoke one agent and its access disappears without interrupting the rest of the network.",
                architecture: "Agent-level policy denies unauthorized discovery and reachability by default. Targeted revocation removes a compromised identity while unrelated authorized paths continue."
            },
            points: {
                business: ["A compromised agent cannot wander through the environment", "The blast radius stays limited to approved relationships"],
                architecture: ["Microsegmentation applies to identities, not shared subnets", "Revocation is targeted to the individual agent"]
            },
            architecture: "Use the policy control on the diagram. Revoking Worker B4 removes its approved path to Data C7. Other identities and workflows retain their own independent authorization.",
            stageEyebrow: "Agent microsegmentation",
            stageTitle: "Access is explicit, narrow, and revocable",
            takeaway: "Proximity does not equal trust. Each agent can reach only the identities its policy allows.",
            explainer: "The red dashed path shows an unauthorized attempt. Use Revoke to remove the approved Worker-to-Data path while leaving other relationships unchanged."
        },
        {
            kicker: "06 · Deployment",
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
    const lensButtons = [...document.querySelectorAll("[data-lens]")];
    const presentationButtons = [...document.querySelectorAll('[data-action="presentation"]')];
    const architectureDetail = document.getElementById("architecture-detail");

    let currentScene = 0;
    let currentLens = "business";
    let autoplayTimer = null;
    let isPlaying = false;

    function renderScene(index, options = {}) {
        currentScene = (index + scenes.length) % scenes.length;
        const scene = scenes[currentScene];
        body.dataset.scene = String(currentScene);
        body.classList.remove("policy-revoked");

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

        document.querySelector('[data-action="allow-policy"]').classList.add("is-active");
        document.querySelector('[data-action="revoke-policy"]').classList.remove("is-active");

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

    document.querySelector('[data-action="allow-policy"]').addEventListener("click", event => {
        body.classList.remove("policy-revoked");
        event.currentTarget.classList.add("is-active");
        document.querySelector('[data-action="revoke-policy"]').classList.remove("is-active");
        stageTakeaway.textContent = scenes[4].takeaway;
    });

    document.querySelector('[data-action="revoke-policy"]').addEventListener("click", event => {
        body.classList.add("policy-revoked");
        event.currentTarget.classList.add("is-active");
        document.querySelector('[data-action="allow-policy"]').classList.remove("is-active");
        stageTakeaway.textContent = "Worker B4 is revoked. Its approved path disappears while unrelated identities continue operating.";
    });

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
