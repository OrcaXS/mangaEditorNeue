import Dexie from 'dexie';

interface Config {
  name: string;
  value: Set<string>;
}

interface Canvas {
  id: string;
  info: Info;
  positionMap: Map<number, Position>;
}

interface Info {
  dim: {
    rows: number;
    cols: number;
  };
  id: string;
  balloonCount: number;
  filename: string;
}

export interface Position {
  boundingRect: Rect;
  textRect: Map<number, Rect>;
}

interface Files {
  id: string;
  bgImage: File;
  balloons: Map<number, Blob>;
}

interface Status {
  id: string;
  name: string;
  value: string;
}

class MangaEditorDB extends Dexie {
  public config: Dexie.Table<Config, string>;

  public canvas: Dexie.Table<Canvas, number>;

  public files: Dexie.Table<Files, number>;

  public status: Dexie.Table<Status, number>;

  public constructor() {
    super('MangaEditorDb');
    this.version(1).stores({
      config: 'name',
      canvas: 'id',
      files: 'id',
      status: 'id',
    });
    this.config = this.table('config');
    this.canvas = this.table('canvas');
    this.files = this.table('files');
    this.status = this.table('status');
  }
}

const db = new MangaEditorDB();
export default db;
