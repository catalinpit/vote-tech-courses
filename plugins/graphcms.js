import { GraphQLClient } from 'graphql-request';

const graphcmsClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
    headers: {
        authorization: `Bearer ${process.env.BEARER}`
    }
});

export default(_, inject) => {
    inject('graphcms', graphcmsClient);
};