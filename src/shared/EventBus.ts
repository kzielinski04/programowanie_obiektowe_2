import type { DomainEvent } from "../events/DomainEvent.js";
import type { EventHandler } from "../events/EventHandler.js";

export class EventBus {
    private handlers: Record<string, EventHandler<DomainEvent>[]> = {};

    subscribe<T extends DomainEvent>(eventType: string, handler: EventHandler<T>): void {
        if (!this.handlers[eventType]) {
            this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler as EventHandler<DomainEvent>);
    }

    async publish(event: DomainEvent): Promise<void> {
        const handlers = this.handlers[event.name] || [];
        for (const handler of handlers) {
            await handler.handle(event);
        }
    }
}
