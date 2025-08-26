export class Topic {
  constructor(
    public readonly id: string,
    public title: string,
    public slug: string,
    public parentId?: string,
  ) {}
}
