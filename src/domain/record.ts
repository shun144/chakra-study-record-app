export class Record {
  id: string;
  title: string;
  time: number;
  created_at: string;
  constructor(id: string, title: string, time: number, created_at: string) {
    this.id = id;
    this.title = title;
    this.time = time;
    this.created_at = created_at;
  }
}
