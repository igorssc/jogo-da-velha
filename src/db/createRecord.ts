import { gql } from "@apollo/client";

export const CREATE_RECORD = gql`
  mutation CreateRecord($name: String!, $score: Int!, $level: Int!) {
    createRecord(data: { name: $name, score: $score, level: $level }) {
      id
    }
  }
`;

export interface registerRecordMutationResponse {
  createRecord: {
    id: string;
  };
}
