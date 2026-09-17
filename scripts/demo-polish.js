(() => {
    const body = document.body;
    body.classList.add("demo-polished");

    const directChildren = [...body.children].filter(element => element.tagName === "DIV" || element.tagName === "MAIN");
    const sidebar = directChildren.find(element => element.querySelector("h1") && (
        element.classList.contains("w-1/3") ||
        element.className.includes("border-r") ||
        element.className.includes("overflow-y-auto")
    ));
    const canvas = document.getElementById("canvas-container") ||
        document.getElementById("canvas-stage")?.parentElement?.parentElement ||
        directChildren.find(element => element !== sidebar && (element.querySelector("svg") || element.querySelector("[id*='canvas']")));

    if (sidebar) {
        sidebar.classList.add("demo-sidebar");
        const brand = document.createElement("div");
        brand.className = "demo-brand-bar";
        brand.innerHTML = `
            <a href="./index.html" aria-label="Back to the Cynapsa interactive experience">
                <img src="./assets/cynapsa-logo-light.png" alt="Cynapsa">
            </a>
            <span>Interactive system demo</span>
        `;
        sidebar.prepend(brand);
    }

    let canvasLabel;
    if (canvas) {
        canvas.classList.add("demo-canvas");
        canvasLabel = document.createElement("div");
        canvasLabel.className = "demo-canvas-label";
        canvasLabel.setAttribute("aria-live", "polite");
        canvasLabel.innerHTML = "<i></i><span>Legacy network</span>";
        canvas.append(canvasLabel);
    }

    const glyphs = new Map([
        ["🤖", ["AI", "Agent"]],
        ["🧠", ["CP", "Control plane"]],
        ["🚦", ["VPN", "VPN hub", "danger"]],
        ["📱", ["EDGE", "Mobile agent"]],
        ["📖", ["DNS", "DNS service"]],
        ["🗄️", ["DB", "Private data"]],
        ["💻", ["DEV", "Local machine"]],
        ["🏥🤖", ["AI", "Healthcare agent"]],
        ["📄🤖", ["AI", "Document agent"]],
        ["☁️", ["CLD", "Cloud"]],
        ["⚙️", ["API", "Application service"]],
        ["🏢", ["DC", "Data center"]],
        ["🗂️", ["EHR", "Health record"]],
        ["🛡️", ["SEC", "Security control"]],
        ["🌐", ["NET", "Network"]],
        ["✅", ["OK", "Approved"]],
        ["⚠️", ["!", "Warning", "danger"]],
        ["🚫", ["×", "Blocked", "danger"]]
    ]);

    function enhanceGlyphs(root = document.body) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const matches = [];
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (node.parentElement?.closest(".demo-glyph, script, style, textarea")) continue;
            const value = node.nodeValue.trim();
            if (glyphs.has(value)) matches.push([node, value]);
        }
        matches.forEach(([node, value]) => {
            const [label, accessibleName, kind] = glyphs.get(value);
            const glyph = document.createElement("span");
            glyph.className = "demo-glyph";
            if (kind) glyph.dataset.kind = kind;
            glyph.setAttribute("role", "img");
            glyph.setAttribute("aria-label", accessibleName);
            glyph.textContent = label;
            node.replaceWith(glyph);
        });
    }

    function updateMode(mode) {
        const normalized = mode === "legacy" || mode === "problem" ? mode : mode === "cynapsa" || mode === "solution" ? mode : "cynapsa";
        body.dataset.demoMode = normalized;
        if (!canvasLabel) return;
        const label = normalized === "legacy" || normalized === "problem" ? "Legacy network" : "Cynapsa identity network";
        canvasLabel.querySelector("span").textContent = label;
    }

    const legacy = document.getElementById("btn-legacy") || document.getElementById("btn-problem");
    const cynapsa = document.getElementById("btn-cynapsa") || document.getElementById("btn-solution");
    updateMode(legacy ? (legacy.id.includes("problem") ? "problem" : "legacy") : "cynapsa");

    document.addEventListener("click", event => {
        const button = event.target.closest("button");
        if (!button) return;
        if (button.id === "btn-legacy") updateMode("legacy");
        if (button.id === "btn-cynapsa") updateMode("cynapsa");
        if (button.id === "btn-problem") updateMode("problem");
        if (button.id === "btn-solution") updateMode("solution");
    }, true);

    enhanceGlyphs();
    let scheduled = false;
    const observer = new MutationObserver(mutations => {
        if (scheduled) return;
        if (!mutations.some(mutation => mutation.addedNodes.length)) return;
        scheduled = true;
        window.requestAnimationFrame(() => {
            scheduled = false;
            enhanceGlyphs();
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
