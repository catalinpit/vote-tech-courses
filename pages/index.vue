<template>
    <div class="relative flex flex-col items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
      <Hero/>
      <CourseList :courses="courses" />
      <Footer/>
    </div>
</template>

<script>
import { gql } from 'graphql-request';

export default {
  async asyncData({ $graphcms }) {
    const { courses } = await $graphcms.request(
      gql`
        {
          courses(orderBy: vote_DESC) {
            id
            name
            description
            url
            vote
            authors {
              name
            }
          }
        }
      `
    );

    return { courses };
  }
}
</script>
