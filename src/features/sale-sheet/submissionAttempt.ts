/** Memory-only: never persist request bodies, customer data or keys. */
export class SubmissionAttempt {
  private key: string | undefined;
  private body: string | undefined;
  private inFlight = false;
  private editable = true;
  private completed = false;

  constructor(
    private readonly generateKey: () => string = () => crypto.randomUUID(),
  ) {}

  begin(body: string): string | null {
    if (this.inFlight || this.completed) return null;
    if (this.body !== undefined && this.body !== body) {
      if (!this.editable) {
        throw new Error(
          "O resultado anterior não foi confirmado. Repita o mesmo envio antes de alterar os dados para evitar duplicidade.",
        );
      }
      this.key = undefined;
    }
    this.key ??= this.generateKey();
    this.body = body;
    this.inFlight = true;
    this.editable = false;
    return this.key;
  }

  fail(status?: number): void {
    this.inFlight = false;
    // Only validation rejection proves that the operation did not commit.
    // A timeout, 5xx, lost response or 409 cannot authorize a different body/key.
    this.editable = status === 400 || status === 422;
  }

  succeed(): void {
    this.inFlight = false;
    this.completed = true;
    this.key = undefined;
    this.body = undefined;
  }

  canEdit(): boolean {
    return !this.inFlight && this.editable && !this.completed;
  }
}
