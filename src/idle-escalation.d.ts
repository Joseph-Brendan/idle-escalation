/*! Idle Escalation v1.0.0 | MIT License | Joseph Brendan, Dev and Design HQ */

declare class IdleEscalation {
    constructor(element: HTMLElement, options?: IdleEscalation.Options);
    readonly step: number;
    readonly total: number;
    start(): void;
    stop(): void;
    destroy(): void;
    static init(root?: ParentNode, options?: IdleEscalation.Options): IdleEscalation[];
}

declare namespace IdleEscalation {
    interface Options {
        /** Milliseconds between steps. Minimum 1000. Default 2000. */
        delay?: number;
        /** Steps in the color phase, including the soft start. Default 4. */
        colorSteps?: number;
        /** Steps in the width phase. 0 turns it off. Default 4. */
        widthSteps?: number;
        /** Pixels added per width step, 0.25 to 1. Default 0.5. */
        widthIncrement?: number;
        /** Also escalate after a pause mid-typing. Default false. */
        watchPauses?: boolean;
        /** Jump to full color when the user returns from another tab or app. Default true. */
        returnBoost?: boolean;
    }
    interface StepDetail {
        step: number;
        steps: number;
        phase: 'none' | 'color' | 'width';
        widthAdded: number;
        peak: boolean;
    }
}

declare global {
    interface HTMLElementEventMap {
        'idleescalation:step': CustomEvent<IdleEscalation.StepDetail>;
    }
    interface Window {
        IdleEscalation: typeof IdleEscalation;
    }
}

export = IdleEscalation;