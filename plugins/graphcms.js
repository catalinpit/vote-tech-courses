import { GraphQLClient } from 'graphql-request';

const endpoint = '<your_GraphCMS_URL>';

const graphcmsClient = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer <your_bearer_token>'
    }
});

export default(_, inject) => {
    inject('graphcms', graphcmsClient);
};