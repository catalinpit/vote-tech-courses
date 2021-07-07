const express = require('express');
const { GraphQLClient } = require('graphql-request');

const app = express();

app.use(express.json());

const client = new GraphQLClient(
    process.env.GRAPHCMS_ENDPOINT,
    {
        headers: {
            authorization: `Bearer ${process.env.BEARER}`,
        }
    }
);

app.post('/upvote/:slug', async (req, res) => {
    const { slug } = req.params;

    const getCourse =
    `
        query getCourse($slug: ID!) {
            course(where: { id: $slug }) {
                id
                vote
                name
            }
        }
    `;

    const upvoteCourse = 
    `
        mutation voteCourse($slug: ID!, $existingVotes: Int) {
            updateCourse(where: { id: $slug }, data: { vote: $existingVotes }) {
                id
                name
                vote
            }
        }
    `;

    const publishCourse = 
    `
        mutation publishCourse($slug: ID!) {
            publishCourse(where: { id: $slug }) {
                id
                name
                vote
            }
        }
    `;

    const { course } = await client.request(getCourse, { slug });
    const existingVotes = course.vote + 1;
    const voteCourse = await client.request(upvoteCourse, { slug, existingVotes });
    const publishedCourse = await client.request(publishCourse, { slug });

    res.json({ message: 'Course upvoted successfully!', votes: publishedCourse.publishCourse.vote });
});

module.exports = app

// app.get('/tm', async (req, res) => {
//     const allCourses = `
//     {
//         courses {
//           id
//           name
//           description
//           url
//           vote
//           authors {
//             name
//           }
//         }
//     }
//   `;

//   const { courses } = await client.request(allCourses);

//   res.json({ courses })
// })