import type { DomainEvent } from "./DomainEvent.js";

export interface EventHandler<T extends DomainEvent> {
    handle(event: T): Promise<void>;
}
