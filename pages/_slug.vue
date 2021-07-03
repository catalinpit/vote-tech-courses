<template>
    <div class="relative flex flex-col items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
      <div class="max-w-4xl mx-auto px-8 sm:px-6 lg:px-8 flex flex-col justify-center">
          <Hero/>
          <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
              <h2 class="text-2xl leading-7 font-semibold">
                {{ course.name }}
              </h2>
              <p class="mt-1 font-extralight italic text-gray-600">by {{ course.authors.map(author => author.name).toString() }}</p>
              <p class="mt-3 text-gray-600">
                  {{ course.description }} <br>
              <br>
                  We recommend you take a look at the <a :href="course.url" target="_blank" class="text-green-500 hover:underline">course</a> page.<br>
              </p>
              <div class="flex flex-col items-center border-t border-dashed mt-5">
                  <p class="mt-4 pt-4 text-gray-800 font-bold text-xl tracking-wider">
                      The course has <code class="bg-gray-100 text-2xl p-1 rounded border">{{ course.vote }}</code> votes.
                  </p>
              </div>
          </div>
      </div>
      <div class="max-w-4xl mx-auto px-8 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
              <h2 class="text-2xl leading-7 font-semibold mb-3">
                {{ course.authors.map(author => author.name).toString() }}
              </h2>
              <a :href="course.authors.map(author => author.twitterProfile).toString()" class="mt-1 font-extralight italic text-gray-600"><code class="bg-gray-100 p-2 rounded border">@catalinmpit</code> Twitter</a>
              <div class="flex flex-col items-center border-t border-dashed mt-5">
                  <p class="mt-4 pt-4 text-gray-800 tracking-wider">
                    {{ course.authors.map(author => author.biography).toString() }}
                  </p>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import { gql } from 'graphql-request';

export default {
  async asyncData({ $graphcms, params }) {
    const { slug } = params;
    const query = 
      gql`
        query getCourse($slug: ID!) {
          course(where: { id: $slug }) {
            id
            name
            description
            url
            vote
            authors {
              name
              biography
              twitterProfile
            }
          }
        }
      `
    ;

    const course = await $graphcms.request(query, { slug });
    return course;
  }
}
</script>