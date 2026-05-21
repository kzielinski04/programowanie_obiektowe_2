export interface DomainEvent {
    readonly name: string;
    readonly occuredAt: Date;
}
