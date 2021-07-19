import { gql } from 'apollo-boost';

export const authQuery = gql`
    query Auth {
        auth {
            ok
            user {
                _id
                email
                firstname 
                lastname
            }
            error
        }
    }
`;

export const loginUser = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
            error
        }
    }
`;

export const logoutUser = gql`
    mutation logout {
        logout 
    }
`;

export const registerUser = gql`
    mutation register($email: String!, $password: String!, $firstname: String!, $lastname: String!) {
        register(email: $email, password: $password, firstname: $firstname, lastname: $lastname)
    }
`;