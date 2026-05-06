(function () {
    if (window.CynapsaPresentationStepper) {
        return;
    }

    const nativeSetTimeout = window.setTimeout.bind(window);
    const nativeClearTimeout = window.clearTimeout.bind(window);
    const stepDelayThreshold = 150;
    let enabled = false;
    let queue = [];
    let queuedTimers = new Map();
    let nextTimerId = 1;
    let runningStep = false;
    let ui = null;

    function createUi() {
        if (ui) {
            return ui;
        }

        const panel = document.createElement("div");
        panel.id = "presentation-stepper";
        panel.innerHTML = `
            <div class="stepper-eyebrow">Presentation mode</div>
            <div class="stepper-status" data-role="status">Start a simulation to queue its next step.</div>
            <div class="stepper-actions">
                <button type="button" data-role="play">Play</button>
                <button type="button" data-role="pause">Pause</button>
            </div>
        `;

        const style = document.createElement("style");
        style.textContent = `
            #presentation-stepper {
                position: fixed;
                right: 1rem;
                bottom: 1rem;
                z-index: 99999;
                width: min(18rem, calc(100vw - 2rem));
                padding: 0.85rem;
                border: 1px solid rgba(34, 211, 238, 0.45);
                border-radius: 0.5rem;
                background: rgba(2, 6, 23, 0.92);
                color: #e2e8f0;
                box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35), 0 0 18px rgba(34, 211, 238, 0.16);
                backdrop-filter: blur(10px);
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }
            #presentation-stepper .stepper-eyebrow {
                margin-bottom: 0.35rem;
                color: #67e8f9;
                font-size: 0.65rem;
                font-weight: 800;
                letter-spacing: 0.18em;
                text-transform: uppercase;
            }
            #presentation-stepper .stepper-status {
                min-height: 2.35rem;
                margin-bottom: 0.7rem;
                color: #cbd5e1;
                font-size: 0.78rem;
                line-height: 1.45;
            }
            #presentation-stepper .stepper-actions {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
            }
            #presentation-stepper button {
                min-height: 2.25rem;
                border: 1px solid #475569;
                border-radius: 0.375rem;
                background: #1e293b;
                color: #f8fafc;
                font-size: 0.82rem;
                font-weight: 700;
                cursor: pointer;
                transition: border-color 160ms ease, background 160ms ease, color 160ms ease, opacity 160ms ease;
            }
            #presentation-stepper button[data-role="play"] {
                border-color: rgba(34, 211, 238, 0.65);
                background: #0891b2;
            }
            #presentation-stepper button:hover:not(:disabled) {
                border-color: #67e8f9;
                background: #0e7490;
            }
            #presentation-stepper button:disabled {
                cursor: not-allowed;
                opacity: 0.42;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(panel);

        ui = {
            panel,
            status: panel.querySelector('[data-role="status"]'),
            play: panel.querySelector('[data-role="play"]'),
            pause: panel.querySelector('[data-role="pause"]'),
        };

        ui.play.addEventListener("click", playNext);
        ui.pause.addEventListener("click", function () {
            updateUi("Paused. Click Play when you are ready for the next queued step.");
        });

        updateUi();
        return ui;
    }

    function updateUi(message) {
        if (!ui) {
            return;
        }

        if (message) {
            ui.status.textContent = message;
        } else if (!enabled) {
            ui.status.textContent = "Start a simulation to queue its next step.";
        } else if (runningStep) {
            ui.status.textContent = "Running one step...";
        } else if (queue.length) {
            ui.status.textContent = `${queue.length} step${queue.length === 1 ? "" : "s"} queued. Click Play for the next step.`;
        } else {
            ui.status.textContent = "No queued steps. Start or continue a simulation.";
        }

        ui.play.disabled = runningStep || queue.length === 0;
        ui.pause.disabled = !enabled || runningStep;
    }

    function resetQueue() {
        queue = [];
        queuedTimers.clear();
        updateUi();
    }

    function startSession() {
        enabled = true;
        resetQueue();
        updateUi("Simulation started. First step is running; the next timed step will pause here.");
    }

    function stopSession() {
        enabled = false;
        resetQueue();
        updateUi("Presentation queue cleared.");
    }

    function shouldQueue(delay) {
        return enabled && Number(delay || 0) >= stepDelayThreshold;
    }

    window.setTimeout = function (callback, delay) {
        const args = Array.prototype.slice.call(arguments, 2);

        if (!shouldQueue(delay)) {
            return nativeSetTimeout(callback, delay, ...args);
        }

        const id = `stepper-${nextTimerId++}`;
        const item = { id, callback, args, canceled: false };
        queuedTimers.set(id, item);
        queue.push(item);
        updateUi();
        return id;
    };

    window.clearTimeout = function (id) {
        const item = queuedTimers.get(id);
        if (item) {
            item.canceled = true;
            queuedTimers.delete(id);
            queue = queue.filter((queuedItem) => queuedItem.id !== id);
            updateUi();
            return;
        }

        nativeClearTimeout(id);
    };

    function playNext() {
        if (runningStep) {
            return;
        }

        while (queue.length && queue[0].canceled) {
            queuedTimers.delete(queue.shift().id);
        }

        const item = queue.shift();
        if (!item) {
            updateUi();
            return;
        }

        queuedTimers.delete(item.id);
        runningStep = true;
        updateUi();

        nativeSetTimeout(function () {
            try {
                if (typeof item.callback === "function") {
                    item.callback(...item.args);
                } else {
                    new Function(String(item.callback))();
                }
            } finally {
                runningStep = false;
                updateUi();
            }
        }, 0);
    }

    function looksLikeSimulationTrigger(onclick) {
        if (!onclick || /setMode|setStage|reset/i.test(onclick)) {
            return false;
        }

        return /run|simulate|triggerCompromise/i.test(onclick);
    }

    document.addEventListener("click", function (event) {
        const control = event.target.closest("#presentation-stepper");
        if (control) {
            return;
        }

        const clickable = event.target.closest("[onclick]");
        if (!clickable) {
            return;
        }

        const onclick = clickable.getAttribute("onclick") || "";
        if (/reset/i.test(onclick)) {
            stopSession();
            return;
        }

        if (looksLikeSimulationTrigger(onclick)) {
            startSession();
        }
    }, true);

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", createUi);
    } else {
        createUi();
    }

    window.CynapsaPresentationStepper = {
        playNext,
        startSession,
        stopSession,
        resetQueue,
    };
})();
