import { gql } from 'apollo-boost';

export const getUsers = gql`
    query getUsers {
        users {
            email
            firstname
            lastname
        }
    }
`;

export const getUserById = gql`
    query getUserById($id: ID!) {
        user(_id: $id){
            email
            firstname
            lastname
        }
    }   
`;

export const getUserByEamil = gql`
    query getUserByEmail($email: String!) {
        user(email: $email){
            _id
            email
            firstname
            lastname
        }
    }
`;