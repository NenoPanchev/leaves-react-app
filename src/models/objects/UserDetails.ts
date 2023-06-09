export class UserDetails {
    private email: string;
    private authorities: string[];

    public UserDetails() {

    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getAuthorities(): string[] {
        return this.authorities;
    }

    public setAuthorities(authorities: string[]): void {
        this.authorities = authorities;
    }

    public hasRole(role: string): boolean {
        return this.authorities.includes('ROLE_' + role);
    }

    public hasAuthority(authority: string): boolean {               
        return this.authorities.includes(authority);
    }
}