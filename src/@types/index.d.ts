interface FResult {
  status: string;
  data: FData;
  statusCode: number;
}

interface FData {
  info: FInfo;
  balloons: FBalloon[];
}

interface FInfo {
  dim: {
    rows: number;
    cols: number;
  };
  id: string;
  balloonCount: number;
  filename: string;
}

interface FBalloon {
  originalURL: string;
  filledMaskURL: string;
  resultURL: string;
  boundingRect: Rect;
  textRect: {
    [key: string]: Rect;
  };
  textRectCount: number;
}

interface Rect {
  x: number;
  y: number;
  height: number;
  width: number;
}

interface EditorRouteParams {
  id: string;
}
