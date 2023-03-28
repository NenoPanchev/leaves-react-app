export class Permission {
    private name: string;

    public Permission(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}