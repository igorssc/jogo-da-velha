import { gql } from "@apollo/client";

export const GET_RECORDS = gql`
  query Records($level: Int!) {
    records(where: { level: $level }, first: 10, orderBy: score_DESC) {
      createdAt
      id
      name
      score
      level
    }
  }
`;

export interface getRecordsQueryResponse {
  records: {
    createdAt: string;
    id: string;
    name: string;
    score: number;
    level: number;
  }[];
}
